import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import ReactGA from 'react-ga'
import "flowbite";
import Logo from "../../assets/logo.png"

const injected = new InjectedConnector({ supportedChainIds: [25, 338, 97] })

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

interface WalletInfo {
  connector: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

const Header: React.FC = () => {
  const { active, activate, deactivate } = useWeb3React()


  // START
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()
  const [pendingError, setPendingError] = useState<boolean>()
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  
  const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
      connector: injected,
      name: 'Injected',
      iconName: 'injected.svg',
      description: 'Injected web3 provider.',
      href: null,
      color: '#010101',
      primary: true,
    },
  
    METAMASK: {
      connector: injected,
      name: 'MetaMask',
      iconName: 'metamask.png',
      description: 'Easy-to-use browser extension.',
      href: null,
      color: '#E8831D',
    },
  
    CRYPTO_WALLET: {
      connector: async () => {
        const DefiConnectConnector = (await import('deficonnect')).DeFiWeb3Connector
        return new DefiConnectConnector({
          supportedChainIds: [25, 338],
          rpc: {
            25: 'https://evm-cronos.crypto.org/', // cronos mainet
            338: 'https://cronos-testnet-3.crypto.org:8545', // cronos testnet
          },
          pollingInterval: 15000,
        })
      },
      name: 'Crypto DeFi Wallet',
      iconName: 'cryptodefi.svg',
      description: 'Connect to Crypto DeFi Wallet',
      href: null,
      color: '#4196FC',
      mobile: true,
    }
  }
  
  const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector) => {
    let name = ''
    let conn = typeof connector === 'function' ? await connector() : connector
  
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name,
    })
    setPendingWallet(conn) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)
  
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    // if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
    //   conn.walletConnectProvider = undefined
    // }
  
    conn &&
      activate(conn, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(conn) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  const disconnect = async () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="flex justify-between px-4 py-4 rounded-b-lg bg-rose-400 drop-shadow-2xl md:px-28">
        <div className="flex items-center gap-4">
            <NavLink to="/" className="w-20 h-20">
                <img src={Logo} alt="logo" />
            </NavLink>
            <div className="text-2xl text-white md:text-5xl drop-shadow-2xl font-Roboto">Pixel City</div>
        </div>
        <div className="flex items-center gap-4 text-white">
            <a href="/mynft" className="text-xl">My NFTs</a>
            <button id="dropdownButton" data-dropdown-toggle="dropdown" className="px-2 py-2 text-base border-2 rounded-lg md:text-lg md:px-6 bg-emerald-900 hover:bg-blue-600">
              {active? 'Wallet connected' : 'Connect Wallet'}
            </button>
            <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li className="hover:cursor-pointer">
                  {active? <a onClick={disconnect} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Disconnect metamask</a>:
                  <a onClick={()=> tryActivation(SUPPORTED_WALLETS.METAMASK.connector)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Connect metamask</a>}
                </li>
                <li className="hover:cursor-pointer">
                  <a onClick={()=> {tryActivation(SUPPORTED_WALLETS.CRYPTO_WALLET.connector); disconnect()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Connect Crypto Defi Wallet</a>
                </li>
              </ul>
          </div>
        </div>
    </div>
  );
}

export default Header;

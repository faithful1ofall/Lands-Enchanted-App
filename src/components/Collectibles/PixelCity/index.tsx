import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import Web3 from "web3";
import { TextField } from '@mui/material';
import Header from '../../../components/Header'
import Button from '../../Button'
import collectibleImage from '../../../assets/pixelcity.png'
import { pixelcityContract as contract } from '../../../contract/contract';

const web3 = new Web3(Web3.givenProvider)

const PixelCity: React.FC = () => {
  const { account } = useWeb3React()
  const [mintAmount, setMintAmount] = useState(0)

  const [mintPrice, setMintPrice] = useState(0)
  const [progress, setProgress] = useState(0)
  const [maxNFT, setMaxNFT] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
 
  const getCollectibleData = async () => {
    setMintPrice(await contract.methods.mintPrice().call() / 1e18)
    setMaxNFT(await contract.methods.maxNFT().call())
    setTotalSupply(await contract.methods.totalSupply().call())
    setProgress(totalSupply / 1000)
  }
  getCollectibleData()
  
  const price = mintPrice ? Number(mintPrice):0
  const amountToWei = web3.utils.toWei((mintAmount * price).toString(), 'ether')

  const mintCollectibles = async () => {
    account ? await contract.methods.mintNFT(mintAmount).send({from: account, value: amountToWei})
      : alert("Connect wallet")
  }

  const handleChange = (event: any) => {
    setMintAmount(event.target.value);
  }

  return (
    <>
      <div className='justify-center bg-gradient-to-b from-amber-100 to-slate-0'>
        <Header />
        <img src={collectibleImage} alt='pixelcity' className='pt-5 mx-auto h-80' />
        <div className='items-center justify-center px-4 mx-auto md:w-1/2'>
          <div className='flex items-center justify-between'>  
            <div className='my-5 text-5xl text-center'>Pixel City</div>
            <a href="/" className='float-right px-4 py-2 border-2 rounded-md border-cyan-800 bg-cyan-400'>Back</a>
          </div>
          <div className='space-y-4 text-lg'>
            <div>Pixel City is a collection of 1,000 generated NFT’s. <br />Each NFT is considered a memberships with our NFT museum and NFT launchpad that will open later this year. We plan to share revenue made from the launchpad and museum with our NFT holders.
            Pixel City is opening the first NFT Museum in Las Vegas Nevada! <br />The goal is to have an ecosystem that is able to make profit on multiple levels. We are opening an NFT launchpad that will help onboard local artist and partner with local business to launch NFT collections. The revenue earned from the launchpad will be split with our NFT holders to creater the best passive income.
            We will also have a marketplace that will allow consumers to buy NFT’s directly from our Museum.</div>
            <div>Our founder Buythedipnhodl or Michael as he is known as in the real world is best known for building his following online by educating people about the crypto space. He first saw a need for an NFT museum a year ago around the time Miami opened their first NFT museum. As an investor and someone that has been in the crypto space he was growing tired of developers taking money from ICO’s and NFT launches and not reinvesting it into the projects. Which is why as a team we have chosen to reinvest 85% of the money raised during our mint back into Pixel City and opening the NFT museum this year in 2022!</div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <div onClick={() => {mintAmount>0 && mintCollectibles()}}><Button title="Mint" className="items-center" /></div>
            <TextField
              id="filled-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              value={mintAmount}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </div>
          <div className="flex items-center gap-2 mb-10">
            <div className='flex flex-grow h-2 overflow-hidden rounded-full bg-dark-700'>
              <div
                className='flex justify-end h-full rounded-r-full bg-gradient-to-r from-carribean-green to-green'
                style={{ width: `${Number(progress) * 100}%` }}
              />
            </div>
            <div>{`${totalSupply}/1000  (${(Number(progress) * 100).toFixed(2)}`}%)</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PixelCity;
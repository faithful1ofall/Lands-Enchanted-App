import React from 'react'
import Header from '../../components/Header'
import CurrentDrops from '../../components/CurrentDrops'
import PastDrops from '../../components/PastDrops'
import Button from '../../components/Button'
import Logo from "../../assets/logo.png"

const Dashboard: React.FC = () => {
  return (
    <div className='h-full mx-auto mb-0 bg-black from-amber-100 to-slate-0'>
      <Header />
      <div className='w-8/12 p-16 mx-auto'>
        <div className='items-center gap-10 mb-4 lg:flex '>
          <img src={Logo} alt="logo" className=' w-56 h-56 mx-auto ' />
          <div className='space-y-2'>
            <div className='text-[36px] text-white mb-6'> Lands Enchanted </div>
            <div className='text-white'>Lands Enchanted is an NFT Launchpad with a gamefi Experience Inclusive that supports the minting and launch of NFT projects.
            Lands Enchanted is staking 50% of the revenue earned from our launchpad with our LET Token!
            </div>
            <div className='text-white'>Built by Enchanted Network.</div>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScZDnS1iHxfbq58lyb1CjG-oAlJqoLkS2UpOGyuaRZ4f_aOug/viewform' target="_blank"><Button title='Apply' /></a>
          </div>
        </div>
        <CurrentDrops />
        <PastDrops />
      </div>
    </div>
  );
}

export default Dashboard;
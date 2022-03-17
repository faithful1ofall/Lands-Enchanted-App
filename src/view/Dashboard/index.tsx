import React from 'react'
import Header from '../../components/Header'
import CurrentDrops from '../../components/CurrentDrops'
import PastDrops from '../../components/PastDrops'
import Button from '../../components/Button'
import Logo from "../../assets/logo.png"

const Dashboard: React.FC = () => {
  return (
    <div className='h-full mx-auto mb-0 bg-gradient-to-b from-amber-100 to-slate-0'>
      <Header />
      <div className='w-8/12 p-16 mx-auto'>
        <div className='items-center gap-10 mb-4 lg:flex'>
          <img src={Logo} alt="logo" className='w-56 h-56 mx-auto' />
          <div className='space-y-2'>
            <div className='text-[36px] mb-6'> NFT Museum in Las Vegas Nevada</div>
            <div>Pixel City is an NFT Launchpad that supports the minting and launch of NFT projects.
            Pixel City is sharing 50% of the revenue earned from our launchpad with our VIP NFT holders!
            </div>
            <div>Built by Pixel Network.</div>
            <a href='https://forms.gle/ZQiG5ukXRwy64rr29' target="_blank"><Button title='Apply' /></a>
          </div>
        </div>
        <CurrentDrops />
        <PastDrops />
      </div>
    </div>
  );
}

export default Dashboard;
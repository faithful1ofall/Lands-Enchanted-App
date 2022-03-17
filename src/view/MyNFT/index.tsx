import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getCollectibleData } from '../../contract/contract';
import Header from '../../components/Header'

const MyNFT: React.FC = () => {
  const { account } = useWeb3React()
  const [countNFT, setCountNFT] = useState(0)
  const [show, setShow] = useState(false)
  const [urls, setUrls] = useState<Array<string>>([])
  const [url, setUrl] = useState([])

  const getAmount = (val: number) => {
    setCountNFT(val)
  }
  
  useEffect(() => {
    if(account) {
      const get =  async () => {
        const tempUrl = await getCollectibleData(getAmount, account.toString())
        setUrls(tempUrl)
      }  
      get()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let newList:any = [];
    urls.map((url) => {
      if(url==="") return true
      const ipfsUrl = `https://ipfs.io/${url.replace('://', '/')}`;
      newList.push(ipfsUrl)
      return true;
    })
    setUrl(newList)
  }, [urls, show])
  
  return (
    <div className='h-full mx-auto mb-0 bg-gradient-to-b from-amber-100 to-slate-0'>
      <Header />
      <button onClick={() => setShow(true)} className="w-full px-2 my-10 text-5xl text-center text-emerald-600 hover:text-emerald-500 hover:cursor-pointer">See My NFTs</button>
      <div className='items-center justify-center w-2/3 gap-4 mx-auto mb-4 space-y-6 md:px-10'>
        {show && 
          account ?
          (urls.length? 
            url.map((item, idx) => <div key={idx} className="w-full">
                <img src={item} alt="item" />
                {/* <a href={item} target="_blank" className="text-[12px] md:text-lg">{item}</a> */}
              </div>
            ) :
            countNFT ? 
            <div className='flex items-center justify-center w-full gap-2 mx-auto text-2xl'>
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve">
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                  C22.32,8.481,24.301,9.057,26.013,10.047z">
                  <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"/>
                  </path>
              </svg>
              Loading
            </div> :
            <div className='text-3xl text-center'>No NFTs to show</div>
          )
          : <div className='text-3xl text-center'>No account</div>
        }
      </div>
    </div>
  );
}

export default MyNFT;
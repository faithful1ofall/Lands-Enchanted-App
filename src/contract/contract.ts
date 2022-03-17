import Web3 from "web3";
import axios from 'axios'
import { AbiItem } from 'web3-utils'
import PixelCityABI from '../abis/pixelcity.json'

const web3 = new Web3(Web3.givenProvider)
export const pixelcityContract = new web3.eth.Contract(PixelCityABI as AbiItem[], '0xaecd843fc3677a2d3fc142b9c165977d57fe4c40')

export const getCollectibleData = async (getAmount:any, account: string) => {
    let amount = 0
    let tokenIndexes = new Array<number>()
    let tokenURIs = new Array<string>()
    let imageUrls = new Array<string>()
    await pixelcityContract.methods.balanceOf(account).call().then((r:any)=> amount = r)
    getAmount(amount)
    tokenIndexes = []
    tokenURIs = []
    for(let i=0; i<amount; i++) {
        tokenIndexes[i] = await pixelcityContract.methods.tokenOfOwnerByIndex(account, i).call()
        if(tokenIndexes[i]!==0) {
            tokenURIs[i] = await pixelcityContract.methods.tokenURI(tokenIndexes[i]).call()
            const data = await axios.get(tokenURIs[i])
            imageUrls[i] = data.data.image
        } else {
            imageUrls[i] = ''
        }
    }

    return imageUrls
}
import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { useContractRead } from 'wagmi'
import * as CurationManager from "../curation2/artifacts/contracts/CurationManager.sol/CurationManager.json"
import Fetcher from '../components/Fetcher'

const onchainrep: NextPage = () => {

    // curator read call
    const { data, isError, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: "0x9c9FA39424F755F2a82eE01cb6a91212F300f55d", 
        contractInterface: CurationManager.abi,
        functionName: 'viewAllListings',
        watch: true,
        onError(error) {
            console.log("error: ", isError)
        },
        onSuccess(data) {
            console.log("Array of current collections --> ", data)
        }  
    })    

    const dataForFetcher = data ? data : []

    return (
        <div className='flex flex-col justify-center h-screen min-h-screen'>
            <Header />
            <main className="w-full flex flex-row flex-wrap justify-center self-center items-center">        
                <div className="text-white">
                    <Fetcher curatedAddresses={dataForFetcher} />
                </div>
            </main>
        </div>
    )
}

export default onchainrep

import { Header } from '../components/Header'
import { useState } from 'react'
import useSWR from 'swr'
import { request, RequestDocument } from 'graphql-request'
import { useContractRead } from 'wagmi'
import * as CurationManager from "../curation/curation/artifacts/contracts/CurationManager.sol/CurationManager.json"

const API_ENDPOINT = "https://api.zora.co/graphql";

const fetcher = (query: RequestDocument) => request(API_ENDPOINT, query)

const Fetcher = (curatedAddresses) => {

    console.log("what data is coming in : ", curatedAddresses.curatedAddresses[0])

    const collection1_events_query = `
    query ListCollections {
        events(
            where: {collectionAddresses: "${curatedAddresses.curatedAddresses[0]}"}
            filter: {eventTypes: TRANSFER_EVENT}
            networks: {chain: GOERLI, network: ETHEREUM}
            pagination: {limit: 200}
        ) {
            nodes {
                collectionAddress
                eventType
                tokenId
                transactionInfo {
                    blockTimestamp
                    blockNumber
                }
            }
        }
    }
`    
    const { data: collection1_events } = useSWR(collection1_events_query, fetcher, {
        refreshInterval: 1000
    })

    console.log("all events: ", collection1_events)

    return (
        <div className='flex flex-col justify-center h-screen min-h-screen'>
            <Header />
            <main className="w-full flex flex-row flex-wrap justify-center self-center items-center">        
                <div className="text-white">
                    {JSON.stringify(collection1_events)}
                </div>
            </main>
        </div>
    )
}

export default Fetcher

import type { NextPage } from 'next'
import { Header } from '../components/Header'
import useSWR from 'swr'
import { request, RequestDocument } from 'graphql-request'

const API_ENDPOINT = "https://api.zora.co/graphql";

const collection1 = "0x13385748626ed20227957e7f3c31e03542be664d"

const collection1_events_query = `
    query ListCollections {
        events(
            where: {collectionAddresses: "${collection1}"}
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

const fetcher = (query: RequestDocument) => request(API_ENDPOINT, query)

const Api: NextPage = () => {

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

export default Api

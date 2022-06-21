/* eslint-disable no-unused-vars */

// Utils
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import F0 from '../../utils/f0'

// Hooks
import { createClient, useAccount } from 'wagmi'

// Components
import { WagmiConfig } from 'wagmi'

// Types
import { NextPage } from "next";
import { FC } from 'react';
import Connect from '../../components/organisms/web3/Connect';
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'

const contractAddress = '0x24F6328cdDDdad9475c9a3DC2675b5ef851A7C5E'

const MintCollection: FC = () => {
  const { data: account } = useAccount()

  return (
    <>
      <Connect className="my-4" />
    </>
  )
}

const web3Client = createClient({
  connectors: [
    // new MetaMaskConnector(),
    new InjectedConnector(),
    new CoinbaseWalletConnector({
      options: {
        appName: 'Mini DeGens',
      }
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  ]
})

const MiniDegens: NextPage = () => (
  <WagmiConfig client={web3Client}>
    <article className='mx-auto max-w-2xl'>
      <ProjectHeader title="Mini DeGens" category='Web3' tags={['TypeScript', 'React.js']} url="https://twitter.com/mini_degens" />
      <MintCollection />
    </article>
  </WagmiConfig>
)

export default MiniDegens

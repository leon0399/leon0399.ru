/* eslint-disable no-unused-vars */

// Utils
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { F0, F0Factory, Invite } from 'f0ts'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient, useAccount, useProvider, useSigner } from 'wagmi'

// Components
import { WagmiConfig } from 'wagmi'
import Connect from '../../components/organisms/web3/Connect';
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'

// Types
import type { NextPage } from "next";
import type { FC } from 'react';
import MintCollection from '../../components/organisms/web3/f0/MintCollection'

const contractAddress = '0x39CF8198614Ce4710Ed2c3C95C0cE009EAdC8416'

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

const MiniDegens: FC = () => {
  const { data: account } = useAccount()

  return (
    <article className='mx-auto max-w-2xl'>
      <ProjectHeader title="Mini DeGens" category='Web3' tags={['TypeScript', 'React.js']} url="https://twitter.com/mini_degens" />
      <Connect className="my-4" />

      {
        account && <MintCollection contractAddress={contractAddress} />
      }
    </article>
  )
}

const MiniDegensPage: NextPage = () => (
  <WagmiConfig client={web3Client}>
    <MiniDegens />
  </WagmiConfig>
)

export default MiniDegensPage

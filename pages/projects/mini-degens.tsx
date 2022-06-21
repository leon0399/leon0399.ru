/* eslint-disable no-unused-vars */

// Utils
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient, useAccount, useProvider } from 'wagmi'
import { useF0 } from '../../utils/f0/useF0'

// Components
import { WagmiConfig } from 'wagmi'
import Connect from '../../components/organisms/web3/Connect';
import ProjectHeader from '../../components/molecules/projects/ProjectHeader'
import InvitesTable from '../../components/organisms/web3/f0/InvitesTable'

// Types
import type { NextPage } from "next";
import type { FC } from 'react';
import type { Invite } from '../../utils/f0/F0'
import MintInvite from '../../components/organisms/web3/f0/MintInvite'

const contractAddress = '0x24F6328cdDDdad9475c9a3DC2675b5ef851A7C5E'

const MintCollection: FC = () => {
  const { data: account } = useAccount()
  const { data: f0Data } = useF0(contractAddress)

  const myInvitesFilter = useCallback(
    (i) => {
      if (!account?.address) {
        return false
      }

      if (i.key === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        return true
      }

      if (!i.list?.addresses) {
        return true
      }

      if (account?.address && i.list.addresses.includes(account.address)) {
        return true
      }

      return false
    },
    [ account ]
  )
  const myInvites = useMemo(
    () => f0Data?.invites?.filter(myInvitesFilter) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ f0Data, myInvitesFilter, account ]
  )

  const [ selectedInvite, selectInvite ] = useState<Invite>()

  if (f0Data) {
    return (
      <>
        <div className='my-4'>
          <h3 className='text-2xl font-medium'>{ f0Data.name }&nbsp;<small className='text-lg'>({ f0Data.symbol })</small></h3>
          <p>Mint your { f0Data.symbol } below</p>
        </div>

        {
          selectedInvite === undefined
            ? <InvitesTable
                className="my-4 w-full"
                invites={myInvites}
                onSelectInvite={(invite) => { selectInvite(invite) }}
              />
            : <MintInvite
                className="my-4 w-full"
                invite={selectedInvite}
                onClose={() => { selectInvite(undefined) }}
              />
        }
      </>
    )
  }

  return (
    <>
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

const MiniDegens: FC = () => {
  const { data: account } = useAccount()

  return (
    <article className='mx-auto max-w-2xl'>
      <ProjectHeader title="Mini DeGens" category='Web3' tags={['TypeScript', 'React.js']} url="https://twitter.com/mini_degens" />
      <Connect className="my-4" />

      {
        account && <MintCollection />
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

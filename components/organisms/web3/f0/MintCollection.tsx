// Utils
import { F0, F0Factory, Invite } from 'f0ts'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

// Components
import { Icon } from '@iconify/react'
import MintInvite from '../../../molecules/web3/f0/MintInvite'
import InvitesTable from '../../../molecules/web3/f0/InvitesTable'

// Types
import type { FC } from 'react';
import NFT from '../../../molecules/web3/NFT'

interface Props {
  contractAddress: string
}

const MintCollection: FC<Props> = ({ contractAddress }) => {
  const { data: signer } = useSigner()
  const { data: account } = useAccount()

  const f0factory = useMemo(
    () => signer ? new F0Factory(signer, 'mainnet') : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ account, signer ]
  )

  const [f0, setF0] = useState<F0>()

  const fetchF0 = useCallback(
    async () => {
      f0factory && setF0(await f0factory.connect(contractAddress))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ account, signer, contractAddress ]
  )

  useEffect(
    () => { fetchF0() },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ fetchF0, contractAddress ]
  )

  const f0data = useMemo(
    () => f0?.getData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ account, f0, contractAddress ],
  )

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ account, contractAddress ]
  )
  const myInvites = useMemo(
    () => f0?.getData()!.invites?.filter(myInvitesFilter) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ f0, myInvitesFilter, account, contractAddress ]
  )

  const [ selectedInvite, selectInvite ] = useState<Invite>()
  const [ pendingTx, setPendingTx ] = useState<string>()
  const [ mintedTokens, setMintedTokens ] = useState<number[]>()

  useEffect(
    () => {
      if (myInvites.length === 1) {
        selectInvite(myInvites[0])
      }
    },
    [ myInvites ]
  )

  const mint = useCallback(
    async (key: string, count: number) => {
      const mintInfo = await f0!.mint(count, key)
      console.log(mintInfo)
      setPendingTx(mintInfo.tx.hash)

      const tokens = await mintInfo.wait()
      console.log("Tokens", tokens)
      setMintedTokens(tokens)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ f0, account ]
  )

  if (f0data) {
    return (
      <>
        <div className='my-4 text-center'>
          <h3 className='mb-2 text-2xl font-medium'>{ f0data.name }&nbsp;<small className='text-lg'>({ f0data.symbol })</small></h3>
          <p>Mint your { f0data.symbol } below</p>
        </div>

        { mintedTokens ? (
          <div className='grid grid-cols-2 gap-4 items-center p-4 my-4 w-full rounded-2xl border'>
            { mintedTokens.map((tokenId) => (
              <NFT key={`token-${tokenId}`} contractAddress={contractAddress} tokenId={tokenId} />
            )) }
          </div>
          ) : pendingTx ? (
          <div className='flex flex-col items-center py-4 px-6 my-4 w-full rounded-2xl border'>
            <label>Pending TX <Icon icon={'heroicons-outline:refresh'} className="inline w-4 h-4 animate-spin" /></label>
            <code>{ pendingTx }</code>
            <a href={`https://etherscan.io/tx/${pendingTx}`} rel="noreferrer" target={'_blank'} className="mt-4" >
              View on Etherscan <Icon icon={'heroicons-outline:external-link'} className="inline" />
            </a>
          </div>
          ) : selectedInvite === undefined ? (
          <InvitesTable
            className="my-4 w-full"
            invites={ myInvites }
            onSelectInvite={(invite) => { selectInvite(invite) }}
          /> ) : (
          <MintInvite
            className="my-4 w-full"
            invite={ selectedInvite }
            onClose={() => { selectInvite(undefined) }}
            onMint={ mint }
          /> ) }
      </>
    )
  }

  return (
    <div>
      <div className='mx-auto mb-2 w-64 h-8 bg-gray-300 rounded animate-pulse' />
      <div className='mx-auto w-48 h-6 bg-gray-300 rounded animate-pulse' />
    </div>
  )
}

export default MintCollection

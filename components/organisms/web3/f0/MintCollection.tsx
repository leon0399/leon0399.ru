// Utils
import { F0, F0Factory, type Invite } from 'f0ts'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'

// Components
import { Icon } from '@iconify/react'
import MintInvite from '../../../molecules/web3/f0/MintInvite'
import InvitesTable from '../../../molecules/web3/f0/InvitesTable'

// Types
import type { FC } from 'react'
import NFT from '../../../molecules/web3/NFT'

interface Props {
  contractAddress: string
  className?: string
}

const MintCollection: FC<Props> = ({ contractAddress, className }) => {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const f0factory = useMemo(
    () => (signer ? new F0Factory(signer, 'mainnet') : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, signer],
  )

  const [f0, setF0] = useState<F0>()

  const fetchF0 = useCallback(
    async () => {
      f0factory && setF0(await f0factory.connect(contractAddress))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, signer, contractAddress],
  )

  useEffect(
    () => {
      fetchF0()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchF0, contractAddress],
  )

  const f0data = useMemo(
    () => f0?.getData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, f0, contractAddress],
  )

  const myInvitesFilter = useCallback(
    (i: Invite) => {
      if (!address) {
        return false
      }

      if (
        i.key ===
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        return true
      }

      if (!i.list?.addresses) {
        return true
      }

      if (address && i.list.addresses.includes(address)) {
        return true
      }

      return false
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, contractAddress],
  )
  const myInvites = useMemo(
    () => f0?.getData()!.invites?.filter(myInvitesFilter) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f0, myInvitesFilter, address, contractAddress],
  )

  const [selectedInvite, selectInvite] = useState<Invite>()
  const [pendingTx, setPendingTx] = useState<string>()
  const [mintedTokens, setMintedTokens] = useState<number[]>()

  useEffect(() => {
    if (myInvites.length === 1) {
      selectInvite(myInvites[0])
    }
  }, [myInvites])

  const mint = useCallback(
    async (key: string, count: number) => {
      const mintInfo = await f0!.mint(count, key)
      console.log(mintInfo)
      setPendingTx(mintInfo.tx.hash)

      const tokens = await mintInfo.wait()
      console.log('Tokens', tokens)
      setMintedTokens(tokens)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f0, address],
  )

  if (f0data) {
    return (
      <div className={className}>
        <div className="my-4 text-center">
          <h3 className="mb-2 text-2xl font-medium">
            {f0data.name}&nbsp;
            <small className="text-lg">({f0data.symbol})</small>
          </h3>
          <p>Mint your {f0data.symbol} below</p>
        </div>

        {mintedTokens ? (
          <div className="my-4 grid w-full grid-cols-2 items-center gap-4 rounded-2xl border p-4">
            {mintedTokens.map((tokenId) => (
              <NFT
                key={`token-${tokenId}`}
                contractAddress={contractAddress}
                tokenId={tokenId}
              />
            ))}
          </div>
        ) : pendingTx ? (
          <div className="my-4 flex w-full flex-col items-center rounded-2xl border py-4 px-6">
            <label>
              Pending TX{' '}
              <Icon
                icon={'heroicons-outline:refresh'}
                className="inline h-4 w-4 animate-spin"
              />
            </label>
            <code>{pendingTx}</code>
            <a
              href={`https://etherscan.io/tx/${pendingTx}`}
              rel="noreferrer"
              target={'_blank'}
              className="mt-4"
            >
              View on Etherscan{' '}
              <Icon
                icon={'heroicons-outline:external-link'}
                className="inline"
              />
            </a>
          </div>
        ) : selectedInvite === undefined ? (
          <InvitesTable
            className="my-4 w-full"
            invites={myInvites}
            onSelectInvite={(invite) => {
              selectInvite(invite)
            }}
          />
        ) : (
          <MintInvite
            className="my-4 w-full"
            invite={selectedInvite}
            onClose={() => {
              selectInvite(undefined)
            }}
            onMint={mint}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto mb-2 h-8 w-64 animate-pulse rounded bg-gray-300" />
      <div className="mx-auto h-6 w-48 animate-pulse rounded bg-gray-300" />
    </div>
  )
}

export default MintCollection

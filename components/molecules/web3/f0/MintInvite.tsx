import { Icon } from '@iconify/react'
import { formatEther } from 'ethers/lib/utils'
import type { Invite } from 'f0ts'
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { useMemo, useState } from 'react'

import Button from '../../../atoms/Button'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  invite: Invite
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onMint: (key: string, count: number) => Promise<void>
}

const MintInvite: FC<Props> = ({
  invite,
  onClose,
  onMint,
  className,
  ...props
}) => {
  const [mintNumber, setMintNumber] = useState(invite.condition.limit)
  const mintPrice = useMemo(
    () => invite.condition.price.mul(mintNumber),
    [invite, mintNumber],
  )

  const [error, setError] = useState<Error>()
  const [isMinting, setIsMinting] = useState(false)

  return (
    <div
      className={`
        rounded-2xl border
        px-6 py-4
        ${className}
      `}
      {...props}
    >
      <div className="flex flex-row justify-between">
        <h4 className="text-xl font-semibold">{invite.name}</h4>
        <button
          className="rounded p-1.5 ring-offset-2 focus:outline-none focus:ring"
          onClick={() => onClose()}
        >
          <Icon className="" icon={'heroicons-outline:x'} />
        </button>
      </div>

      <div>
        <div className="my-12 text-center text-4xl font-semibold">
          {mintPrice.isZero() ? 'Free' : `${formatEther(mintPrice)} ETH`}
        </div>

        <div className="my-2 flex h-12 flex-row">
          <input
            type={'number'}
            max={invite.condition.limit}
            min={1}
            value={mintNumber}
            onChange={(e) => setMintNumber(+e.target.value.replace(/\D/g, ''))}
            className="
              block
              w-full rounded-l-2xl
              border border-r-0 px-4
              ring-offset-2 focus:outline-none focus:ring
            "
          />
          <Button
            className="rounded-l-none px-8"
            onClick={() => {
              setError(undefined)
              setIsMinting(true)

              onMint(invite.key, mintNumber)
                .catch((e) => {
                  setError(e)
                })
                .finally(() => {
                  setIsMinting(false)
                })
            }}
          >
            {isMinting ? (
              <Icon
                icon={'heroicons-outline:refresh'}
                className="size-4 animate-spin"
              />
            ) : (
              'Mint!'
            )}
          </Button>
        </div>
        {error && (
          <div className="my-2 text-red-800">Error: {error.message}</div>
        )}
      </div>
    </div>
  )
}

export default MintInvite

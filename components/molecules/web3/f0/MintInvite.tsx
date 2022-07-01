import { formatEther } from "ethers/lib/utils"

import { useMemo, useState } from "react"

import { Icon } from "@iconify/react"
import Button from "../../../atoms/Button"

import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import type { Invite } from "@f0ts/core"

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  invite: Invite
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onMint: (key: string, count: number) => Promise<void>
}

const MintInvite: FC<Props> = ({ invite, onClose, onMint, className, ...props }) => {
  const [ mintNumber, setMintNumber ] = useState(invite.condition.limit)
  const mintPrice = useMemo(
    () => invite.condition.price.mul(mintNumber),
    [ invite, mintNumber ]
  )

  const [ error, setError ] = useState<Error>()
  const [ isMinting, setIsMinting ] = useState(false)

  return (
    <div
      className={`
        border rounded-2xl
        py-4 px-6
        ${className}
      `}
      {...props}
    >
      <div className="flex flex-row justify-between">
        <h4 className="text-xl font-semibold">{ invite.name }</h4>
        <button
          className="p-1.5 rounded focus:outline-none focus:ring ring-offset-2"
          onClick={() => onClose()}
        >
          <Icon className="" icon={'heroicons-outline:x'} />
        </button>
      </div>

      <div>
        <div className="my-12 text-4xl font-semibold text-center">
          { mintPrice.isZero() ? 'Free' : `${formatEther(mintPrice)} ETH`}
        </div>

        <div className="flex flex-row my-2 h-12">
          <input
            type={'number'}
            max={invite.condition.limit}
            min={1}
            value={mintNumber}
            onChange={(e) => setMintNumber(+(e.target.value.replace(/\D/g, '')))}
            className="
              px-4
              block w-full
              border border-r-0 rounded-l-2xl
              focus:outline-none focus:ring ring-offset-2
            "
          />
          <Button
            className="px-8 rounded-l-none"
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
            {
              isMinting
                ? <Icon icon={'heroicons-outline:refresh'} className="animate-spin w-4 h-4" />
                : 'Mint!'
            }
          </Button>
        </div>
        { error && (
          <div className="my-2 text-red-800">Error: { error.message }</div>
        ) }
      </div>
    </div>
  )
}

export default MintInvite

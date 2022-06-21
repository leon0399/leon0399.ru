import { formatEther } from "ethers/lib/utils"

import { useMemo, useState } from "react"

import { Icon } from "@iconify/react"
import Button from "../../../atoms/Button"

import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import type { Invite } from "../../../../utils/f0/F0"

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  invite: Invite
  onClose: () => void
}

const MintInvite: FC<Props> = ({ invite, onClose, className, ...props }) => {
  const [ mintNumber, setMintNumber ] = useState(1)
  const mintPrice = useMemo(
    () => invite.condition.price.mul(mintNumber),
    [ invite, mintNumber ]
  )

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
          <Button className="px-8 rounded-l-none">
            Mint!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MintInvite

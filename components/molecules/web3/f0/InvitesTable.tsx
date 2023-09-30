import { formatEther } from 'ethers/lib/utils'
import { Invite } from 'f0ts'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import Button from '../../../atoms/Button'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  invites: Invite[]
  // eslint-disable-next-line no-unused-vars
  onSelectInvite: (invite: Invite) => void
}

const InvitesTable: FC<Props> = ({
  invites,
  onSelectInvite,
  className,
  ...props
}) => {
  return (
    <div className={`rounded-2xl border py-4 ${className}`} {...props}>
      <table className="w-full table-auto pt-4">
        <thead>
          <tr>
            <th className="border-b p-4 pl-8 pt-0 text-left">Name</th>
            <th className="border-b p-4 pt-0 text-right">Price</th>
            <th className="border-b p-4 pt-0 text-right">Limit</th>
            <th className="border-b p-4 pr-8 pt-0" />
          </tr>
        </thead>
        <tbody className="bg-white">
          {invites.map((invite) => (
            <tr key={invite.key} className="my-2">
              <td className="border-b border-gray-100 p-4 pl-8 text-left">
                {invite.name}
              </td>
              <td className="border-b border-gray-100 p-4 text-right">
                {invite.condition.price.isZero()
                  ? 'Free'
                  : `${formatEther(invite.condition.price)} ETH`}
              </td>
              <td className="border-b border-gray-100 p-4 text-right">
                {invite.condition.limit}
              </td>
              <td className="border-b border-gray-100 p-4 pr-8">
                <Button
                  className="block h-12 w-full px-4"
                  onClick={() => onSelectInvite(invite)}
                >
                  Mint
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvitesTable

import { formatEther } from "ethers/lib/utils"
import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { Invite } from "../../../../utils/f0/F0"
import Button from "../../../atoms/Button"

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  invites: Invite[]
  // eslint-disable-next-line no-unused-vars
  onSelectInvite: (invite: Invite) => void
}

const InvitesTable: FC<Props> = ({ invites, onSelectInvite, className, ...props }) => {
  return (
    <div className={`py-4 rounded-2xl border ${className}`} {...props}>
      <table className="pt-4 w-full table-auto">
        <thead>
          <tr>
            <th className='p-4 pt-0 pl-8 text-left border-b'>Name</th>
            <th className='p-4 pt-0 text-right border-b'>Price</th>
            <th className='p-4 pt-0 text-right border-b'>Limit</th>
            <th className="p-4 pt-0 pr-8 border-b" />
          </tr>
        </thead>
        <tbody className="bg-white">
          { invites.map((invite) => (
              <tr key={invite.key} className="my-2">
                <td className='p-4 pl-8 text-left border-b border-gray-100'>{ invite.name }</td>
                <td className='p-4 text-right border-b border-gray-100'>
                  { invite.condition.price.isZero() ? 'Free' : `${formatEther(invite.condition.price)} ETH`}
                </td>
                <td className='p-4 text-right border-b border-gray-100'>{ invite.condition.limit }</td>
                <td className="p-4 pr-8 border-b border-gray-100">
                  <Button
                    className="block px-4 w-full h-12"
                    onClick={() => onSelectInvite(invite)}
                  >
                    Mint
                  </Button>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
    </div>
  )
}

export default InvitesTable

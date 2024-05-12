// Hooks
// Components
import { Icon } from '@iconify/react'
import { useMemo } from 'react'
// Types
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import Button from '../../atoms/Button'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Profile: FC<Props> = ({ className, ...props }) => {
  const { address, connector } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { disconnect } = useDisconnect()

  const displayAddress = useMemo(
    () => `${address?.slice(0, 6)}…${address?.slice(-4)}`,
    [address],
  )
  const displayName = useMemo(
    () =>
      (ensName ? `${ensName} (${displayAddress})` : displayAddress) +
      (connector ? ` via ${connector?.name}` : ''),
    [ensName, displayAddress, connector],
  )

  return (
    <div className={`flex flex-row items-center ${className}`} {...props}>
      <div className="mr-4 rounded-full bg-gray-100">
        {ensAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ensAvatar} alt={displayName} />
        ) : (
          <Icon
            icon={'heroicons-outline:user'}
            className="m-2 size-8 text-gray-600"
          />
        )}
      </div>
      <div className="text-lg font-semibold">{displayName}</div>

      <Button
        className="
          ml-auto block
          h-12 px-16
        "
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </div>
  )
}

export default Profile

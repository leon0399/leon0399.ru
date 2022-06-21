// Hooks
import { useMemo } from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

// Components
import { Icon } from "@iconify/react";

// Types
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import Button from "../../atoms/Button";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //
}

const Profile: FC<Props> = ({ className, ...props }) => {
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName({ address: account?.address })
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { disconnect } = useDisconnect()

  const displayAddress = useMemo(
    () => `${account?.address?.slice(0, 6)}…${account?.address?.slice(-4)}`,
    [ account ]
  )
  const displayName = useMemo(
    () => ensName ? `${ensName} (${displayAddress})` : displayAddress,
    [ ensName, displayAddress ]
  )

  return (
    <div className={`flex flex-row items-center ${className}`} {...props}>
      <div className="mr-4 bg-gray-100 rounded-full">
        {
          ensAvatar
            ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ensAvatar} alt={displayName} />
            )
            : (
              <Icon icon={'heroicons-outline:user'} className="m-2 w-8 h-8 text-gray-600" />
            )
        }
      </div>
      <div className="text-lg font-semibold">{ displayName }</div>

      <Button
        className="
          ml-auto h-12
          block px-16
        "
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </div>
  )
}

export default Profile

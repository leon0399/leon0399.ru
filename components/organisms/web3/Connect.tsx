// Hooks
import { useAccount, useConnect } from 'wagmi'

// Components
import Profile from './Profile'
import Button from '../../atoms/Button'

// Types
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Connect: FC<Props> = ({ ...props }) => {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()

  const { data: account } = useAccount()

  if (account) {
    return <Profile {...props} />
  }

  return (
    <div {...props}>
      {connectors.map((connector) => {
        const isPendingConnector =
          isConnecting && connector.id === pendingConnector?.id

        return (
          <Button
            key={connector.id}
            disabled={!connector.ready || isPendingConnector}
            className="
              block px-16 mb-4 w-full h-14
            "
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isPendingConnector && ' (connecting)'}
          </Button>
        )
      })}

      {error && <div className="text-red-700">Error: {error.message}</div>}
    </div>
  )
}

export default Connect

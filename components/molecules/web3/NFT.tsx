import createThrottle from 'p-throttle'

// Hooks
import { useCallback, useEffect, useState } from 'react'

// Components
import Button from '../../atoms/Button'

// Types
import type { FC } from 'react'

const throttle = createThrottle({
  limit: 1,
  interval: 2000,
})

const fetchAsset = throttle(
  async (contractAddress: string, tokenId: number): Promise<NFTData> => {
    const response = await fetch(
      `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`,
    )

    if (!response.ok) {
      throw Error(
        `OpenSea request failed with status: ${response.status}. Make sure you are on mainnet.`,
      )
    }

    const data = await response.json()

    return data
  },
)

interface Props {
  contractAddress: string
  tokenId: number
}

export interface NFTData {
  id: number

  background_color?: string
  image_url?: string
  image_preview_url?: string
  image_thumbnail_url?: string
  image_original_url?: string
  animation_url?: string
  animation_original_url?: string

  name: string
  description?: string

  asset_contract: {
    name: string
    symbol: string
  }
}

const NFT: FC<Props> = ({ contractAddress, tokenId }) => {
  const [nftData, setNftData] = useState<NFTData>()

  const fetchData = useCallback(async () => {
    const data = await fetchAsset(contractAddress, tokenId)

    setNftData(data)
  }, [contractAddress, tokenId])

  useEffect(() => {
    fetchData()
  }, [contractAddress, tokenId])

  if (!nftData) {
    return (
      <div className="rounded-lg border">
        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        <div className="p-4">
          <div className="mb-1 w-48 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />

          <div className="flex flex-row justify-end mt-2">
            <div className="w-24 h-10 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={nftData.image_url}
        alt={nftData.name}
        className="w-full rounded-lg"
      />
      <div className="p-4">
        <h5 className="mb-1 font-medium">{nftData.name}</h5>
        <p className="text-sm">{nftData.asset_contract.name}</p>

        <div className="flex flex-row justify-end mt-2">
          <Button
            className="py-2 px-4"
            href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenSea
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NFT

/* eslint-disable no-unused-vars */

import { useEffect, useMemo } from 'react';
import { useQueryClient, useQuery } from 'react-query'
import { useAccount, useProvider } from 'wagmi';

import { F0, F0Config, Invite } from './F0'

export type UseF0Config = F0Config

export interface GetF0Result {
  name: string
  symbol: string
  invites: Invite[]
}

export function useF0(contractAddress: string) {
  const provider = useProvider()
  const { data: account } = useAccount()

  const f0 = useMemo(
    () => new F0({ contractAddress, providerOrSigner: provider }),
    [ contractAddress, provider ]
  )

  const queryKey = ['f0', contractAddress];
  const query = useQuery<GetF0Result>(
    queryKey,
    async () => {
      const [
        name,
        symbol,
        invites,
      ] = await Promise.all([
        f0.name(),
        f0.symbol(),
        f0.invites(),
      ])

      return {
        name,
        symbol,
        invites,
      }
    }
  )

  return query
}

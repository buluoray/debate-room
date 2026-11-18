import { useNavBadge } from '@kirocrew/app-sdk'
import { useEffect } from 'react'

// Shows the number of saved decisions on this app's sidebar item.
// A count of 0 clears the badge.
export function useDecisionBadge(count: number): void {
  const setBadge = useNavBadge()
  useEffect(() => {
    setBadge(count)
  }, [setBadge, count])
}

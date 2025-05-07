'use client'

import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../graphql/queries/getUserInfo'

export default function CurrentUserInfo() {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)

  if (loading) return <p className="text-center">Loading user information...</p>
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>
  if (!data || !data.currentUser)
    return <p className="text-center">No user information available.</p>

  const { currentUser } = data

  return (
    <button className="bg-white hover:border-primary-blue-300 border-2 border-primary-blue-200 text-sm duration-100 ease-in text-black px-4 py-2 rounded-md flex font-medium flex-row items-center gap-2.5">
      <div className="rounded-2xl bg-amber-200 h-4 w-4"></div>
      {currentUser.name}
    </button>
  )
}

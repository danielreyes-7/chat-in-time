'use client'

import { UserAuth } from '@/context/AuthContext'

export default function Chat() {
  const { user } = UserAuth()

  return (
    <div className='p-8'>
      <div
        className={`w-4/6 mx-auto flex justify-center ml-auto p-2 bg-zinc-700 rounded-md hover:translate-y-[-4px] duration-300`}
      >
        <p>
          Welcome,{' '}
          <strong>{user?.displayName ?? user?.email ?? 'Guest'}</strong>
        </p>
      </div>
      <div className=''></div>
    </div>
  )
}

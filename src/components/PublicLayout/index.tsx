'use client'
import clsx from 'clsx'

export const PublicLayout = () => {
  return (
    <div
      className={clsx(
        ' w-full flex border-b-[0.1px] border-solid border-gray-500 items-center justify-between p-2'
      )}
    >
      <h1>Are you prepared to get into this?</h1>
    </div>
  )
}

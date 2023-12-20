'use client'
import clsx from 'clsx'
import { FC } from 'react'
import { type IconType } from 'react-icons'

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
}

export const AuthSocialButton: FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'inline-flex w-full justify-center rounded-md bg-gray-500 px-4 py-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-500 transition-all duration-500 hover:bg-gray-500/70 focus:outline-offset-0 hover:text-teal-500'
      )}
      type='button'
      onClick={onClick}
    >
      <Icon />
    </button>
  )
}

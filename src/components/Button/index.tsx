'use client'
import { FC, type ReactNode } from 'react'

import clsx from 'clsx'

type ButtonVariants = 'default' | 'secondary' | 'danger'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: ReactNode
  onClick?: () => void
  variant?: ButtonVariants
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  variant = 'default',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
      flex
      justify-center
      rounded-md
      px-3
      py-2
      h-8
      text-sm
      text-gray-200
      font-semibold
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2
      `,
        disabled && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        variant === 'secondary' &&
          'bg-teal-600 transition-all duration-500 hover:bg-teal-700 focus-visible:outline-teal-700',
        variant === 'danger' &&
          'bg-rose-500 transition-all duration-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        variant === 'default' &&
          'text-zinc-900 bg-gray-500 transition-all duration-500 hover:bg-gray-400 focus-visible:outline-gray-400'
      )}
    >
      {children}
    </button>
  )
}

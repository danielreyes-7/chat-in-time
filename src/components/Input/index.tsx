'use client'
import { FC, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import clsx from 'clsx'

import { type FieldValues, type UseFormRegister } from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: any
  register: UseFormRegister<FieldValues>
  errors: any
  disabled?: boolean
  isPassword?: boolean
}

export const Input: FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  isPassword,
}) => {
  const [watchPassword, setWatchPassword] = useState<boolean>(false)

  return (
    <div className='flex flex-col'>
      <label className='block text-sm font-medium leading-6' htmlFor={id}>
        {label}
      </label>
      <div className='flex'>
        <input
          id={id}
          type={isPassword && watchPassword ? 'text' : type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { ...required })}
          className={clsx(
            `form-input
          tracking-widest
          w-full       
          rounded-md
          border-0
          mt-2
          py-3
          shadow-sm
          ring-1
          ring-inset
          h-9
          bg-zinc-900          
          ring-gray-500
          placeholder:text-gray-400
          transition-all
          duration-500
          focus:outline-none
          focus:outline-0          
          sm:text-sm
          sm:leading-6`,
            isPassword && 'w-[90%] rounded-e-none',
            errors[id]
              ? 'ring-rose-500 focus:ring-rose-500'
              : ' focus:ring-teal-700',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        <>
          {isPassword && (
            <div
              className='flex justify-center items-center w-[10%] cursor-pointer transition-colors duration-500 hover:bg-zinc-800 ring-1 ring-inset ring-gray-500 mt-2 rounded-e-md'
              onClick={() => setWatchPassword(!watchPassword)}
            >
              {!watchPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </>
      </div>
      {errors[id] && (
        <p className='text-rose-500 text-[12px] mt-1'>{errors[id]?.message}</p>
      )}
    </div>
  )
}


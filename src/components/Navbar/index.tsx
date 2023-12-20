'use client'
import { UserAuth } from '@/context/AuthContext'
import { PublicLayout } from '../PublicLayout'
import { usePathname } from 'next/navigation'

export const Layouts = () => {
  const { user } = UserAuth()
  const pathname = usePathname()
  return <>{!user && pathname === '/' && <PublicLayout />}</>
}

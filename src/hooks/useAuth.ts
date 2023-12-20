import { UserAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export type LoginProps = {
  email: string
  password: string
}

export type AuthError =
  | 'auth/invalid-email'
  | 'auth/weak-password'
  | 'auth/email-already-in-use'

export type ErrorMessage = {
  [key in AuthError]: string
}
const UseAuth = () => {
  const router = useRouter()
  const { setUser } = UserAuth()

  const loginCredentials = async (formData: LoginProps) => {
    const URL_API_ROUTE = window.location?.origin
    try {
      const res: Response = await fetch(
        `${URL_API_ROUTE}/api/auth/loginCredentials`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          cache: 'no-cache',
        }
      )
      const data = await res.json()

      if (res?.status === 401 && data?.error === 'auth/invalid-credential') {
        toast('Invalid email and/or password', {
          icon: '❌',
          style: {
            borderRadius: '6px',
            background: 'rgba(107, 114, 128)',
            color: '#dce0e6',
          },
          position: 'bottom-left',
        })
      }

      if (res?.status === 200) {
        toast('Welcome!', {
          icon: '✅',
          style: {
            borderRadius: '6px',
            background: 'rgba(107, 114, 128)',
            color: '#dce0e6',
          },
          position: 'bottom-left',
        })
        router.replace('/main/chat')
      } else {
        toast(data?.error, {
          icon: '✅',
          style: {
            borderRadius: '6px',
            background: 'rgba(107, 114, 128)',
            color: '#dce0e6',
          },
          position: 'bottom-left',
        })
      }
    } catch (error: any) {
      toast(error?.code, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
    }
  }

  const logout = async () => {
    const URL_API_ROUTE = window?.location?.origin

    try {
      const res: Response = await fetch(`${URL_API_ROUTE}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      })

      setUser(null)
      if (res.status === 200) router.replace('/')
    } catch (error: any) {
      toast(error?.code, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
    }
  }

  const loginGoogleProvider = async () => {
    const URL_API_ROUTE = window?.location?.origin
    try {
      const res: Response = await fetch(
        `${URL_API_ROUTE}/api/auth/loginGoogleProvider`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        }
      )
    } catch (error: any) {
      toast(error?.code, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
    }
  }

  return {
    loginCredentials,
    loginGoogleProvider,
    logout,
  }
}

export default UseAuth


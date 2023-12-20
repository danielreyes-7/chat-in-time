'use client'
import { Button } from '@/components/Button'
import { Input } from '../../../../components/Input'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { UserAuth } from '@/context/AuthContext'

import { type FieldValues, useForm, type SubmitHandler } from 'react-hook-form'
import { AuthSocialButton } from '../AuthSocialButton'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import UseAuth from '@/hooks/useAuth'

export type Variant = 'LOGIN' | 'REGISTER'
export type AuthError =
  | 'auth/invalid-email'
  | 'auth/weak-password'
  | 'auth/email-already-in-use'
export type ErrorMessage = {
  [key in AuthError]: string
}

export const LoginForm = () => {
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const {
    googleSignIn,
    githubSignIn,
    signUpNewUser,
    loadingAuth,
    setLoadingAuth,
    signInWithCredentials,
  } = UserAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      signUpEmail: '',
      signUpPassword: '',
    },
  })

  useEffect(() => {
    reset({
      email: '',
      password: '',
      signUpEmail: '',
      signUpPassword: '',
    })
  }, [reset, variant])

  const toggleVariants = useCallback(() => {
    variant === 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
  }, [variant])

  const handleSignIn = async (social: string) => {
    if (social === 'google') {
      try {
        await googleSignIn()
        router.replace('/main/chat')
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
      } finally {
        setLoadingAuth(false)
      }
    }

    if (social === 'github') {
      try {
        await githubSignIn()
        router.replace('/main/chat')
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
      } finally {
        setLoadingAuth(false)
      }
    }
  }

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signUpNewUser(email, password)
      toast('Successfully registered!', {
        icon: '✅',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
      setVariant('LOGIN')
    } catch (error: any) {
      const errorsHandlers: ErrorMessage = {
        'auth/invalid-email': 'Should use a valid email',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/email-already-in-use': 'Email already in use',
      }
      const errorCode = error.code as AuthError
      const errorMessage = errorsHandlers[errorCode] || 'An error occurred'
      toast(errorMessage, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
    } finally {
      setLoadingAuth(false)
    }
  }

  const handleCredentialsSignIn = async (email: string, password: string) => {
    try {
      await signInWithCredentials(email, password)
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
    } catch {
      toast('Invalid email and/or password', {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      })
    } finally {
      setLoadingAuth(false)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (variant === 'REGISTER') {
      await handleSignUp(formData.signUpEmail, formData.signUpPassword)
    }

    await handleCredentialsSignIn(formData.email, formData.password)
  }

  return (
    <div className='w-[95%] mt-12 md:mt-32 sm:w-1/2 md:w-[40%] lg:w-[400px] sm:ring-1 sm:ring-inset sm:ring-gray-500 p-8 rounded-lg'>
      <h1 className='text-2xl text-center mb-6'>
        {variant === 'LOGIN' ? 'Sign in to Chat in Time!' : 'Register'}
      </h1>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
        {variant === 'LOGIN' ? (
          <>
            <Input
              id='email'
              label='Email'
              register={register}
              errors={errors}
              disabled={loadingAuth}
              type='email'
              required={{
                required: {
                  value: true,
                  message: 'Email field is required',
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
                  message: 'Invalid email format',
                },
              }}
            />
            <Input
              id='password'
              label='Password'
              register={register}
              errors={errors}
              disabled={loadingAuth}
              isPassword={true}
              type='password'
              required={{
                required: {
                  value: true,
                  message: 'Password field is required',
                },
                minLength: {
                  value: 6,
                  message: 'Must include at least 6 digits',
                },
              }}
            />
          </>
        ) : (
          <>
            <Input
              id='signUpEmail'
              label='Email'
              register={register}
              errors={errors}
              disabled={loadingAuth}
              type='email'
              required={{
                required: {
                  value: true,
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
                  message: 'Invalid email format',
                },
              }}
            />
            <Input
              id='signUpPassword'
              label='Password'
              register={register}
              errors={errors}
              disabled={loadingAuth}
              isPassword={true}
              type='password'
              required={{
                required: {
                  value: true,
                },
                minLength: {
                  value: 6,
                },
              }}
            />
          </>
        )}
        <Button
          disabled={loadingAuth}
          variant='secondary'
          fullWidth
          type='submit'
        >
          {variant === 'LOGIN' ? 'SIGN IN' : 'LET´S BEGIN'}
        </Button>
      </form>
      <div className='mt-6'>
        <div className='flex justify-evenly'>
          <div className={clsx('w-[24%] h-[1px] self-center bg-gray-400')} />
          <div className='w-1/2 flex justify-center text-sm hover:cursor-default'>
            <span className={clsx('text-center px-2')}>Or continue with</span>
          </div>
          <div className={clsx('w-[24%] h-[1px] self-center bg-gray-400')} />
        </div>
        <div className='mt-6 flex gap-2'>
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => handleSignIn('google')}
          />
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => handleSignIn('github')}
          />
        </div>
        <div className='flex gap-2 justify-center text-xs mt-6 px-2'>
          <p className='hover:cursor-default'>
            {variant === 'LOGIN'
              ? 'New to Chat in Time?'
              : 'Already have an account?'}
          </p>
          <p onClick={toggleVariants} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Sign up' : 'Sign in'}
          </p>
        </div>
      </div>
    </div>
  )
}

import { type Variant } from '@/components/Login/LoginForm';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export type LoginProps = {
  email: string;
  password: string;
};

export type AuthError =
  | 'auth/invalid-email'
  | 'auth/weak-password'
  | 'auth/email-already-in-use';

export type ErrorMessage = {
  [key in AuthError]: string;
};
const UseAuth = () => {
  const router = useRouter();
  const {
    googleSignIn,
    githubSignIn,
    signUpNewUser,
    setLoadingAuth,
    signInWithCredentials,
  } = UserAuth();

  const handleSignInProvider = async (social: string) => {
    if (social === 'google') {
      try {
        await googleSignIn();
        router.replace('/main/chat');
      } catch (error: any) {
        toast(error?.code, {
          icon: '❌',
          style: {
            borderRadius: '6px',
            background: 'rgba(107, 114, 128)',
            color: '#dce0e6',
          },
          position: 'bottom-left',
        });
      } finally {
        setLoadingAuth(false);
      }
    }

    if (social === 'github') {
      try {
        await githubSignIn();
        router.replace('/main/chat');
      } catch (error: any) {
        toast(error?.code, {
          icon: '❌',
          style: {
            borderRadius: '6px',
            background: 'rgba(107, 114, 128)',
            color: '#dce0e6',
          },
          position: 'bottom-left',
        });
      } finally {
        setLoadingAuth(false);
      }
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    setVariant: React.Dispatch<React.SetStateAction<Variant>>
  ) => {
    try {
      await signUpNewUser(email, password);
      toast('Successfully registered!', {
        icon: '✅',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
      setVariant('LOGIN');
    } catch (error: any) {
      const errorsHandlers: ErrorMessage = {
        'auth/invalid-email': 'Should use a valid email',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/email-already-in-use': 'Email already in use',
      };
      const errorCode = error.code as AuthError;
      const errorMessage = errorsHandlers[errorCode] || 'An error occurred';
      toast(errorMessage, {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleCredentialsSignIn = async (email: string, password: string) => {
    try {
      await signInWithCredentials(email, password);
      toast('Welcome!', {
        icon: '✅',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
      router.replace('/main/chat');
    } catch {
      toast('Invalid email and/or password', {
        icon: '❌',
        style: {
          borderRadius: '6px',
          background: 'rgba(107, 114, 128)',
          color: '#dce0e6',
        },
        position: 'bottom-left',
      });
    } finally {
      setLoadingAuth(false);
    }
  };

  return { handleSignInProvider, handleSignUp, handleCredentialsSignIn };
};

export default UseAuth;

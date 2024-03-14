'use client';
import {
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/app/firebase';
import { deleteCookie, setCookie } from 'cookies-next';

interface ContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  googleSignIn: () => Promise<void>;
  githubSignIn: () => Promise<void>;
  signUpNewUser: (email: string, password: string) => Promise<void>;
  loadingAuth: boolean;
  setLoadingAuth: Dispatch<SetStateAction<boolean>>;
  signInWithCredentials: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<ContextProps | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  const googleSignIn = async () => {
    setLoadingAuth(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((userLoggedGoogle) => {
      // @ts-ignore
      setCookie('token', userLoggedGoogle?.user?.accessToken);
    });
  };

  const githubSignIn = async () => {
    setLoadingAuth(true);
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider).then((userLoggedGithub) => {
      // @ts-ignore
      setCookie('token', userLoggedGithub?.user?.accessToken);
    });
  };

  const signUpNewUser = async (email: string, password: string) => {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithCredentials = async (email: string, password: string) => {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password).then(
      (userLogged) => {
        // @ts-ignore
        setCookie('token', userLogged?.user?.accessToken);
      }
    );
  };

  const logOut = async () => {
    setLoadingAuth(true);
    await signOut(auth);
    deleteCookie('token');
  };

  useEffect(() => {
    const userState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => userState();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleSignIn,
        githubSignIn,
        signInWithCredentials,
        signUpNewUser,
        loadingAuth,
        logOut,
        setLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The UserAuth must be used inside the AuthContextProvider');
  }

  return context;
};

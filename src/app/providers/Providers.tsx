import { AuthContextProvider } from '../../context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

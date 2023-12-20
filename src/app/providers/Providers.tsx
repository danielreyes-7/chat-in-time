import { AuthContextProvider } from '../../context/AuthContext'
import { ToasterContext } from '../../context/ToasterContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <ToasterContext />
      {children}
    </AuthContextProvider>
  )
}

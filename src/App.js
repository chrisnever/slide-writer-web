import { AuthContextProvider } from './context/AuthContext'
import AppRoutesContainer from './AppRoutesContainer'
//Styles
import './App.css'

function App () {
  return (
    <AuthContextProvider>
      <AppRoutesContainer />
    </AuthContextProvider>
  )
}

export default App

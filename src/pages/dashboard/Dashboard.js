import React, { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import PresentationList from '../../components/PresentationList/PresentationList'
import { useParams } from 'react-router-dom'


const Dashboard = () => {
  let navigate = useNavigate()
  const [ name, setName ] = useState('testProjectDelete')
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')
  const {documents, error} = useCollection('projects')

  const createNewDocument = () => {
    const createdBy = {
      displayName: user.displayName,
      id: user.uid
    }

    const presentation = {
      name,
      createdBy
    }
    console.log(presentation)
    // add the document
    addDocument(presentation)
    if (!response) {
      navigate('/')
    }
  }

  return (
    <div>
      <h1>Welcome</h1>
      {error && <p>{error}</p>}
      {documents && <PresentationList presentations={documents}/> }
      <button onClick={createNewDocument}>Create new Presentation</button>
      {!isPending && <button onClick={logout}>Logout</button>}
      {isPending && <button disabled>Loggin out...</button>}
    </div>
  )
}

export default Dashboard

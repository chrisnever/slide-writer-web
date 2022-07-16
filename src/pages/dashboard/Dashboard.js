import React, { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import PresentationList from '../../components/PresentationList/PresentationList'
import { useParams } from 'react-router-dom'

// Styles
import styles from './dashboard.module.css'

const Dashboard = () => {
  let navigate = useNavigate()
  const [name, setName] = useState('Untitled Presentation')
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')
  const { documents, error } = useCollection('projects')

  const createNewDocument = () => {
    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    }
    const imageUrl = "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2350&q=80"
    const presentation = {
      name,
      createdBy,
      imageUrl,
      rawData: [
        {
          type: 'paragraph',
          children: [{ text: 'Start writing your latest presentation.' }]
        }
      ]

    }
    console.log(presentation)
    // add the document
    addDocument(presentation)
    if (!response) {
      navigate('/')
    }
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardProjectContainer}>
        <div className={styles.dashboardHeader}>
          <h2 style={{ textTransform: 'capitalize' }}>
            {user.displayName}'s Presentations
          </h2>
          <div className={styles.dashboardHeaderButtonContainer}>
            <button onClick={createNewDocument}>Create new Presentation</button>
            {!isPending && <button onClick={logout}>Logout</button>}
            {isPending && <button disabled>Loggin out...</button>}
          </div>
        </div>
        {error && <p>{error}</p>}
        {documents && <PresentationList presentations={documents} />}
      </div>
    </div>
  )
}

export default Dashboard

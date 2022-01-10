import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './presentation-list.module.css'

const PresentationList = ({ presentations }) => {
  const { documents, error } = useCollection('projects')
  return (
    <div className={styles.presentationListCardContainer}>
      {presentations.length === 0 && <p>No presentations yet</p>}

      {presentations.map(presentation => (
        <Link
          className={styles.presentationListCard}
          to={`/editor/${presentation.id}`}
          key={presentation.id}
        >
          <h4>{presentation.name}</h4>
          <p>Created by {presentation.createdBy.displayName}</p>
        </Link>
      ))}
    </div>
  )
}

export default PresentationList

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCollection } from '../../hooks/useCollection'
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'

// Create formatter (English).

// styles
import styles from './presentation-list.module.css'

const PresentationList = ({ presentations }) => {
  TimeAgo.addDefaultLocale(en)

  const timeAgo = new TimeAgo('en-US')

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
          <img className={styles.PresentationListImage} src={presentation.imageUrl}></img>
          <h4>{presentation.name}</h4>
          <span style={{ textTransform: 'capitalize' }}>
            Edited {presentation.modifiedDate ? timeAgo.format(presentation.modifiedDate.toDate()) : timeAgo.format(presentation.createdAt.toDate())} by {presentation.createdBy.displayName}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default PresentationList

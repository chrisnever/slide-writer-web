import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './presentation-list.module.css'

const PresentationList = ({ presentations }) => {
  const { documents, error } = useCollection('projects')
  return (
    <div className={styles.presentationListCardContainer}>
      {presentations.length === 0 && <p>No presentations yet</p>}

      {presentations.map(presentation => (
        <motion.div
          style={{borderRadius: "8px"}}
          whileTap={{ scale: 0.99 }}
          whileHover={{
            scale: 1.005,
            transition: {type: "spring", stiffness: 100 },
            boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.07)'
          }}
        >
          <Link
            className={styles.presentationListCard}
            to={`/editor/${presentation.id}`}
            key={presentation.id}
          >
            <h4>{presentation.name}</h4>
            <p>Created by {presentation.createdBy.displayName}</p>
            <span>
              Created by{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {presentation.createdAt.toDate().toDateString()}
              </span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default PresentationList

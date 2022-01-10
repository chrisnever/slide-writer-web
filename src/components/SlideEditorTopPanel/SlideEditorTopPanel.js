import React, { useState, useMemo, useCallback, Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon } from '@radix-ui/react-icons'


const SlideEditorTopPanel = ({ data, showSlideEditorTopPanel }) => {
  return (
    <AnimatePresence>
      {showSlideEditorTopPanel && (
        <motion.div
          initial={{ left: -200 }}
          animate={{ left: 0 }}
          exit={{ left: -200 }}
          className={styles.slidePane}
        >
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideEditorTopPanel

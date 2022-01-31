import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ReaderIcon,
  CardStackIcon,
  IdCardIcon,
  ViewVerticalIcon,
  PlayIcon,
  GearIcon,
  HomeIcon
} from '@radix-ui/react-icons'
import styles from './top-menu.module.css'

const TopMenu = ({
  handleToggleSidePanel,
  handleTogglePresentationMode,
  props,
  userData
}) => {
  let activeStyle = {
    color: 'var(--color-blue)'
  }
  const { user } = useAuthContext()

  return (
    <div className={styles.topMenu}>
      <div className={styles.topMenuLeft}>
        <Link to='/' className={styles.topMenuButton}>
          <HomeIcon />
        </Link>
        <button className={styles.topMenuButton}>
          <ArrowLeftIcon />
        </button>
        <button className={styles.topMenuButton}>
        <span>{user.displayName}</span>
        </button>
        <button className={styles.topMenuButton}>
          <ArrowRightIcon />
        </button>
        <button
          className={styles.topMenuButton}
          onClick={handleToggleSidePanel}
        >
          <ViewVerticalIcon />
        </button>
      </div>
      <div className={styles.topMenuCenter}>
        <NavLink
          to='edit-text'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className={styles.topMenuNavButton}
        >
          Content <ReaderIcon />
        </NavLink>
        <NavLink
          to='edit-slides'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className={styles.topMenuNavButton}
        >
          Slide
          <CardStackIcon />
        </NavLink>
        <NavLink
          to='edit-text+slides'
          className={styles.topMenuNavButton}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Split <IdCardIcon />
        </NavLink>
      </div>
      <div className={styles.topMenuRight}>
        <button className={styles.topMenuButton}>
          <GearIcon />
        </button>
        <button className={styles.topMenuButton}>
          <ViewVerticalIcon />
        </button>
        <button
          className={styles.topMenuButton}
          onClick={handleTogglePresentationMode}
        >
          <PlayIcon />
        </button>
      </div>
    </div>
  )
}

export default TopMenu

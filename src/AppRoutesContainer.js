import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Editor from './pages/editor/Editor'
import TextEditor from './pages/textEditor/TextEditor'
import SlideEditor from './pages/slideEditor/slideEditor'
import SplitEditor from './pages/splitEditor/SplitEditor'

import { useAuthContext } from './hooks/useAuthContext'

function AppRoutesContainer () {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className='App'>
      {authIsReady && (
        <Router>
          <Routes>
            <Route path="editor/:id/*" element={user ? <Editor /> : <Login />} >
              <Route index element={<TextEditor />} />
              <Route path="edit-text" element={<TextEditor />}></Route>
              <Route path="edit-slides" element={<SlideEditor />}></Route>
              <Route path="edit-text-slides" element={<SplitEditor />}></Route>
            </Route>
            <Route path='/login' element={user ? <Dashboard /> : <Login />} />
            <Route path='/signup' element={user ? <Dashboard /> : <SignUp />} />
            <Route path='/' element={user ? <Dashboard /> : <Login />}></Route>
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default AppRoutesContainer

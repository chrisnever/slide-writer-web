import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Pages
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Editor from './pages/editor/Editor'
import TextEditor from './pages/textEditor/TextEditor'
import SlideEditor from './pages/slideEditor/slideEditor'
import SplitEditor from './pages/splitEditor/SplitEditor'

import TopMenu from './components/TopMenu/TopMenu'

import { useAuthContext } from './hooks/useAuthContext'

//Styles
import './App.css'

function App () {
  const { user, authIsReady } = useAuthContext()

  //testing need to figure out where to put state - probably firebase...
  const [serialisedText, setSerialisedText] = useState(' # test')
  const handleMarkdownUpdate = val => {
    setSerialisedText(val)
    //testing upload data
    console.log(serialisedText)
  }

  return (
    <div className='App'>
      {authIsReady && (
        <Router>
          <Routes>
            <Route path="editor/:id/*" element={user ? <Editor /> : <Login />} >
              <Route index element={<TextEditor />} />
              <Route path="edit-text" element={<TextEditor />}></Route>
              <Route path="edit-slides" element={<SlideEditor serialisedText={serialisedText}/>}></Route>
              <Route path="edit-text+slides" element={<SplitEditor />}></Route>
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

export default App

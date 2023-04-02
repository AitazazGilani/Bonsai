import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInSide from './pages/SignInSide.js';
import SignUpSide from './pages/SignUpSide.js';
import Landing from './pages/Landing.js'
import Home from './pages/Home.js'
import AddMessage from './pages/AddMessage.js';
import ExpandedMessage from './pages/ExpandedMessage.js';
import MessageDetails from './pages/MessageDetails.js'
function App() {
  return (
    <div>
      <Router>
         <Routes>
         <Route exact path='/' element={<Landing/>} />
          <Route exact path='/SignIn' element={<SignInSide/>} />
          <Route exact path='/SignUp' element={<SignUpSide/>} />
          <Route exact path='/Home' element={<Home/>} />
          <Route exact path='/AddMessage' element={<AddMessage/>} />
          <Route exact path='/message/:id' element={<ExpandedMessage/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

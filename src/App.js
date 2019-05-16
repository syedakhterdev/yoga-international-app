import React from 'react';
import logo from './logo.svg';

import YogaClasses from './components/YogaClasses';
import NavBar from './components/common/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <YogaClasses />
    </div>
  );
}

export default App;

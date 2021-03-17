import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header'
import Post from './components/Post'

function App() {
  return (
    <div>
      <Header />
      <Post />
      <Post />
    </div>
  );
}

export default App;

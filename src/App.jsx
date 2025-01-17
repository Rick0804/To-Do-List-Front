import React from 'react';
import SideBar from './components/sidebar/SideBar';
import Header from './components/header/Header'
import AppRouter from './routes/AppRoutes';
import './App.css'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <SideBar />
        <AppRouter />
      </BrowserRouter>
  );
};

export default App;
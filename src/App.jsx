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
        <div className="main-content">
          <SideBar />
          <AppRouter />
        </div>
      </BrowserRouter>
  );
};

export default App;
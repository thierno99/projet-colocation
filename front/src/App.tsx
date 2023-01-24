import React from 'react';
import './App.css';
import Header from './components/shared/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRouter, { FooterRoot } from './routers/HomeRouter';

function App() {
  return (
    <BrowserRouter>
    
      <header>
        <Header/>
      </header>

      <main>
        <Routes>
          <Route path='/*' element={<HomeRouter/>} />
        </Routes>
        
      </main>

      <FooterRoot/>

    </BrowserRouter>
  );
}

export default App;

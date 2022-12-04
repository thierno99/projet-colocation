import React from 'react';
import './App.css';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRouter from './routers/HomeRouter';

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

      <footer>
        <Footer/>
      </footer>
    </BrowserRouter>
  );
}

export default App;

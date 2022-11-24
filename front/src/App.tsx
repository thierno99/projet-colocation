import React from 'react';
import './App.css';
import Footer from './components/shared/footer/Footer';
import Header from './components/shared/header/Header';
import Home from './components/home/Home';

function App() {
  return (
    <>
      <header>
        <Header/>
      </header>

      <main>
        <Home/>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;

import './App.css';
import React from 'react'
import BodyComponent from './components/body/BodyComponent';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <BodyComponent />
      <Footer />
    </div>
  );
}

export default App;

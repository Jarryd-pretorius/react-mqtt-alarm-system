import "./App.css";
import React from "react";
import BodyComponent from "./components/body/BodyComponent";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import ControlsBar from "./components/controlBar/ControlsBar";

function App() {
  return (
    <div className="flex flex-row h-screen justify-between">
      <div className="flex flex-col w-full">
        <Header />
        <BodyComponent />
        <Footer />
      </div>
      <ControlsBar />
    </div>
  );
}

export default App;

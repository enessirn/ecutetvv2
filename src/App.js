import React,{useState} from "react";
import SliderBanner from './components/Home/SliderBanner';
import Header from "./components/Home/Header";
function App() {
const [toggleBool, setToggleBool] = useState(false)
  return (
    <div className="!m-0 !p-0 !box-border">
    <Header
    toggle={toggleBool}
    setToggle={setToggleBool} /> 
    <SliderBanner
    toggle={toggleBool}
    />
    </div>
  );
}

export default App;

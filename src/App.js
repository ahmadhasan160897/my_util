import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TextForm from './components/TextForm';
 
import About from './components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  
    
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
  setAlert({
    msg: message,
    type: type
  })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = "#042743"
      showAlert("Dark Mode has been selected", "success")
      document.title = "Text Utils - Dark Mode" ;
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = "white"
      showAlert("Light Mode has been selected", "success")
      document.title = "Text Utils - Light Mode" ;
    }
  }

  return (
    <>
   {/*  <Navbar title = "Utils" aboutText = "About Us" />  */}
   {/*  <Navbar title = {2}aboutText = "About Us" />  */}
   {/*<Navbar /> */}
   <div>
   {/* <Navbar title = "Utils" aboutText = "About Us" mode={mode} toggleMode={toggleMode} />
     <Alert alert = {alert} />      */}
    {/* <Navbar title = "Utils"  mode={mode} toggleMode={toggleMode} />
      <Alert alert = {alert} />
     
      <TextForm showAlert = {showAlert} heading="Enter text to analyze"   mode={mode} />  
          */}
   <div className='container my-3' >
   <Router>
   <Navbar title = "Utils"  mode={mode} toggleMode={toggleMode} />
      <Alert alert = {alert} />
    <Switch>
      <Route path='/About'>
      <About mode={mode} />
      </Route>
      <Route exact path='/'> 
      <TextForm showAlert = {showAlert} heading="Enter text to analyze"   mode={mode} />  
      </Route>
    </Switch>
   </Router>
   </div>
  

  {/* <TextToSpeech /> */}
   
  </div>
  
 </>

  );
}

export default App;

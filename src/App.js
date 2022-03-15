import './App.css';
import { createTheme, ThemeProvider, Container} from "@mui/material"
import PiggiFundMaker from './components/PiggiFundMaker';
import {Routes, Route,Link, Redirect} from "react-router-dom";
import Home from './components/Home';
import PiggiFundUI from './components/PiggiFundUI';
import Navbar from './components/usefulComponents/Navbar';
import Contracts from './components/Contracts';
import FactoryABI from "./chain-info/abi.json"
import Footer from './components/usefulComponents/Footer';

let theme = createTheme({
  palette: {
    primary: {
      main: '#d7a8df',
    },
    secondary: {
      main: '#ffef62',
    },
  },
  typography: {
    fontFamily: "Lato"
  }
});

function App() {
  const piggiFundAddress = '0x6c8892552CbB90Adc871eDF8Ed10cFbFCC6c1072'
  const abi = FactoryABI

  return (
    <ThemeProvider theme={theme}>
       
    <Container className="App">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="maker" element={<PiggiFundMaker piggiFundAddress={piggiFundAddress} abi={abi}/>}/> 
        <Route path="ui" element= {<PiggiFundUI piggiFundAddress={piggiFundAddress} abi={abi}/>}/>
        <Route path="contracts" element={<Contracts piggiFundAddress={piggiFundAddress} abi={abi}/>} />
      </Routes>
      <Footer/>
    </Container>
    
  </ThemeProvider>
  );
}

export default App;

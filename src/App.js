import './App.css';
import { createTheme, ThemeProvider, Container,Typography } from "@mui/material"
import PiggiFundMaker from './components/PiggiFundMaker';
import {Routes, Route,Link, Redirect} from "react-router-dom";
import Home from './components/Home';
import PiggiFundUI from './components/PiggiFundUI';

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
  return (
    <ThemeProvider theme={theme}>
    <Container className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="maker" element={<PiggiFundMaker/>}/> 
        <Route path="UI" element= {<PiggiFundUI/>}/>
      </Routes>
     
    </Container>
  </ThemeProvider>
  );
}

export default App;

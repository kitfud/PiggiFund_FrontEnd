import './App.css';
import { createTheme, ThemeProvider, Container } from "@mui/material"
import PiggiFundMaker from './components/PiggiFundMaker';

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
      <PiggiFundMaker/>
    </Container>
  </ThemeProvider>
  );
}

export default App;

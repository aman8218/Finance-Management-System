import Navbar from "./Components/Navbar/Navbar"
import styled from 'styled-components'
import Routes from './pageRoutes'

function App() {

  return (
    <>
    <AppStyled className="App" >
    <Routes/>
    </AppStyled>
    </>
  )
}

const AppStyled = styled.div `
height: 100vh;
position: relative;

}
`;


export default App

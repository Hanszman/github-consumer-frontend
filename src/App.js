// Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/layout/container/Container';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/pages/home/Home';
import User from './components/pages/user/User';

// TODO: User details page
// TODO: Repositories table

// Component
function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/user/:username' element={<User/>}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

// Exportation
export default App;
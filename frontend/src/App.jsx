import './App.scss';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

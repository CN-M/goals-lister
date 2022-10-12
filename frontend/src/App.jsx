import './App.scss';
import Nav from './components/Nav/Nav';
import Goals from './components/Goals/Goals';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>

        <Nav />
          <h1>Welcome Home</h1>
          <Goals />
        <Footer />
      </Router>
    </>
  );
}

export default App;

import './App.scss';
import Nav from './components/Nav/Nav';
import Goals from './components/Goals/Goals';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Nav />
        <h1>Welcome Home</h1>
        <Goals />
      <Footer />
    </>
  );
}

export default App;

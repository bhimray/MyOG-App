import './App.css';
import Filter from './components/Website/Filter/Filter';
import HomePage from './components/Website/Home/HomePage/HomePage';
import LandingPage from './components/Website/Landing/LandingPage';
import Map from './components/Website/Map/Map';

function App() {
  return (
    <div className="App">
      {/* <LandingPage/> */}
      <HomePage/>
      {/* <Filter/>
      <Map/> */}
    </div>
  );
}

export default App;

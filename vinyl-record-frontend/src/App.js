// import logo from './logo.svg'; -- not using this now, but leaving for future use
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VinylList from './components/VinylList';
import VinylAdd from './components/VinylAdd';
import VinylEdit from './components/VinylEdit';

function App() {
  return (
    <Router>
      <div>
        <h1>Spin the Black Circle!</h1>
        <div>Managing Your Vinyl Record Collection</div>
        <Routes>
          <Route path="/" element={<VinylList />} />
          <Route path="/add" element={<VinylAdd />} />
          <Route path="/edit/:vinylRecordId" element={<VinylEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

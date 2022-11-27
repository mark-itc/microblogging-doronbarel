import { Routes, Route } from 'react-router-dom';
import Feed from "./views/Feed";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DetailAcivity, Home } from './pages';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity/:id" element={<DetailAcivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import SplineBackground from './Components/SplineBackground';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <SplineBackground />
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;

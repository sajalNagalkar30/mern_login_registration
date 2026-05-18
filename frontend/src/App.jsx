import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import api from './api/axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get('/api/users/me');
          setUser(response.data);
        } catch {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login setUser={setUser} /> : <Navigate to='/students' />} />
        <Route path='/register' element={!user ? <Register setUser={setUser} /> : <Navigate to='/students' />} />
        <Route path='/students' element={user ? <Students /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;

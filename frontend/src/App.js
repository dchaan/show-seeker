import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/SignUp';
import Homepage from './components/Homepage/Homepage'
import EventsIndex from './components/Events/EventsIndex';
import Profile from './components/Profile/Profile';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' exact={true} element={<Login />} />
        <Route path='/signup' exact={true} element={<Signup />} />
        <Route path='/events' exact={true} element={<EventsIndex />} />
        <Route path='/users/:userId/profile' exact={true} element={<Profile />} />
        <Route path='/' exact={true} element={<Homepage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

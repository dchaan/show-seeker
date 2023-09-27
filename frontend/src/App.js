import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
// import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Homepage from "./components/Homepage/Homepage"
import EventsIndex from "./components/Events/EventsIndex";
import EventPage from "./components/Events/EventPage";
import ConcertsIndex from "./components/Concerts/ConcertsIndex";
import SportsIndex from "./components/Sports/SportsIndex";
import ArtistsIndex from "./components/Artists/ArtistsIndex";
import ArtistPage from "./components/Artists/ArtistPage";
import VenuesIndex from "./components/Venues/VenuesIndex";
import ArtsAndTheatreIndex from "./components/ArtsAndTheatre/ArtsAndTheatreIndex";
import FamilyIndex from "./components/Family/FamilyIndex";
import Profile from "./components/Profile/Profile";
import Favorites from "./components/Profile/Favorites";
import GenresIndex from "./components/Genres/GenresIndex";
import { authenticate } from "./store/session";
import Purchases from "./components/Profile/Purchases";

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
        <Route path='/events/:eventId' exact={true} element={<EventPage />} />
        <Route path='/events/concerts' exact={true} element={<ConcertsIndex />} />
        <Route path='/events/sports' exact={true} element={<SportsIndex />} />
        <Route path='/artists' exact={true} element={<ArtistsIndex />} />
        <Route path='artists/:artistId' exact={true} element={<ArtistPage />} />
        <Route path='/events/arts&theatre' exact={true} element={<ArtsAndTheatreIndex />} />
        <Route path='/events/family' exact={true} element={<FamilyIndex />} />
        <Route path='/venues' exact={true} element={<VenuesIndex />} />
        <Route path='/genres' exact={true} element={<GenresIndex />} />
        <Route path='/users/:userId/profile' exact={true} element={<Profile />} />
        <Route path='/users/:userId/favorites' exact={true} element={<Favorites />} />
        <Route path='/users/:userId/purchases' exact={true} element={<Purchases />} />
        <Route path='/' exact={true} element={<Homepage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

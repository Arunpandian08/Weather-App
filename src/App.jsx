import React from 'react';
import WeatherDisplay from './Pages/Weather/WeatherDisplay';
import Map from './Pages/Map/Map'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Animation from './Utility/Animation/Animation';

const App = () => {
  return (
    <div className='scroll-container'>
      <div className="container-f">
       {/* <Navbar /> */}
          <Animation />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/weather' element={<WeatherDisplay />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
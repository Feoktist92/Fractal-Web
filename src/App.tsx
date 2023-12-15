import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Home, Info, Advantages, About } from './pages';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/info' element={<Info />} />
                <Route path='/advantages' element={<Advantages />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

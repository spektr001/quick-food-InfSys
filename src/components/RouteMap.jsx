import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { AdminPanel } from './AdminPanel/AdminPanel';
import { MainScreen } from './MainScreen/MainScreen';

const Routemap = () => {
    return (
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/adminPanel" element={<AdminPanel />} />
            </Routes>
    );
}

export default Routemap;

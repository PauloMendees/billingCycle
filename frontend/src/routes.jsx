import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashBoard from './components/DashBoard/DashBoard';
import Admin from './pages/Admin/Admin';
import Ciclos from './pages/Ciclos/Ciclos';
import CicloUnitario from './pages/Ciclos/CicloUnitário';
import AutenticacaoPage from './pages/Login/AutenticacaoPage';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<DashBoard/>} />
            <Route exact path="/dashboard" element={<DashBoard/>} />
            <Route exact path="/ciclos" element={<Ciclos/>} />
            <Route exact path="/ciclounitario/:id" element={<CicloUnitario />} />
            <Route exact path="/admin" element={<Admin />} />
        </Routes>
    );
}
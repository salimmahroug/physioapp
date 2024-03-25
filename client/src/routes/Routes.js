import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Auth from '../Auth/Login';
import Page from '../Pages/Page';
import Dashboard from '../Pages/supervisorCategory/Dashboard';
import Prompt from '../Components/Prompt';


function Routers() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}  />
                <Route path="/login" element={<Auth/>} />
                <Route path="/page" element={<Page/>}  />
                <Route path="/Dashboard/*" element={<Dashboard/>}  />
                <Route path="/prompt" element={<Prompt/>}  />
            </Routes>
        </>
    );
} 

export default Routers;

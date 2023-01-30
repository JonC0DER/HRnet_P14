import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ResetModaleMsg } from "../features/resetModaleMsg"
import Home from '../pages/Home'
import ListEmployees from "../pages/ListEmployees"

export const RouterLogic = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee-list" element={<ListEmployees />} />
                <Route path="/reset-employee" element={<ResetModaleMsg />} />
            </Routes>
        </BrowserRouter>
    )
}

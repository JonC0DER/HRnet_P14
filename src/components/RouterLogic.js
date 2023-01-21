import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import ListEmployees from "../pages/ListEmployees"

export const RouterLogic = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee-list" element={<ListEmployees />} />
            </Routes>
        </BrowserRouter>
    )
}

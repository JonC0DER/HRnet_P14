import { BrowserRouter, Routes, Route } from "react-router-dom"
import NewEmployeeContainer from "./NewEmployeeContainer"

export const RouterLogic = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NewEmployeeContainer />} />
            </Routes>
        </BrowserRouter>
    )
}

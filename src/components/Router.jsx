import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./screen/App"
import CardDetail from "./card-detail/CardDetail"
import UserAtuh from "./auth/auth"
import UserProfile from "./user-profile/UserProfile"
import Admin from "./admin/Admin"


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path="/" />
                <Route element={<CardDetail />} path="/card/:id" />
                <Route element={<UserAtuh />} path="/auth" />
                <Route element={<Admin />} path="/admin" />
                <Route element={<Admin />} path="/admin/:id" />
                <Route element={<UserProfile />} path="/profile" />
                <Route element={<div>Страница не сужествует</div>} path="*" />
            </Routes>
        </BrowserRouter>)
}
export default Router
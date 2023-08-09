import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./screen/App"
import CardDetail from "./card-detail/CardDetail"
import UserAtuh from "./auth/auth"
import UserProfile from "./user-profile/UserProfile"
import Admin from "./admin/Admin"
import Ticket from "./ticket/Ticket"
import Invintation from "./screen/Invintation"
import AboutUsScreen from "./screen/AboutUsScreen"
import Choose from "./screen/Choose"
import Sweets from "./screen/Sweets"
import Wedding from "./invintationPage/Wedding"
import Sunnat from "./invintationPage/Sunnat"
import Congratulatory from "./invintationPage/Congratulatory"
import Anniversary from "./invintationPage/Anniversary"
import Electronic from "./electronic/Electronic"
const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Choose />} path="/" />
				<Route element={<App />} path="/invintation" />
				<Route element={<Sweets />} path="/sweets" />
				<Route element={<Invintation />} path="/invintation-cards" />
				<Route element={<Wedding />} path="/invintation/wedding" />
				<Route element={<Sunnat />} path="/invintation/sunnat" />
				<Route element={<Electronic />} path="/electronic" />
				<Route element={<Electronic />} path="/electronic/:id" />
				<Route element={<Congratulatory />} path="/invintation/congratulatory" />
				<Route element={<Anniversary />} path="/invintation/anniversary" />
				<Route element={<AboutUsScreen />} path="/about-us" />
				<Route element={<CardDetail />} path="/card/:id" />
				<Route element={<UserAtuh />} path="/auth" />
				<Route element={<Admin />} path="/admin" />
				<Route element={<Admin />} path="/admin/:id" />
				<Route element={<UserProfile />} path="/profile" />
				<Route element={<Ticket />} path="/ticket" />
				<Route element={<div>Страница не сужествует</div>} path="*" />
			</Routes>
		</BrowserRouter>)
}
export default Router
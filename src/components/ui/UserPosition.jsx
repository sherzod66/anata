import { BsFillHouseDoorFill } from "react-icons/bs";
import './ui.css'
import { Link } from "react-router-dom";
const UserPosition = ({ title, subTitle }) => {
    console.log(subTitle);
    return <div className="user__position">
        <div className="user__position_container">
            <div className="user__position_pos">
                <Link to={'/invintation'}><BsFillHouseDoorFill className="user__pos_icon" /></Link>/{title}{subTitle ? subTitle : ''}
            </div>
            <h1 className="user__position_title">{title} Anatasam</h1>
        </div>
    </div>
}
export default UserPosition
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./admin.css"
import AdminOrders from "./AdminOrders";
import AdminCreateO from "./AdminCreateO";
import { GetCard, GetReport } from "../services/service";
import { getDatabase, ref } from "firebase/database";
import CreateCard from "./CreateCard";
import SearchId from "./SearchId"
import FilterStatus from "./FilterStatus";
import SearchName from "./SearchName";
import Report from "./Report";
import ReportFiletr from "./ReportFiletr";
import { GetDataUid } from "../dateOrders/dateOrders";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const Admin = () => {
    const [authIf, setAuthIf] = useState(false)
    const [db, setDb] = useState(false)
    const [report, setReport] = useState(false)
    const navigate = useNavigate()
    const dbRef = ref(getDatabase(app));
    const { id } = useParams()
    const logOut = () => {
        if (authIf) {
            signOut(auth).then(() => {
                navigate('/')
            })
                .catch((error) => console.log(error))
        }
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
                setAuthIf(true)
                if (id === 'orders') {
                    GetCard(dbRef, setDb, 'orders')
                } else if (id === 'create-order') {
                    GetCard(dbRef, setDb, 'cards')
                } else if (id === 'create-card') {
                    setDb([{ id: 1 }])
                }
                else if (id === 'report') {
                    GetCard(dbRef, setDb, 'cards')
                }
            } else {
                console.log("Пользовательне не найден")
                setAuthIf(false)
            }
        })
    }, [id])
    const getUrl = (db) => {
        if (id === 'orders') {
            return <AdminOrders key={db.id} data={db} />
        } else if (id === 'create-order') {
            return <AdminCreateO key={db.id} data={db} />
        } else if (id === 'create-card') {
            return <CreateCard key={db.id} />
        } else if (id === 'report') {
            return <Report key={db.id} data={db} dbref={dbRef} />
        }
        else {
            return ''
        }
    }
    function getRepotr(event) {
        if (event.target.value === 'Отчет за сегодня') {
            GetReport(dbRef, setReport, `report/${GetDataUid()}`, setDb)
        }
    }


    return <>
        {authIf ? <div className="admin">
            <div className="admin__shell">
                <div className="admin__side-bar">
                    <h1>Админ Панель</h1>
                    <ul className="side-bar__list">
                        <li ><Link to={'/admin/orders'}>Заказы</Link></li>
                        <li><Link to={'/admin/create-order'}>Новый заказ</Link></li>
                        <li><Link to={'/admin/create-card'}>Создать пригласительную</Link></li>
                        <li><Link to={'/admin/report'}>Отчёт</Link></li>
                    </ul>
                    <button className="admin__log-out" onClick={logOut} type="button">Выйти</button>
                </div>
                <div className="admin__content">
                    <div className="filter">
                        {id === 'orders' ?
                            <>
                                <SearchId data={db} />
                                <FilterStatus data={db} />
                                <SearchName data={db} />
                            </>
                            : ''}

                        {id === 'create-order' ?
                            <>
                                <SearchId data={db} id={id} />
                                <SearchName data={db} />
                            </>
                            : ''}
                        {id === 'report' ?
                            <>
                                <ReportFiletr data={db} getRepotr={getRepotr} report={report} />
                            </>
                            : ''}
                    </div>
                    <div className="admin__row">
                        {
                            db ? db.map(element => (getUrl(element))) : <p>👈</p>
                        }
                    </div>

                </div>
            </div>
        </div> : <p>Войдите</p>}
    </>
}
export default Admin
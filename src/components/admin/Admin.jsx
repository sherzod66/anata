import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./admin.css"
import AdminOrders from "./AdminOrders";
import AdminCreateO from "./AdminCreateO";
import { GetCard, GetCardOrders, GetReport } from "../services/service";
import { getDatabase, ref } from "firebase/database";
import CreateCard from "./CreateCard";
import Report from "./Report";
import { GetDataUid } from "../dateOrders/dateOrders";
import { AuthContext } from "../context/AuthProvider";
import { loazyLoadImage } from "../loazy load/loazyImage";
import AdminHtml from "./AdminHtml";
import CreateEIvintation from "./CreateEIvin";
import Electronics from "./Electronics";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const Admin = () => {
	const { usUid, setUsUid } = useContext(AuthContext)
	const [authIf, setAuthIf] = useState(false)
	const [data, setdata] = useState(false)
	const [data2, setdata2] = useState(false)
	const [report, setReport] = useState('')
	const navigate = useNavigate()
	const dataRef = ref(getDatabase(app));
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
		if (usUid) {
			if (usUid.uid === "FX2ExaD5TGOkoXbohvygrm0SZR62") {
				setAuthIf(true)
				if (id === 'orders') {
					setdata('')
					GetCardOrders(dataRef, setdata, 'orders', setdata2)
				} else if (id === 'create-order') {
					setdata('')
					GetCard(dataRef, setdata, 'cards')
				} else if (id === 'create-card') {
					setdata('')
					setdata([{ id: 1 }])
				}
				else if (id === 'create-electronic') {
					setdata('')
					setdata([{ id: 1 }])
				}
				else if (id === 'electronic') {
					setdata('')
					setdata([{ id: 1 }])
				}
				else if (id === 'report') {
					setdata('')
					setReport('')
				}
			} else {
				console.log("Пользовательне не найден")
				setAuthIf(false)
			}
		}
	}, [id, usUid])
	useEffect(() => loazyLoadImage(), [data])
	const getUrl = (db) => {
		if (id === 'orders') {
			return <AdminOrders key={db.id} data={db} />
		} else if (id === 'create-order') {
			return <AdminCreateO key={db.id} data={db} />
		} else if (id === 'create-card') {
			return <CreateCard key={db.id} />
		} else if (id === 'create-electronic') {
			return <CreateEIvintation key={db.id} />
		} else if (id === 'electronic') {
			return <Electronics key={db.id} />
		} else if (id === 'report') {
			return <Report key={db.cardId + `${Math.random() * 10000}`} report={db} />
		}
		else {
			return ''
		}
	}
	function getRepotr(event) {
		if (event.target.value === 'Отчет за сегодня') {
			GetReport(dataRef, setReport, `report/${GetDataUid()}`, setdata)
		}
	}
	function getStatus(event) {
		if (!data) return
		const arrayData = data2;
		if (event.target.value === 'Нужно сделать') {
			const filter = arrayData.filter(elem => {
				return +elem.lastDate > +Date.parse(new Date()) && elem.status === 'В ожидании'
			})
			setdata(filter)
		} else if (event.target.value === 'В процессе') {
			const filter2 = arrayData.filter(elem => elem.status === 'В процессе')
			setdata(filter2)
		} else if (event.target.value === 'Можно забирать') {
			const filter3 = arrayData.filter(elem => elem.status === 'Можно забирать')
			setdata(filter3)
		} else if (event.target.value === 'Забрал') {
			const filter4 = arrayData.filter(elem => elem.status === 'Забрал')
			setdata(filter4)
		} else if (event.target.value === 'Все') {
			setdata(data2)
		}
	}
	return <>
		{authIf ? <AdminHtml data={data} report={report} id={id} logOut={logOut} getUrl={getUrl} getRepotr={getRepotr} getStatus={getStatus} /> : <p>По данному адресу публикаций на сайте не найдено, либо у Вас нет доступа для просмотра информации по данному адресу.</p>}
	</>
}
export default Admin
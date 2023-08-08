import ErrorPopap from "../ui/Error";
import Errorfilled from "../ui/ErrorFileds";
import LoadedInfo from "../ui/LoadedInfo";
import ErrorUpload from "../ui/ErrorUpload";
import ReportFiletr from "./ReportFiletr";
import SearchId from "./SearchId"
import FilterStatus from "./FilterStatus";
import SearchName from "./SearchName";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const AdminHtml = ({ data, report, id, logOut, getUrl, getRepotr, getStatus }) => {
    const [burger, setBurger] = useState(false)
    const { t, i18n } = useTranslation()
    return <div className="admin">
        <ErrorPopap />
        <Errorfilled />
        <LoadedInfo />
        <ErrorUpload />
        <div className="admin__shell">
            <div onClick={(e) => setBurger(!burger)} className={`admin__die ${burger ? 'active' : ''}`}></div>
            <div className={`admin__side-bar ${burger ? 'active' : ''}`}>
                <h1>{t("adminPanel")}</h1>
                <ul className="side-bar__list">
                    <li ><Link className={`side-bar__list_link ${id === 'orders' ? 'active' : ''}`} to={'/admin/orders'}>{t("adminOrders")}</Link></li>
                    <li><Link className={`side-bar__list_link ${id === 'create-order' ? 'active' : ''}`} to={'/admin/create-order'}>{t("adminNewOrder")}</Link></li>
                    <li><Link className={`side-bar__list_link ${id === 'create-card' ? 'active' : ''}`} to={'/admin/create-card'}>{t("adminCreateInvintation")}</Link></li>
                    <li><Link className={`side-bar__list_link ${id === 'report' ? 'active' : ''}`} to={'/admin/report'}>{t("adminReport")}</Link></li>
                </ul>
                <button className="admin__log-out" onClick={logOut} type="button">{t("adminSignOut")}</button>
            </div>
            <div className="admin__content">
                <div onClick={(e) => setBurger(!burger)} className={`admin__burger ${burger ? 'active' : ''}`}><span></span></div>
                <div className="filter">
                    {id === 'orders' ?
                        <>
                            <SearchId data={data} id={id} />
                            <FilterStatus getStatus={getStatus} />
                            <SearchName data={data} />
                        </>
                        : ''}

                    {id === 'create-order' ?
                        <>
                            <SearchId data={data} id={id} />
                            <SearchName data={data} id={id} />
                        </>
                        : ''}
                    {id === 'report' ?
                        <>
                            <ReportFiletr data={data} getRepotr={getRepotr} report={report} />
                        </>
                        : ''}
                </div>
                <div className="admin__row">
                    {id === 'report' ?
                        report ? report.map(element => (
                            getUrl(element)
                        )) : <p>👈</p> :
                        data.length > 0 ? data.map(element => (getUrl(element))) : <p>❌</p>
                    }
                </div>
            </div>
        </div>
    </div>
}
export default AdminHtml
export const GetData = (date) => {
    const data = new Date(`${date}`)
    return `${data.getFullYear()}, ${data.getDate()} ${GetMonth(data)}, ${data.getHours()}:${data.getMinutes()}`
}
const GetMonth = (month) => {
    const m = new Date(`${month}`).getMonth()
    if (m === 0) {
        return "Января"
    } else if (m === 1) {
        return "Феврля"
    } else if (m === 2) {
        return "Марта"
    } else if (m === 3) {
        return "Апреля"
    } else if (m === 4) {
        return "Мая"
    } else if (m === 5) {
        return "Июня"
    } else if (m === 6) {
        return "Июля"
    } else if (m === 7) {
        return "Августа"
    } else if (m === 8) {
        return "Сентября"
    } else if (m === 9) {
        return "Октября"
    } else if (m === 10) {
        return "Ноября"
    } else if (m === 7) {
        return "Декабря"
    }
}

export const GetCardUid = (date) => {
    const data = new Date(date)
    return `${getHours(date)}${getMin(date)}${data.getMilliseconds()}`
}

function getHours(h) {
    const hours = new Date(h).getHours()
    return hours < 9 ? `0${hours}` : hours
}
function getMin(m) {
    const minutes = new Date(m).getMinutes()
    return minutes < 9 ? `0${minutes}` : minutes
}


export const GetDataUid = () => {
    const data = new Date();
    return `${GetDate(data)}${GetMnth(data)}${data.getFullYear()}`
}

function GetDate(d) {
    const dt = new Date(d).getDate()
    return dt < 9 ? `0${dt}` : dt
}
function GetMnth(m) {
    let mn = new Date(m).getMonth() + 1
    return mn < 9 ? `0${mn}` : mn
}

export const GetDataUidLast = (d) => {
    const data = new Date(d);
    return `${GetDate(data)}${GetMnth(data)}${data.getFullYear()}`
}

export const GetDataLast = (d) => {
    const data = new Date(d);
    return `${data.getFullYear()}-${GetMnth(data)}-${GetDate(data)}`
}

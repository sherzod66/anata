export const getNameValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].birthdayPeople = event.target.value })] }))
}
export const getDateValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].date = event.target.value })] }))
}

export const getTimeValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].time = event.target.value })] }))
}
export const getCommentValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].comment = event.target.value })] }))
}
export const getRestorantValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].restorant = event.target.value })] }))
}
export const getFamlyValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].famly = event.target.value })] }))
}
export const getLangValue = (event, info, setState) => {
    let result = info.cardInfo.findIndex(item => {
        return item.cardId === event.target.id
    })
    setState(prev => ({ ...prev, cardInfo: [...prev.cardInfo, ...prev.cardInfo.slice(result, 0, { ...prev.cardInfo[result].lang = event.target.value })] }))
}
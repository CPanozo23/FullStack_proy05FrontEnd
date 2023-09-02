export function dateFormatDMY(dateF) {
    const date = new Date(dateF.toLocaleString("es-CL", { timeZone: "America/Santiago" }))
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const formattedDate = `${day}-${month}-${year}`
    console.log(formattedDate)
    return formattedDate
}

export function dateFormatYMD(dateF) {
    const date = new Date(dateF.toLocaleString("es-CL", { timeZone: "America/Santiago" }))
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate)
    return formattedDate
}

export function dateLongFormat(dateF) {
    const date = new Date(dateF)

    const optionsDate = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }

    const formattedDate = date.toLocaleDateString('es-CL', optionsDate)
    return formattedDate
}

export function hourFormat(dateF) {
    const date = new Date(dateF)

    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const formattedTime = date.toLocaleTimeString('es-CL', optionsTime)
    
    return formattedTime
}

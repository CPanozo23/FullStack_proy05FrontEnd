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
    const date = new Date(dateF); // Convertir la cadena a un objeto Date

    const optionsDate = {
        weekday: 'long', // Día de la semana en formato largo (ejemplo: "miércoles")
        day: 'numeric', // Día del mes en formato numérico (ejemplo: "30")
        month: 'long', // Mes en formato largo (ejemplo: "agosto")
        year: 'numeric', // Año en formato numérico (ejemplo: "2023")
    }

    const formattedDate = date.toLocaleDateString('es-CL', optionsDate);
    return formattedDate;
}

export function hourFormat(dateF) {
    const date = new Date(dateF); // Convertir la cadena a un objeto Date

    const optionsTime = {
        hour: 'numeric', // Hora en formato numérico (ejemplo: "02")
        minute: 'numeric', // Minutos en formato numérico (ejemplo: "54")
    }

    const formattedTime = date.toLocaleTimeString('es-CL', optionsTime);
    
    return formattedTime;
}

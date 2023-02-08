export const formatDate = (date: string) => {
    const month = ["January", "February", "March", "April", "Mei", "June", "July", "August", "September", "October", "November", "December"]
    const newDate = new Date(date)
    return `${month[newDate.getMonth()+1]} ${newDate.getDate()}, ${newDate.getFullYear()}`
}
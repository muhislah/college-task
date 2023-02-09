import { IData, IFilter } from "../pages/_dashboard/Dashboard"

export const formatDate = (date: string) => {
    const month = ["January", "February", "March", "April", "Mei", "June", "July", "August", "September", "October", "November", "December"]
    const newDate = new Date(date)
    return `${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
}

export const generateDataAfterFilter = (data: IData[], filter: IFilter) => {
    let newData = [...data]
    if (data && data.length) {

        /* search method */
        let search = filter.search
        filter.hideArchive = true
        if (filter.search) {
            /* Advanced Filter */
            if (filter.search.toLowerCase().includes('is:archived')) {
                filter.hideArchive = false
                newData = newData.filter(data => data.archived)
                search = search.replace('is:archived', '')
            }

            if (filter.search.toLowerCase().includes('not:archived')) {
                newData = newData.filter(data => !data.archived)
                search = search.replace('not:archived', '')
            }

            if (filter.search.toLowerCase().includes('is:educational')) {
                newData = newData.filter(data => data.type.includes('educational'))
                search = search.replace('is:educational', '')
            }

            if (filter.search.toLowerCase().includes('is:testimonial')) {
                newData = newData.filter(data => data.type.includes('testimonial'))
                search = search.replace('is:testimonial', '')
            }

            if (filter.search.toLowerCase().includes('is:training')) {
                newData = newData.filter(data => data.type.includes('training'))
                search = search.replace('is:training', '')
            }

            if (filter.search.toLowerCase().includes('is:recreational')) {
                newData = newData.filter(data => data.type.includes('recreational'))
                search = search.replace('is:recreational', '')
            }

            if (filter.search.toLowerCase().includes('not:educational')) {
                newData = newData.filter(data => !data.type.includes('educational'))
                search = search.replace('not:educational', '')
            }

            if (filter.search.toLowerCase().includes('not:testimonial')) {
                newData = newData.filter(data => !data.type.includes('testimonial'))
                search = search.replace('not:testimonial', '')
            }

            if (filter.search.toLowerCase().includes('not:training')) {
                newData = newData.filter(data => !data.type.includes('training'))
                search = search.replace('not:training', '')
            }

            if (filter.search.toLowerCase().includes('not:recreational')) {
                newData = newData.filter(data => !data.type.includes('recreational'))
                search = search.replace('not:recreational', '')
            }

            if (filter.search.toLowerCase().includes('not:recreational')) {
                newData = newData.filter(data => !data.type.includes('recreational'))
                search = search.replace('not:recreational', '')
            }

            if (filter.search.toLowerCase().includes('is:editing')) {
                newData = newData.filter(data => data.status.toLowerCase().includes('editing'))
                search = search.replace('is:editing', '')
            }

            if (filter.search.toLowerCase().includes('is:complete')) {
                newData = newData.filter(data => data.status.toLowerCase().includes('complete'))
                search = search.replace('is:complete', '')
            }

            if (filter.search.toLowerCase().includes('is:incomplete')) {
                newData = newData.filter(data => data.status.toLowerCase().includes('incomplete'))
                search = search.replace('is:incomplete', '')
            }
            if (filter.search.toLowerCase().includes('is:feedback')) {
                newData = newData.filter(data => data.status.toLowerCase().includes('feedback'))
                search = search.replace('is:feedback', '')
            }

            if (filter.search.toLowerCase().includes('not:editing')) {
                newData = newData.filter(data => !data.status.toLowerCase().includes('editing'))
                search = search.replace('not:editing', '')
            }

            if (filter.search.toLowerCase().includes('not:complete')) {
                newData = newData.filter(data => !data.status.toLowerCase().includes('complete'))
                search = search.replace('not:complete', '')
            }

            if (filter.search.toLowerCase().includes('not:incomplete')) {
                newData = newData.filter(data => !data.status.toLowerCase().includes('incomplete'))
                search = search.replace('not:incomplete', '')
            }
            if (filter.search.toLowerCase().includes('not:feedback')) {
                newData = newData.filter(data => !data.status.toLowerCase().includes('feedback'))
                search = search.replace('not:feedback', '')
            }

            if (filter.search.toLowerCase().split(' ').some(text => text.includes('before:'))) {
                let arr = filter.search.toLowerCase().split(' ')
                let dateIndex = arr.findIndex(text => text.includes('before:'))
                let date = arr[dateIndex].replace('before:','')
                newData = newData.filter(data => new Date(data.createdOn) < new Date(date))
                search = arr.filter((_, index) => index !== dateIndex).join('')
            }

            if (filter.search.toLowerCase().split(' ').some(text => text.includes('after:'))) {
                let arr = filter.search.toLowerCase().split(' ')
                let dateIndex = arr.findIndex(text => text.includes('after:'))
                let date = arr[dateIndex].replace('after:','')
                newData = newData.filter(data => new Date(data.createdOn) > new Date(date))
                search = arr.filter((_, index) => index !== dateIndex).join('')
            }

            newData = newData.filter(data => data.name.toLowerCase().replaceAll(' ', '').includes(search.toLowerCase().replaceAll(' ', '')))

        }

        if (filter.hideArchive) {
            newData = newData.filter(data => !data.archived)
        }

        newData = newData.sort((a, b) => {
            if (filter.order === 'ascending') {
                return a[filter.orderBy as keyof IData] < b[filter.orderBy as keyof IData] ? -1 : 1
            } else {
                return b[filter.orderBy as keyof IData] > a[filter.orderBy as keyof IData] ? 1 : -1
            }
        })

        return newData
    } else {
        return []
    }
}
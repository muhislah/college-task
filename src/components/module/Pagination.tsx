import React, { useEffect, useState } from 'react'

export interface IPagination {
    data: any,
    limitPerPage: number
    currentPage: number
    onChange: (pagination: any) => void
}

const Pagination = (props: IPagination) => {
    const [page, setPage] = useState({
        currentPage: props.currentPage || 1,
        limitPerPage: props.limitPerPage || 10,
        totalPage: props.data && props.data.length ? Math.ceil(props.data.length / props.limitPerPage) : 1
    })

    const generatePageNumber = (total: number) => {
        let list;
        list = Array.from(Array(total).keys()).map((_, number) => {
            return (
                <button
                    key={number}
                    className={`${page.currentPage === number + 1 ? 'rounded-full' : 'rounded-xl'} transition duration-200 ease-in-out bg-opacity-75 h-10 w-10 border border-[#ababab] bg-white `}
                    onClick={() => setPage({ ...page, currentPage: number + 1 })}
                >
                    {number + 1}
                </button>
            )
        })
        return list
    }

    useEffect(() => {
        setPage({
            currentPage: props.currentPage || 1,
            limitPerPage: props.limitPerPage || 10,
            totalPage: props.data && props.data.length ? Math.ceil(props.data.length / props.limitPerPage) : 1
        })
        // eslint-disable-next-line
    }, [props.data.length])

    useEffect(() => {
        props.onChange(page)
        // eslint-disable-next-line
    }, [page.currentPage])

    return (
        <div className='flex flex-row gap-2'>
            {generatePageNumber(page.totalPage)}
        </div>
    )
}

export default Pagination
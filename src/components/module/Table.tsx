import React from 'react'
import { formatDate } from '../../utils/helpers'

interface IProps {
    data: any
    pagination: any
}

const Table = (props: IProps) => {
    return (
        <table className='table-auto border-spacing-y-2 border-separate w-full text-xs md:text-sm mt-5 space-x-1 space-y-1'>
            <thead>
                <tr className='bg-white bg-opacity-50 rounded-md h-10 shadow-sm divide-x'>
                    <th className=''>No</th>
                    <th className=''>Name</th>
                    <th className=''>Type</th>
                    <th className=''>Status</th>
                    <th className=''>Created</th>
                    <th className=''>Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data && props.data.length ?
                        props.data
                            .filter((_: any, idx: number) => idx > (props.pagination.currentPage - 1) * (props.pagination.limitPerPage))
                            .filter((_: any, idx: number) => idx < (props.pagination.currentPage * props.pagination.limitPerPage) - ((props.pagination.currentPage - 1 ) * 10))
                            .map((item: any, index: number) => (
                                    <tr key={item.id} className='bg-white bg-opacity-80 rounded-md h-10 shadow-sm divide-x'>
                                        <td className='text-center'>{(index + 1) + (( props.pagination.currentPage * props.pagination.limitPerPage) - 10)}.</td>
                                        <td className='px-3'>{item.name}</td>
                                        <td className='text-center'>{item.type}</td>
                                        <td className='text-center'>{item.status}</td>
                                        <td className='text-center'>{formatDate(item.createdOn)}</td>
                                        <td className='text-center'>{item.archived ? 'Archived' : 'Not Archived'}</td>
                                    </tr>
                                )) : null
                }
            </tbody>
        </table>
    )
}

export default Table
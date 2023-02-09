import React from 'react'
import { formatDate } from '../../utils/helpers'
import { DropDown } from './Dropdown'
import IconOption from '../icons/IconOption'
import IconFeedback from '../icons/IconFeedback'
import IconShoot from '../icons/IconShoot'
import IconCheck from '../icons/IconCheck'
import IconIncomplete from '../icons/IconIncomplete'
import IconEdit from '../icons/IconEdit'
import IconDelete from '../icons/IconDelete'

interface IProps {
    data: any
    pagination: any
}

interface IStatus {
    label: string,
    key: string,
    icon: any
    className: string
}

const statuses: IStatus[] = [
    { label: 'Waiting Feedback', key: 'feedback', icon: IconFeedback, className: 'border-gray-800 text-gray-800'},
    { label: 'Shooting Video', key: 'shooting', icon: IconShoot , className: 'border-red-800 text-red-800'},
    { label: 'Completed', key: 'completed', icon: IconCheck , className: 'border-green-800 text-green-800'},
    { label: 'Incomplete', key: 'incomplete', icon: IconIncomplete , className: 'border-orange-800 text-orange-800'},
    { label: 'Editing Video', key: 'editing', icon: IconEdit , className: 'border-blue-800 text-blue-800'},
]

const Table = (props: IProps) => {
    const generateStatus = (stats: string) => {
        let status = stats.toLowerCase()
        let components: IStatus
        components = statuses[0]
        let Icon: (props: any) => JSX.Element

        statuses.forEach(item => {
            if (item.key === status) {
                components = item
            }
        })

        Icon = components.icon

        return (
            <>
            <div className={`rounded-md m-auto min-w-[80%] border-2 ${components.className} px-3 py-1 flex justify-center gap-2 flex-row text-xs items-center`}>
                <Icon className="w-4 h-4"/>
                <span>
                    {components?.label}
                </span>
            </div>
            </>
        )
    }

    return (
        <table className='table-auto border-spacing-y-2 border-separate w-full text-xs md:text-sm mt-5 space-x-1 space-y-1'>
            <thead>
                <tr className='bg-white bg-opacity-50 rounded-md h-10 shadow-sm divide-x'>
                    <th className='w-[5%]'>No</th>
                    <th className='w-[25%]'>Name</th>
                    <th className='w-[15%]'>Type</th>
                    <th className=''>Status</th>
                    <th className=''>Created</th>
                    <th className=''>Archive</th>
                    <th className=''>Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data && props.data.length ?
                        props.data
                            .filter((_: any, idx: number) => {
                                let beforeFirstNumber = (props.pagination.currentPage * props.pagination.limitPerPage - 10 - 1)
                                return idx > beforeFirstNumber
                            })
                            .filter((_: any, idx: number) => {
                                let lastIndexNumber = (props.pagination.currentPage * props.pagination.limitPerPage - 1) - ((props.pagination.currentPage - 1) * props.pagination.limitPerPage)
                                return idx <= lastIndexNumber
                            })
                            .map((item: any, index: number) => (
                                <tr key={item.id} className='bg-white bg-opacity-80 rounded-md h-10 shadow-sm divide-x'>
                                    <td className='text-center'>{(index + 1) + ((props.pagination.currentPage * props.pagination.limitPerPage) - 10)}.</td>
                                    <td className='px-3'>{item.name}</td>
                                    <td className='text-center'>{item.type}</td>
                                    <td className='text-center flex h-10'>{generateStatus(item.status)}</td>
                                    <td className='text-center'>{formatDate(item.createdOn)}</td>
                                    <td className='text-center'>{item.archived ? 'Archived' : 'Not Archived'}</td>
                                    <td className='text-center'>
                                        <DropDown
                                            type='iconButton'
                                            label={<IconOption />}
                                            options={[
                                                { value: 'edit', label: 'Update', icon: <IconEdit className="w-4 h-4"/> },
                                                { value: 'delete', label: 'Delete', icon: <IconDelete className="w-4 h-4"/> },
                                            ]}
                                            onChange={(value) => console.log(value)}
                                        />
                                    </td>
                                </tr>
                            )) : null
                }
            </tbody>
        </table>
    )
}

export default Table
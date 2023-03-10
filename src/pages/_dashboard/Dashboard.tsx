import React, { Fragment, useState } from 'react'
import db from './../../constants/db.json'
import SearchBox from '../../components/module/SearchBox'
import { DropDown } from '../../components/module/Dropdown'
import Table from '../../components/module/Table'
import Pagination from '../../components/module/Pagination'
import { generateDataAfterFilter } from '../../utils/helpers'

export interface IData {
    [key: string]: any
    id: string
    name: string
    status: string
    type: string
    createdOn: string
    archived: boolean
}

export interface IFilter {
    orderBy: 'name' | 'status' | 'type' | string,
    order: string,
    search: string,
    hideArchive: boolean,
}

const initialFilter = {
    orderBy: 'name',
    order: 'ascending',
    search: '',
    hideArchive: true,
}

const Dashboard = () => {
    const [filter, setFilter] = useState<IFilter>(initialFilter)
    const [page, setPagination] = useState({
        currentPage: 1,
        limitPerPage: 10,
        totalPage: 0,
    })

    const handleSearch = (value: string) => {
        setFilter(prev => ({
            ...prev,
            search: value
        }))
    }

    return (
        <Fragment>
            <div className='mx-auto min-h-screen font-poppins w-full h-full bg-gradient-to-r from-teal-200 to-lime-200 pt-10 pb-10'>
                <div className='max-w-[1024px] mx-auto bg-white bg-opacity-50 rounded-2xl p-5'>
                    <div className='mt-5'>
                        <div className='font-bold text-2xl'>Hello, College</div>
                        <p className='text-base'>Here the list project you submitted.</p>
                    </div>
                    <div className='w-full mt-5 bg-white bg-opacity-50 rounded-xl p-5'>
                        <div className='font-semibold text-xl'>Recent Projects</div>

                        {/* Search Box */}
                        <div className='mt-5'>
                            <SearchBox
                                placeholder='Search you want here'
                                onChange={handleSearch}
                            />
                        </div>

                        {/* Sort Area */}
                        <div className='mt-5'>
                            <div className='flex flex-row gap-2'>
                                <DropDown
                                    label='Name'
                                    options={[
                                        { label: 'Name', value: 'name' },
                                        { label: 'Type', value: 'type' },
                                        { label: 'Status', value: 'status' },
                                        { label: 'Date', value: 'createdOn' },
                                    ]}
                                    onChange={(value: any) => setFilter(prev => ({ ...prev, orderBy: value.value }))}
                                />
                                <DropDown
                                    label='Ascending'
                                    options={[
                                        { label: 'Ascending', value: 'ascending' },
                                        { label: 'Descending', value: 'descending' },
                                    ]}
                                    onChange={(value) => setFilter(prev => ({ ...prev, order: value.value }))}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <Table
                            data={generateDataAfterFilter(db, filter)}
                            pagination={page}
                        />

                        {/* Pagination */}
                        <div>
                            <Pagination
                                data={generateDataAfterFilter(db, filter)}
                                currentPage={1}
                                limitPerPage={10}
                                onChange={(page) => setPagination(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
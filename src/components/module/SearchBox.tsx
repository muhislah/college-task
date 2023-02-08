import React from 'react'
import IconSearch from '../icons/IconSearch'

interface IProps {
    onChange: (value: string) => void
    placeholder?: string
}

const SearchBox = (props: IProps) => {

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className='w-full flex relative items-center'>
            <input
                className='w-full bg-white bg-opacity-50 rounded-md h-10 border border-[#ababab] px-3 text-sm outline-none'
                type='text'
                onChange={handleChangeValue}
                placeholder={props.placeholder || ''}
            />
            <IconSearch className="h-5 w-5 absolute right-3 text-[#ababab]"/>
        </div>
    )
}

export default SearchBox
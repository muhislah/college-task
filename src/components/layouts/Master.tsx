import React from 'react'

interface IProps {
    children: React.ReactNode
}

const Master = ({ children }: IProps) => {
    return (
        <div
            className=''
        >
            {
                children
            }
        </div>
    )
}

export default Master
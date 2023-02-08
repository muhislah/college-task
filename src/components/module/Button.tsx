import React from 'react'

interface IProps {
    variant: string,
    children: React.ReactNode
}

const Button = ({type, children, ...props}: IProps & React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
        className={`${props.className} `}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button
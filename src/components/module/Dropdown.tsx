import { Menu, Transition } from '@headlessui/react'
import IconArrowBottom from '../icons/IconArrowBottom'
import { useState } from 'react'

interface IProps {
    type?: string
    label: string | React.ReactNode,
    options: {
        value: any,
        label: string
    }[]
    onChange: (value: any) => void
}

export function DropDown(props: IProps) {
    const [label, setLabel] = useState("")

    const handleChangeOption = (option: any) => {
        setLabel(option.label)
        props.onChange(option)
    }

    return (
        <Menu>
            <div className='flex flex-col'>
                {
                    props.type === 'iconButton' ?
                        <Menu.Button
                            className="flex flex-col items-center"
                        >
                            {props.label}
                        </Menu.Button> :
                        <Menu.Button className="bg-white min-w-[100px] relative flex items-center gap-2 bg-opacity-50 rounded-md h-10 border border-[#ababab] px-3 pr-9">
                            <span>{label || props.label}</span>
                            <IconArrowBottom className="h-5 w-5 absolute right-2" />
                        </Menu.Button>
                }
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items >
                        <div className="absolute mt-2 backdrop-blur-md flex p-1 flex-col bg-white bg-opacity-50 rounded-md border border-[#ababab] items-center gap-2 w-[200px]">
                            {
                                props.options && props.options.length ?
                                    props.options.map((option, id) => (
                                        <Menu.Item key={option.value}>
                                            <button
                                                key={id}
                                                className='w-full bg-white text-center h-8 shadow-sm'
                                                onClick={() => handleChangeOption(option)}
                                            >
                                                {option.label}
                                            </button>
                                        </Menu.Item>
                                    )) : null
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}
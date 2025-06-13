import React, { useState, useEffect, useRef } from 'react';

const NumberStepper = ({
    name,
    onChange
}) => {
    const [value, setValue] = useState(1);
    const [showButtons, setShowButtons] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowButtons(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowButtons(false);
                inputRef.current?.focus();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    const handleIncrement = (e) => {
        e.stopPropagation();
        const newValue = value + 1;
        setValue(newValue);
        onChange({ target: { name, value: newValue } });
        inputRef.current?.focus();
    }

    const handleDecrement = (e) => {
        e.stopPropagation();
        const newValue = value > 1 ? value - 1 : 1;
        setValue(newValue);
        onChange({ target: { name, value: newValue } });
        inputRef.current?.focus();
    }

    const formatValue = (value) => {
        return value > 1 ? `${value} Passengers` : `${value} Passenger`;
    }

    return (
        <div ref={wrapperRef} className='relative w-full text-black'>
            <input
                ref={inputRef}
                type='text'
                name={name}
                value={formatValue(value)}
                onClick={() => setShowButtons(true)}
                onFocus={() => setShowButtons(true)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800'
                readOnly
            />

            {showButtons && (
                <div className='absolute top-full left-0 mt-1 w-full flex'>
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDecrement(e);
                        }}
                        className='flex-1 py-1 bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer text-lg rounded-l'
                    >
                        -
                    </button>
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleIncrement(e);
                        }}
                        className='flex-1 py-1 bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer text-lg rounded-r'
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    )
}

export default NumberStepper;

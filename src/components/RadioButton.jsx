import React from 'react';

const RadioButton = ({
    value,
    label,
    checked,
    onChange,
    disabled = false
}) => {
    return (
        <label className={`
            inline-flex items-center relative pl-7 select-none
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}>
            <input
                type='radio'
                value={value}
                checked={checked}
                onChange={() => !disabled && onChange(value)}
                disabled={disabled}
                className='absolute opacity-0 w-0 h-0'
            />
            <span className={`
                absolute left-0 top-0 h-5 w-5 rounded-full border-2
                ${checked ? 'border-blue-500' : 'border-gray-300'}
                ${!disabled && 'hover:border-gray-500'}
            `}>
            {checked && (
                <span className='
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    h-2 w-2 rounded-full bg-blue-500
                '/>
            )}
            </span>
            {label && <span className='flex items-center mr-5 -mt-0.5'>{label}</span>}
        </label>
    );
};

export default RadioButton;

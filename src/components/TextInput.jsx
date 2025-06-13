import React from 'react';
import { isEmpty } from '../utils/StringUtils';

const TextInput = ({
    label,
    type = 'text',
    name,
    placeholder = '',
    value,
    onChange,
    required = false,
    errorMessage = ''
}) => {

    const autocompleteProps = {}

    if (name === 'password')
        autocompleteProps.autoComplete = 'current-password'
    else if (name === 'email')
        autocompleteProps.autoComplete = 'email'

    const baseClasses = 'w-xl px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800'
    const isValid = isEmpty(errorMessage)

    return (
        <div className='flex flex-col mb-3' >
            <label htmlFor={name} className='text-sm text-left text-gray-800'>
                {label}
                {required && <span className='required'>*</span>}
            </label>
            <input className={!isValid ? `invalid ${baseClasses}` : `${baseClasses}`}
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                {...autocompleteProps}
            />
            {!isValid && (
                <div className='text-sm text-left text-red-600'>{errorMessage}
                </div>
            )}
        </div >
    );
};

export default TextInput;
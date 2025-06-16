import React from 'react';
import { useState, useRef, useEffect } from 'react';

const DropdownMenu = ({
  options,
  name,
  placeholder,
  required = false,
  onChange
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const handleSelect = (country) => {
    setSelectedOption(country.label)
    onChange && onChange({
      target: {
        name: name,
        value: country.value
      }
    })
    setIsOpen(false)
  }

  return (
    <div className='relative w-xl' ref={dropdownRef}>
      <input className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800'
        id={name}
        name={name}
        type='text'
        readOnly
        value={selectedOption}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        required={required}
      />
      {isOpen && (
        <div className='absolute w-full border border-gray-300 bg-white z-10 group-focus-within:block rounded-md'>
          {Object.entries(options).map(([continent, countries]) => (
            <div key={continent} className=''>
              <h3 className='m-0 px-3 py-2 text-base bg-gray-100 font-bold text-gray-800'>
                {continent.charAt(0).toUpperCase() + continent.slice(1)}
              </h3>
              <ul>
                {countries.map((country) => (
                  <li
                    className='px-5 py-2 text-gray-800 cursor-pointer hover:bg-gray-50'
                    key={country.value}
                    onClick={() => handleSelect(country)}>
                    {country.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>)}
    </div>
  );
};

export default DropdownMenu;

import React from 'react';

const Button = ({
  type='button',
  children,
  variant = 'primary',
  onClick,
  custumizedStyle = '',
}) => {
  const baseStyle = 'px-4 py-2 rounded font-medium focus:outline-none';
  const variantStyles = {
    primary: 'bg-[#0061D5] hover:bg-[#0095d5] text-white text-base font-bold px-4 py-2 rounded-lg transition-colors',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    naviTransparentB: 'bg-transparent text-black text-base font-bold border-none',
    naviTransparentW: 'bg-transparent text-white text-base font-bold border-none',
    navi: 'bg-gray-100 hover:bg-gray-200 text-black text-base font-bold border-none'
  };

  return (
    <div className='flex flex-col mb-3'>
      <button
        type={type}
        className={`${baseStyle} ${variantStyles[variant]} ${custumizedStyle}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Button

import React, { useState } from 'react';

const RadioGroup = ({
    children,
    defaultValue,
    gap,
    onChange
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleChange = (value) => {
        setSelectedValue(value);
        onChange?.(value);
    }

    return (
        <div className={`flex flex-row items-center text-base ${gap}`}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    checked: child.props.value === selectedValue,
                    onChange: handleChange
                });
            })}
        </div>
    )
}

export default RadioGroup;

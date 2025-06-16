import { useState, useRef, useEffect } from 'react';

const DatePicker = ({
    name,
    placeholder,
    onChange
}) => {
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const datePickerRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (!datePickerRef.current?.contains(e.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleDateClick = (date) => {
        if (isPastDate(date)) return;

        setSelectedDate(date);

        onChange && onChange({
            target: {
                name: name,
                value: date
            }
        });

        setShowCalendar(false);
    };

    const renderHeader = () => (
        <div className='flex justify-between items-center mb-2'>
            <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                className='text-gray-600 hover:text-gray-900'
            >
            </button>
            <span className='font-medium'>
                {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
            </span>
            <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                className='text-gray-600 hover:text-gray-900'
            >
            </button>
        </div>
    );

    const renderDays = () => {
        const days = [];
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className='h-8'></div>);
        }

        for (let d = 1; d <= lastDay.getDate(); d++) {
            const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            const isPast = isPastDate(day);

            days.push(
                <div
                    key={d}
                    className={`h-8 flex items-center justify-center rounded 
                        ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 cursor-pointer'}
                        ${isPast ? 'text-gray-400 cursor-not-allowed pointer-events-none' : 'hover:bg-gray-100 cursor-pointer'}`}
                    onClick={() => !isPast && handleDateClick(day)}
                >
                    {d}
                </div>
            );
        }

        return days;
    };

    return (
        <div className='relative w-xl text-black' ref={datePickerRef}>
            <input
                type='text'
                readOnly
                value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                placeholder={placeholder}
                onClick={() => setShowCalendar(!showCalendar)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800'
            />
            {showCalendar && (
                <div className='absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-3'>
                    {renderHeader()}
                    <div className='grid grid-cols-7 gap-1 text-center text-sm font-semibold mb-2'>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className='py-1'>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className='grid grid-cols-7 gap-1 text-sm'>
                        {renderDays()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;

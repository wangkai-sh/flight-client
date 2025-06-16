import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import DropdownMenu from '../components/DropdownMenu';
import NumberStepper from '../components/NumberStepper';
import RadioButton from '../components/RadioButton';
import RadioGroup from '../components/RadioGroup';
import { useFlightContext } from '../hooks/useFlightContext';
import { isEmpty } from '../utils/StringUtils';

const HomePage = () => {

  // 页面跳转
  const navigate = useNavigate()

  // 保存检查时发生的错误内容
  const [errors, setErrors] = useState({})

  // 航班信息检索结果
  const { fetchFlights } = useFlightContext()

  const options = {
    Asia: [
      { value: 'Tokyo', label: 'Tokyo' },
      { value: 'Manila', label: 'Manila' },
      { value: 'Bangkok', label: 'Bangkok' },
      { value: 'Seoul', label: 'Seoul' },
      { value: 'Istanbul', label: 'Istanbul' },
      { value: 'Singapore', label: 'Singapore' },
    ],
    Europe: [
      { value: 'London', label: 'London' },
      { value: 'Rome', label: 'Rome' },
      { value: 'Barcelona', label: 'Barcelona' },
      { value: 'Madrid', label: 'Madrid' },
      { value: 'Paris', label: 'Paris' },
    ]
  };

  // 保存航班搜索信息
  const [localForm, setLocalForm] = useState({
    tripType: '0',
    cabinClass: '0',
    departure: '',
    arrival: '',
    departDate: '',
    returnDate: '',
    passengers: '1'
  })

  const handleTripTypeChange = (e) => {
    setLocalForm(prev => ({ ...prev, ['tripType']: e }))
  }

  const handleCabinClassChange = (e) => {
    setLocalForm(prev => ({ ...prev, ['cabinClass']: e }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalForm(prev => ({ ...prev, [name]: value }))
  }

  // 检查航班搜索信息
  const validateForm = () => {
    const newErrors = {};

    // 出发城市不能为空
    if (isEmpty(localForm.departure))
      newErrors.city = 'Please provide departure city'
    // 到达城市不能为空
    else if (isEmpty(localForm.arrival))
      newErrors.city = 'Please provide arrival city'
    // 检查出发和到达城市是否一样
    else if (localForm.arrival === localForm.departure)
      newErrors.city = 'Please select different departure and arrival cities'

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    // 检查航班搜索信息
    if (validateForm()) {
      // 检索出发航班信息
      await fetchFlights('departure', localForm);

      // 选择 是往返
      if (localForm.tripType === '0') {
        await fetchFlights('return', localForm);
      }

      navigate('flights', {
        state: {
          tripType: localForm.tripType
        }
      })
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-gradient-to-r items-center justify-center'>
        <h1 className='text-white text-6xl mb-6 font-bold'>Book flights</h1>
        <p className='text-gray-400 mb-8'>Find the best fares for your next trip.</p>
      </div>
      <div className='flex flex-col md:p-[25px] bg-white rounded-2xl'>
        <form className='space-y-6' onSubmit={handleSearch}>
          <div className='pt-4 pr-4 text-black'>
            <RadioGroup
              defaultValue='0'
              onChange={handleTripTypeChange}
            >
              <RadioButton value='0' label='Round Trip' />
              <RadioButton value='1' label='One Way' />
            </RadioGroup>
          </div>
          <div className='pt-0.5 pr-4 text-black'>
            <RadioGroup
              defaultValue='0'
              gap='gap-3'
              onChange={handleCabinClassChange}
            >
              <RadioButton value='0' label='Economy' />
              <RadioButton value='1' label='Business' />
              <RadioButton value='2' label='First Class' />
            </RadioGroup>
          </div>
          <div className='pt-1 pr-105 flex items-center gap-[40px]'>
            <DropdownMenu
              options={options}
              name='departure'
              placeholder='Leaving from...'
              onChange={handleChange}
            />
            <DropdownMenu
              options={options}
              name='arrival'
              placeholder='Going to...'
              onChange={handleChange}
            />
          </div>
          {!isEmpty(errors.city) && (
            <div className='text-sm text-left text-red-600'>{errors.city}
            </div>
          )}
          <div className='pt-1 pb-1 pr-105 flex items-center gap-[40px]'>
            <DatePicker
              name='departDate'
              placeholder='Departure date...'
              onChange={handleChange}
            />
            <DatePicker
              name='returnDate'
              placeholder='Return date...'
              onChange={handleChange} />
          </div>
          <div className='pt-1 pb-1 pr-105 flex items-center'>
            <NumberStepper
              name='passengers'
              onChange={handleChange}
            />
          </div>
          <Button type='submit' custumizedStyle='max-w-xs'>Search flights</Button>
        </form>
      </div>
    </div>
  )
}

export default HomePage;

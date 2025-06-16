import React, { useState } from 'react';

const PassengerForm = () => {
  // 初始化乘客数组，默认1个空乘客
  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', email: '' }
  ]);

  // 处理单个乘客信息变更
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  // 添加新乘客
  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', email: '' }]);
  };

  // 移除乘客
  const removePassenger = (index) => {
    if (passengers.length <= 1) return; // 至少保留一个乘客
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('乘客信息:', passengers);
    alert(`已提交 ${passengers.length} 位乘客信息`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">乘客信息登记</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4">乘客 {index + 1}</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名
              </label>
              <input
                type="text"
                value={passenger.firstName}
                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入名字"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓
              </label>
              <input
                type="text"
                value={passenger.lastName}
                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入姓氏"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入邮箱"
              />
            </div>

            {passengers.length > 1 && (
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                移除乘客
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={addPassenger}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            + 添加乘客
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            提交信息
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;

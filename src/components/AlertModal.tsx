import { useState } from "react";

const AlertModal = () => {
  const [isOpen, setIsOpen] = useState('absolute');
  return (
    <div className={`z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ${isOpen}`}>
      <div className='bg-white p-5 rounded shadow-md'>
        <h2 className='text-lg font-bold mb-4'>Alert</h2>
        <p className='mb-4'>This is an alert message.</p>
        <button onClick={() => setIsOpen('hidden')} className='bg-blue-500 text-white px-4 py-2 rounded'>OK</button>
      </div>
    </div>
  )
}

export default AlertModal

import React, { useState } from 'react';
import { findOptimalRooms, calculateTotalTravelTime, MAX_ROOMS_PER_BOOKING } from '../utils/roomBooking';

const BookingInterface = ({ availableRooms, onBookRooms, selectedRooms, setSelectedRooms }) => {
  const [requestedRooms, setRequestedRooms] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleRoomCountChange = (e) => {
    const value = parseInt(e.target.value);
    setRequestedRooms(value);
    setError('');
    setSuccess('');
    setSelectedRooms([]);
  };
  
  const handleFindOptimalRooms = () => {
    if (requestedRooms < 1 || requestedRooms > MAX_ROOMS_PER_BOOKING) {
      setError(`Please enter a number between 1 and ${MAX_ROOMS_PER_BOOKING}`);
      return;
    }
    
    if (requestedRooms > availableRooms.length) {
      setError(`Only ${availableRooms.length} rooms are available. Cannot book ${requestedRooms} rooms.`);
      return;
    }
    
    const optimalRooms = findOptimalRooms(availableRooms, requestedRooms);
    
    if (optimalRooms) {
      setSelectedRooms(optimalRooms);
      setError('');
      setSuccess(`Found optimal room combination: ${optimalRooms.join(', ')}`);
    } else {
      setError('Unable to find optimal room combination');
      setSelectedRooms([]);
    }
  };
  
  const handleBookRooms = () => {
    if (selectedRooms.length === 0) {
      setError('Please find optimal rooms first');
      return;
    }
    
    onBookRooms(selectedRooms);
    setSelectedRooms([]);
    setSuccess('Rooms booked successfully!');
    setRequestedRooms(1);
  };
  
  const travelTime = selectedRooms.length > 0 ? calculateTotalTravelTime(selectedRooms) : 0;
  
  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 p-8 rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m2 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-800 bg-clip-text text-transparent">
          Room Booking Interface
        </h3>
      </div>
      
      <div className="space-y-6 flex justify-between gap-8">
        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Room Count Input */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white/30">
            <label htmlFor="roomCount" className="block text-sm font-semibold text-gray-700 mb-3">
              Number of Rooms to Book
              <span className="ml-2 text-xs text-gray-500 font-normal">
                (1-{MAX_ROOMS_PER_BOOKING})
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="roomCount"
                min="1"
                max={MAX_ROOMS_PER_BOOKING}
                value={requestedRooms}
                onChange={handleRoomCountChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 text-lg font-medium transition-all duration-300"
                placeholder="Enter number of rooms"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Selected Rooms Display */}
          {selectedRooms.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <h4 className="font-semibold text-blue-800 text-lg">Selected Rooms</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/60 p-4 rounded-xl">
                  <p className="text-sm font-medium text-blue-700 mb-2">Room Numbers</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRooms.map(room => (
                      <span key={room} className="px-3 py-1 bg-blue-500 text-white text-sm font-mono rounded-lg">
                        {room}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/60 p-4 rounded-xl">
                  <p className="text-sm font-medium text-blue-700 mb-2">Travel Information</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Total Travel Time:</span>
                      <span className="font-bold text-blue-800">{travelTime} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Available Rooms:</span>
                      <span className="font-bold text-blue-800">{availableRooms.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleFindOptimalRooms}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg font-semibold text-lg flex items-center justify-center space-x-3 cursor-pointer"
              style={{ cursor: 'pointer' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Find Optimal Rooms</span>
            </button>
            
            <button
              onClick={handleBookRooms}
              disabled={selectedRooms.length === 0}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-2xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg font-semibold text-lg flex items-center justify-center space-x-3 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed cursor-pointer"
              style={{ cursor: selectedRooms.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Book Selected Rooms</span>
            </button>
          </div>
          
          {/* Enhanced Status Messages */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-2xl border border-red-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-2xl border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-green-800">
                  <p className="font-medium">Success!</p>
                  <p className="text-sm">{success}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;

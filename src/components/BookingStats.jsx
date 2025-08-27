import React from 'react';
import { calculateTotalTravelTime, getFloorFromRoom } from '../utils/roomBooking';

const BookingStats = ({ occupiedRooms, bookedRooms, selectedRooms, totalRooms }) => {
  const availableRooms = totalRooms - occupiedRooms.length - bookedRooms.length;
  
  // Group rooms by floor for statistics
  const getRoomsByFloor = (rooms) => {
    const roomsByFloor = {};
    rooms.forEach(room => {
      const floor = getFloorFromRoom(room);
      if (!roomsByFloor[floor]) {
        roomsByFloor[floor] = [];
      }
      roomsByFloor[floor].push(room);
    });
    return roomsByFloor;
  };
  
  const occupiedByFloor = getRoomsByFloor(occupiedRooms);
  const bookedByFloor = getRoomsByFloor(bookedRooms);
  
  const renderFloorStats = (floorNumber) => {
    const occupiedCount = occupiedByFloor[floorNumber]?.length || 0;
    const bookedCount = bookedByFloor[floorNumber]?.length || 0;
    const totalFloorRooms = floorNumber === 10 ? 7 : 10;
    const availableCount = totalFloorRooms - occupiedCount - bookedCount;
    
    return (
      <div key={floorNumber} className="bg-white/60 p-4 rounded-xl border border-white/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F{floorNumber}</span>
            </div>
            <span className="font-semibold text-gray-700">Floor {floorNumber}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{totalFloorRooms}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <div className="text-green-600 font-bold">{availableCount}</div>
            <div className="text-green-500 text-xs">Available</div>
          </div>
          <div className="text-center">
            <div className="text-red-600 font-bold">{occupiedCount}</div>
            <div className="text-red-500 text-xs">Occupied</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-bold">{bookedCount}</div>
            <div className="text-blue-500 text-xs">Booked</div>
          </div>
        </div>
        
        {/* Progress bar for floor occupancy */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((occupiedCount + bookedCount) / totalFloorRooms) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  const selectedTravelTime = selectedRooms.length > 0 ? calculateTotalTravelTime(selectedRooms) : 0;
  
  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 p-8 rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
          Booking Statistics
        </h3>
      </div>
      
      <div className="space-y-6 flex justify-between gap-8">
        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Overall Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Rooms</p>
                  <p className="text-3xl font-bold">{totalRooms}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Available Rooms</p>
                  <p className="text-3xl font-bold">{availableRooms}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Selected Rooms Info */}
          {selectedRooms.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-yellow-800 text-lg">Currently Selected</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/60 p-3 rounded-xl">
                  <p className="text-xs font-medium text-yellow-700 mb-1">Rooms</p>
                  <p className="text-lg font-bold text-yellow-800">{selectedRooms.join(', ')}</p>
                </div>
                <div className="bg-white/60 p-3 rounded-xl">
                  <p className="text-xs font-medium text-yellow-700 mb-1">Travel Time</p>
                  <p className="text-lg font-bold text-yellow-800">{selectedTravelTime} min</p>
                </div>
                <div className="bg-white/60 p-3 rounded-xl">
                  <p className="text-xs font-medium text-yellow-700 mb-1">Floors</p>
                  <p className="text-lg font-bold text-yellow-800">{[...new Set(selectedRooms.map(getFloorFromRoom))].join(', ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Floor-wise Breakdown */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h4 className="font-semibold text-gray-700 text-lg">Floor-wise Breakdown</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
              {Array.from({ length: 10 }, (_, i) => renderFloorStats(10 - i))}
            </div>
          </div>
          
          {/* Enhanced Travel Time Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-indigo-800 text-lg">Travel Time Rules</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-indigo-700">Horizontal travel: 1 minute per room</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-indigo-700">Vertical travel: 2 minutes per floor</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-indigo-700">Stairs/Lift are located on the left side</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-indigo-700">Includes movement to stairs/lift</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStats;

import React from 'react';

const BuildingVisualization = ({ occupiedRooms, bookedRooms, selectedRooms }) => {
  const renderFloor = (floorNumber) => {
    const isTopFloor = floorNumber === 10;
    const roomCount = isTopFloor ? 7 : 10;
    const rooms = [];
    
    for (let i = 0; i < roomCount; i++) {
      const roomNumber = isTopFloor ? 1000 + i + 1 : floorNumber * 100 + i + 1;
      const isOccupied = occupiedRooms.includes(roomNumber);
      const isBooked = bookedRooms.includes(roomNumber);
      const isSelected = selectedRooms.includes(roomNumber);
      
      let roomClass = "w-10 h-10 border-2 border-gray-300 text-xs flex items-center justify-center font-mono font-bold";
      
      if (isSelected) {
        roomClass += " bg-gradient-to-br from-green-500 to-green-600 text-white border-green-600 shadow-lg";
      } else if (isBooked) {
        roomClass += " bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 shadow-md";
      } else if (isOccupied) {
        roomClass += " bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600 shadow-md";
      } else {
        roomClass += " bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:border-gray-400";
      }
      
      rooms.push(
        <div
          key={roomNumber}
          className={roomClass}
          title={`Room ${roomNumber} - ${isOccupied ? 'Occupied' : isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'}`}
        >
          {roomNumber}
        </div>
      );
    }
    
    return (
      <div key={floorNumber} className="flex items-center space-x-3 mb-3 p-2 rounded-xl">
        {/* Enhanced Floor Indicator */}
        <div className="w-16 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg border border-gray-500">
          <span className="text-white font-bold text-sm">F{floorNumber}</span>
        </div>
        
        {/* Enhanced Stairs/Lift Indicator */}
        <div className="w-6 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-md border border-yellow-600">
          <span className="text-yellow-900 font-bold text-xs">S</span>
        </div>
        
        {/* Enhanced Room Layout */}
        <div className="flex space-x-1 bg-white/20 p-2 rounded-xl backdrop-blur-sm">
          {rooms}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-slate-100 p-8 rounded-3xl shadow-xl border border-white/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-indigo-800 bg-clip-text text-transparent">
          Hotel Building Visualization
        </h3>
      </div>
      
      <div className="space-y-6 flex justify-between gap-8">
        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Legend */}
          <div className="p-4 bg-white/60 rounded-2xl border border-white/30">
            <h4 className="font-semibold text-gray-700 mb-3 text-center">Room Status Legend</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg"></div>
                <span className="text-sm text-gray-600 font-medium">Available</span>
              </div>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-600 rounded-lg"></div>
                <span className="text-sm text-gray-600 font-medium">Occupied</span>
              </div>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-600 rounded-lg"></div>
                <span className="text-sm text-gray-600 font-medium">Booked</span>
              </div>
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 border-2 border-green-600 rounded-lg"></div>
                <span className="text-sm text-gray-600 font-medium">Selected</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Footer Information */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full border border-white/30">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">
                S = Stairs/Lift | Rooms are numbered from left to right
              </span>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p>• Building has 10 floors with 97 total rooms</p>
              <p>• Floors 1-9: 10 rooms each | Floor 10: 7 rooms</p>
              <p>• Interactive visualization with real-time updates</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5 w-[50%]'>
          {/* Enhanced Building Layout */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50">
            <div className="flex flex-col-reverse">
              {Array.from({ length: 10 }, (_, i) => renderFloor(10 - i))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingVisualization;

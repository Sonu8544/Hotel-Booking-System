import React, { useState, useEffect } from 'react';
import "./App.css";
import BuildingVisualization from './components/BuildingVisualization';
import BookingInterface from './components/BookingInterface';
import ControlPanel from './components/ControlPanel';
import BookingStats from './components/BookingStats';
import { generateAllRooms, generateRandomOccupancy } from './utils/roomBooking';

function App() {
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalRooms] = useState(97); // 97 total rooms as per requirements
  
  // Get available rooms (not occupied and not booked)
  const availableRooms = generateAllRooms().filter(
    room => !occupiedRooms.includes(room) && !bookedRooms.includes(room)
  );
  
  // Handle booking rooms
  const handleBookRooms = (roomsToBook) => {
    setBookedRooms(prev => [...prev, ...roomsToBook]);
    setSelectedRooms([]);
  };
  
  // Generate random occupancy
  const handleGenerateRandomOccupancy = () => {
    const randomOccupied = generateRandomOccupancy(0.3); // 30% occupancy
    setOccupiedRooms(randomOccupied);
    setBookedRooms([]); // Clear any existing bookings
    setSelectedRooms([]); // Clear any selected rooms
  };
  
  // Reset all rooms
  const handleResetAll = () => {
    setOccupiedRooms([]);
    setBookedRooms([]);
    setSelectedRooms([]);
  };
  
  // Initialize with some random occupancy on component mount
  useEffect(() => {
    handleGenerateRandomOccupancy();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header with Enhanced Design */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Hotel Room Reservation System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience intelligent room booking with advanced travel time optimization algorithms
          </p>
          
          {/* Status Indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{availableRooms.length} Rooms Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI-Powered Selection</span>
            </div>
          </div>
        </div>
        
        {/* Main Grid Layout with Enhanced Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-all duration-300">
              <ControlPanel
                onGenerateRandomOccupancy={handleGenerateRandomOccupancy}
                onResetAll={handleResetAll}
                occupiedRooms={occupiedRooms}
                bookedRooms={bookedRooms}
                totalRooms={totalRooms}
              />
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300">
              <BookingInterface
                availableRooms={availableRooms}
                onBookRooms={handleBookRooms}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms}
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-all duration-300">
              <BookingStats
                occupiedRooms={occupiedRooms}
                bookedRooms={bookedRooms}
                selectedRooms={selectedRooms}
                totalRooms={totalRooms}
              />
            </div>
          </div>
        </div>
        
        {/* Building Visualization - Full Width with Enhanced Container */}
        <div className="mb-12">
          <div className="transform hover:scale-105 transition-all duration-300">
            <BuildingVisualization
              occupiedRooms={occupiedRooms}
              bookedRooms={bookedRooms}
              selectedRooms={selectedRooms}
            />
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <div className="text-center py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm rounded-2xl">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Fast & Responsive</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">AI-Optimized</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm">Secure & Reliable</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">
            Hotel Room Reservation System - Optimized for minimal travel time between rooms
          </p>
          <p className="text-gray-500 text-xs">
            97 rooms across 10 floors with intelligent booking algorithms • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

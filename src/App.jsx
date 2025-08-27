import React from 'react';
import "./App.css";
import BuildingVisualization from './components/BuildingVisualization';
import BookingInterface from './components/BookingInterface';
import ControlPanel from './components/ControlPanel';
import BookingStats from './components/BookingStats';
import ErrorBoundary from './components/ErrorBoundary';
import { useHotelState } from './hooks/useHotelState';

function App() {
  const {
    // State
    occupiedRooms,
    bookedRooms,
    selectedRooms,
    isLoading,
    error,
    totalRooms,
    
    // Computed values
    availableRooms,
    
    // Actions
    setSelectedRooms,
    handleBookRooms,
    handleGenerateRandomOccupancy,
    handleResetAll,
    clearError,
  } = useHotelState();
  
  return (
    <ErrorBoundary>
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
              <span className="text-sm text-gray-600">{availableRooms?.length || 0} Rooms Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI-Powered Selection</span>
            </div>
          </div>
        </div>
        
        {/* Main Grid Layout with Enhanced Cards */}
        <div className="space-y-8 mb-12">
          {/* Top Row - Control Panel and Booking Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ControlPanel
                onGenerateRandomOccupancy={handleGenerateRandomOccupancy}
                onResetAll={handleResetAll}
                occupiedRooms={occupiedRooms}
                bookedRooms={bookedRooms}
                totalRooms={totalRooms}
                isLoading={isLoading}
                error={error}
                onClearError={clearError}
              />
            </div>
            
            <div>
              <BookingInterface
                availableRooms={availableRooms}
                onBookRooms={handleBookRooms}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms}
              />
            </div>
          </div>
          
          {/* Middle Row - Booking Stats */}
          <div>
            <BookingStats
              occupiedRooms={occupiedRooms}
              bookedRooms={bookedRooms}
              selectedRooms={selectedRooms}
              totalRooms={totalRooms}
            />
          </div>
        </div>
        
        {/* Building Visualization - Full Width with Enhanced Container */}
        <div className="mb-12">
          <div>
            <BuildingVisualization
              occupiedRooms={occupiedRooms}
              bookedRooms={bookedRooms}
              selectedRooms={selectedRooms}
            />
          </div>
        </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

import { useState, useEffect, useCallback } from 'react';
import { generateAllRooms, generateRandomOccupancy } from '../utils/roomBooking';

/**
 * Custom hook for managing hotel room state
 * Provides centralized state management for occupied, booked, and selected rooms
 */
export const useHotelState = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Constants
  const TOTAL_ROOMS = 97;

  // Memoized available rooms calculation
  const availableRooms = useCallback(() => {
    try {
      const allRooms = generateAllRooms();
      return allRooms?.filter(
        room => !occupiedRooms?.includes(room) && !bookedRooms?.includes(room)
      ) || [];
    } catch (err) {
      console.error('Error calculating available rooms:', err);
      setError('Failed to calculate available rooms');
      return [];
    }
  }, [occupiedRooms, bookedRooms]);

  // Handle booking rooms with error handling
  const handleBookRooms = useCallback((roomsToBook) => {
    try {
      if (!Array.isArray(roomsToBook) || roomsToBook.length === 0) {
        throw new Error('Invalid rooms to book');
      }

      setBookedRooms(prev => [...(prev || []), ...roomsToBook]);
      setSelectedRooms([]);
      setError(null);
    } catch (err) {
      console.error('Error booking rooms:', err);
      setError(err?.message || 'Failed to book rooms');
    }
  }, []);

  // Generate random occupancy with error handling
  const handleGenerateRandomOccupancy = useCallback(async (occupancyPercentage = 0.3) => {
    try {
      setIsLoading(true);
      setError(null);

      if (occupancyPercentage < 0 || occupancyPercentage > 1) {
        throw new Error('Occupancy percentage must be between 0 and 1');
      }

      const randomOccupied = generateRandomOccupancy(occupancyPercentage);
      
      if (!Array.isArray(randomOccupied)) {
        throw new Error('Failed to generate random occupancy');
      }

      setOccupiedRooms(randomOccupied);
      setBookedRooms([]);
      setSelectedRooms([]);
    } catch (err) {
      console.error('Error generating random occupancy:', err);
      setError(err?.message || 'Failed to generate random occupancy');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset all rooms with error handling
  const handleResetAll = useCallback(() => {
    try {
      setOccupiedRooms([]);
      setBookedRooms([]);
      setSelectedRooms([]);
      setError(null);
    } catch (err) {
      console.error('Error resetting rooms:', err);
      setError(err?.message || 'Failed to reset rooms');
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize with random occupancy on mount
  useEffect(() => {
    handleGenerateRandomOccupancy();
  }, [handleGenerateRandomOccupancy]);

  return {
    // State
    occupiedRooms,
    bookedRooms,
    selectedRooms,
    isLoading,
    error,
    totalRooms: TOTAL_ROOMS,
    
    // Computed values
    availableRooms: availableRooms(),
    
    // Actions
    setSelectedRooms,
    handleBookRooms,
    handleGenerateRandomOccupancy,
    handleResetAll,
    clearError,
  };
};

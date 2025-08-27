import { useState, useCallback } from 'react';
import { findOptimalRooms, calculateTotalTravelTime, MAX_ROOMS_PER_BOOKING } from '../utils/roomBooking';

/**
 * Custom hook for room booking operations
 * Handles room selection, validation, and booking logic
 */
export const useRoomBooking = (availableRooms = []) => {
  const [requestedRooms, setRequestedRooms] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validate room count input
  const validateRoomCount = useCallback((count) => {
    if (!Number.isInteger(count) || count < 1) {
      return 'Please enter a valid number of rooms (minimum 1)';
    }
    
    if (count > MAX_ROOMS_PER_BOOKING) {
      return `Maximum ${MAX_ROOMS_PER_BOOKING} rooms can be booked at once`;
    }
    
    if (count > availableRooms?.length) {
      return `Only ${availableRooms?.length || 0} rooms are available. Cannot book ${count} rooms.`;
    }
    
    return null;
  }, [availableRooms?.length]);

  // Handle room count change with validation
  const handleRoomCountChange = useCallback((e) => {
    try {
      const value = parseInt(e?.target?.value, 10);
      
      if (isNaN(value)) {
        setError('Please enter a valid number');
        return;
      }

      const validationError = validateRoomCount(value);
      if (validationError) {
        setError(validationError);
        setRequestedRooms(1);
      } else {
        setRequestedRooms(value);
        setError('');
      }
      
      setSuccess('');
      setSelectedRooms([]);
    } catch (err) {
      console.error('Error handling room count change:', err);
      setError('Invalid input');
    }
  }, [validateRoomCount]);

  // Find optimal rooms with error handling
  const handleFindOptimalRooms = useCallback(() => {
    try {
      setError('');
      setSuccess('');

      const validationError = validateRoomCount(requestedRooms);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (!Array.isArray(availableRooms) || availableRooms.length === 0) {
        setError('No rooms available for booking');
        return;
      }

      const optimalRooms = findOptimalRooms(availableRooms, requestedRooms);
      
      if (!optimalRooms || !Array.isArray(optimalRooms)) {
        setError('Unable to find optimal room combination');
        setSelectedRooms([]);
        return;
      }

      setSelectedRooms(optimalRooms);
      setSuccess(`Found optimal room combination: ${optimalRooms.join(', ')}`);
    } catch (err) {
      console.error('Error finding optimal rooms:', err);
      setError(err?.message || 'Failed to find optimal rooms');
      setSelectedRooms([]);
    }
  }, [requestedRooms, availableRooms, validateRoomCount]);

  // Calculate travel time for selected rooms
  const travelTime = useCallback(() => {
    try {
      if (!Array.isArray(selectedRooms) || selectedRooms.length === 0) {
        return 0;
      }
      return calculateTotalTravelTime(selectedRooms);
    } catch (err) {
      console.error('Error calculating travel time:', err);
      return 0;
    }
  }, [selectedRooms]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  // Reset booking state
  const resetBooking = useCallback(() => {
    setRequestedRooms(1);
    setSelectedRooms([]);
    setError('');
    setSuccess('');
  }, []);

  return {
    // State
    requestedRooms,
    selectedRooms,
    error,
    success,
    travelTime: travelTime(),
    
    // Actions
    setSelectedRooms,
    handleRoomCountChange,
    handleFindOptimalRooms,
    clearMessages,
    resetBooking,
  };
};

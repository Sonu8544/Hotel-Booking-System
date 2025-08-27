// Room structure constants
export const FLOORS = 10;
export const ROOMS_PER_FLOOR = 10;
export const TOP_FLOOR_ROOMS = 7;
export const MAX_ROOMS_PER_BOOKING = 5;

// Travel time constants
export const HORIZONTAL_TRAVEL_TIME = 1; // minutes per room
export const VERTICAL_TRAVEL_TIME = 2; // minutes per floor

// Generate all room numbers with error handling
export const generateAllRooms = () => {
  try {
    const rooms = [];
    
    // Floors 1-9: 10 rooms each (101-110, 201-210, etc.)
    for (let floor = 1; floor <= 9; floor++) {
      for (let room = 1; room <= 10; room++) {
        const roomNumber = floor * 100 + room;
        if (roomNumber && !isNaN(roomNumber)) {
          rooms.push(roomNumber);
        }
      }
    }
    
    // Floor 10: 7 rooms (1001-1007)
    for (let room = 1; room <= 7; room++) {
      const roomNumber = 1000 + room;
      if (roomNumber && !isNaN(roomNumber)) {
        rooms.push(roomNumber);
      }
    }
    
    return rooms;
  } catch (error) {
    console.error('Error generating rooms:', error);
    return [];
  }
};

// Get floor number from room number with error handling
export const getFloorFromRoom = (roomNumber) => {
  try {
    if (!roomNumber || isNaN(roomNumber)) {
      console.warn('Invalid room number:', roomNumber);
      return 1; // Default to floor 1
    }
    
    if (roomNumber >= 1000) return 10;
    return Math.floor(roomNumber / 100);
  } catch (error) {
    console.error('Error getting floor from room:', error);
    return 1;
  }
};

// Get room position on floor (0-9 for floors 1-9, 0-6 for floor 10) with error handling
export const getRoomPositionOnFloor = (roomNumber) => {
  try {
    if (!roomNumber || isNaN(roomNumber)) {
      console.warn('Invalid room number:', roomNumber);
      return 0; // Default to position 0
    }
    
    if (roomNumber >= 1000) return roomNumber - 1001;
    return (roomNumber % 100) - 1;
  } catch (error) {
    console.error('Error getting room position:', error);
    return 0;
  }
};

// Calculate horizontal travel time between two rooms on the same floor with error handling
export const calculateHorizontalTravelTime = (room1, room2) => {
  try {
    if (!room1 || !room2 || isNaN(room1) || isNaN(room2)) {
      console.warn('Invalid room numbers for horizontal travel calculation:', room1, room2);
      return 0;
    }
    
    const floor1 = getFloorFromRoom(room1);
    const floor2 = getFloorFromRoom(room2);
    
    if (floor1 !== floor2) return 0;
    
    const pos1 = getRoomPositionOnFloor(room1);
    const pos2 = getRoomPositionOnFloor(room2);
    
    return Math.abs(pos1 - pos2) * HORIZONTAL_TRAVEL_TIME;
  } catch (error) {
    console.error('Error calculating horizontal travel time:', error);
    return 0;
  }
};

// Calculate vertical travel time between floors with error handling
export const calculateVerticalTravelTime = (floor1, floor2) => {
  try {
    if (!floor1 || !floor2 || isNaN(floor1) || isNaN(floor2)) {
      console.warn('Invalid floor numbers for vertical travel calculation:', floor1, floor2);
      return 0;
    }
    
    return Math.abs(floor1 - floor2) * VERTICAL_TRAVEL_TIME;
  } catch (error) {
    console.error('Error calculating vertical travel time:', error);
    return 0;
  }
};

// Calculate total travel time for a set of rooms with error handling
export const calculateTotalTravelTime = (rooms) => {
  try {
    if (!Array.isArray(rooms) || rooms.length <= 1) return 0;
    
    let totalTime = 0;
    
    // Sort rooms by floor and then by position on floor
    const sortedRooms = [...rooms].sort((a, b) => {
      const floorA = getFloorFromRoom(a);
      const floorB = getFloorFromRoom(b);
      
      if (floorA !== floorB) {
        return floorA - floorB;
      }
      
      return getRoomPositionOnFloor(a) - getRoomPositionOnFloor(b);
    });
    
    // Calculate travel time between consecutive rooms
    for (let i = 0; i < sortedRooms.length - 1; i++) {
      const currentRoom = sortedRooms[i];
      const nextRoom = sortedRooms[i + 1];
      
      if (!currentRoom || !nextRoom) continue;
      
      const currentFloor = getFloorFromRoom(currentRoom);
      const nextFloor = getFloorFromRoom(nextRoom);
      
      if (currentFloor === nextFloor) {
        // Same floor: horizontal travel
        totalTime += calculateHorizontalTravelTime(currentRoom, nextRoom);
      } else {
        // Different floors: vertical + horizontal travel
        totalTime += calculateVerticalTravelTime(currentFloor, nextFloor);
        
        // Add horizontal travel from current room to stairs/lift
        const currentPos = getRoomPositionOnFloor(currentRoom);
        totalTime += (currentPos || 0) * HORIZONTAL_TRAVEL_TIME;
        
        // Add horizontal travel from stairs/lift to next room
        const nextPos = getRoomPositionOnFloor(nextRoom);
        totalTime += (nextPos || 0) * HORIZONTAL_TRAVEL_TIME;
      }
    }
    
    return totalTime;
  } catch (error) {
    console.error('Error calculating total travel time:', error);
    return 0;
  }
};

// Find optimal room combination for booking with error handling
export const findOptimalRooms = (availableRooms, requestedRooms) => {
  try {
    if (!Array.isArray(availableRooms) || availableRooms.length === 0) {
      console.warn('No available rooms provided');
      return null;
    }
    
    if (!requestedRooms || requestedRooms < 1 || requestedRooms > MAX_ROOMS_PER_BOOKING) {
      console.warn('Invalid requested rooms count:', requestedRooms);
      return null;
    }
    
    if (requestedRooms > availableRooms.length) {
      return null; // Not enough rooms available
    }
    
    if (requestedRooms === 1) {
      return [availableRooms[0]];
    }
    
    // Group rooms by floor
    const roomsByFloor = {};
    availableRooms.forEach(room => {
      if (room && !isNaN(room)) {
        const floor = getFloorFromRoom(room);
        if (!roomsByFloor[floor]) {
          roomsByFloor[floor] = [];
        }
        roomsByFloor[floor].push(room);
      }
    });
    
    // Sort floors by number of available rooms (descending)
    const sortedFloors = Object.keys(roomsByFloor)
      .map(Number)
      .sort((a, b) => (roomsByFloor[b]?.length || 0) - (roomsByFloor[a]?.length || 0));
    
    let bestCombination = null;
    let bestTravelTime = Infinity;
    
    // Try to find rooms on the same floor first
    for (const floor of sortedFloors) {
      const floorRooms = roomsByFloor[floor];
      if (floorRooms?.length >= requestedRooms) {
        // Sort rooms by position on floor for optimal horizontal arrangement
        const sortedFloorRooms = floorRooms.sort((a, b) => 
          getRoomPositionOnFloor(a) - getRoomPositionOnFloor(b)
        );
        
        // Try different combinations of rooms on this floor
        for (let i = 0; i <= floorRooms.length - requestedRooms; i++) {
          const combination = sortedFloorRooms.slice(i, i + requestedRooms);
          const travelTime = calculateTotalTravelTime(combination);
          
          if (travelTime < bestTravelTime) {
            bestTravelTime = travelTime;
            bestCombination = combination;
          }
        }
      }
    }
    
    // If no single-floor solution found, try multi-floor combinations
    if (!bestCombination) {
      // Simple approach: take rooms from floors with most available rooms
      const selectedRooms = [];
      let remainingRooms = requestedRooms;
      
      for (const floor of sortedFloors) {
        if (remainingRooms <= 0) break;
        
        const floorRooms = roomsByFloor[floor];
        if (!floorRooms?.length) continue;
        
        const roomsToTake = Math.min(remainingRooms, floorRooms.length);
        
        // Sort rooms by position on floor
        const sortedFloorRooms = floorRooms.sort((a, b) => 
          getRoomPositionOnFloor(a) - getRoomPositionOnFloor(b)
        );
        
        selectedRooms.push(...sortedFloorRooms.slice(0, roomsToTake));
        remainingRooms -= roomsToTake;
      }
      
      if (remainingRooms === 0) {
        bestCombination = selectedRooms;
        bestTravelTime = calculateTotalTravelTime(selectedRooms);
      }
    }
    
    return bestCombination;
  } catch (error) {
    console.error('Error finding optimal rooms:', error);
    return null;
  }
};

// Generate random room occupancy with error handling
export const generateRandomOccupancy = (occupancyPercentage = 0.3) => {
  try {
    if (occupancyPercentage < 0 || occupancyPercentage > 1) {
      console.warn('Invalid occupancy percentage:', occupancyPercentage);
      occupancyPercentage = 0.3; // Default to 30%
    }
    
    const allRooms = generateAllRooms();
    if (!Array.isArray(allRooms) || allRooms.length === 0) {
      console.warn('No rooms available for occupancy generation');
      return [];
    }
    
    const occupiedRooms = [];
    
    allRooms.forEach(room => {
      if (room && !isNaN(room) && Math.random() < occupancyPercentage) {
        occupiedRooms.push(room);
      }
    });
    
    return occupiedRooms;
  } catch (error) {
    console.error('Error generating random occupancy:', error);
    return [];
  }
};

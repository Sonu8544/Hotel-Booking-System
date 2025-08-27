// Room structure constants
export const FLOORS = 10;
export const ROOMS_PER_FLOOR = 10;
export const TOP_FLOOR_ROOMS = 7;
export const MAX_ROOMS_PER_BOOKING = 5;

// Travel time constants
export const HORIZONTAL_TRAVEL_TIME = 1; // minutes per room
export const VERTICAL_TRAVEL_TIME = 2; // minutes per floor

// Generate all room numbers
export const generateAllRooms = () => {
  const rooms = [];
  
  // Floors 1-9: 10 rooms each (101-110, 201-210, etc.)
  for (let floor = 1; floor <= 9; floor++) {
    for (let room = 1; room <= 10; room++) {
      rooms.push(floor * 100 + room);
    }
  }
  
  // Floor 10: 7 rooms (1001-1007)
  for (let room = 1; room <= 7; room++) {
    rooms.push(1000 + room);
  }
  
  return rooms;
};

// Get floor number from room number
export const getFloorFromRoom = (roomNumber) => {
  if (roomNumber >= 1000) return 10;
  return Math.floor(roomNumber / 100);
};

// Get room position on floor (0-9 for floors 1-9, 0-6 for floor 10)
export const getRoomPositionOnFloor = (roomNumber) => {
  if (roomNumber >= 1000) return roomNumber - 1001;
  return (roomNumber % 100) - 1;
};

// Calculate horizontal travel time between two rooms on the same floor
export const calculateHorizontalTravelTime = (room1, room2) => {
  const floor1 = getFloorFromRoom(room1);
  const floor2 = getFloorFromRoom(room2);
  
  if (floor1 !== floor2) return 0;
  
  const pos1 = getRoomPositionOnFloor(room1);
  const pos2 = getRoomPositionOnFloor(room2);
  
  return Math.abs(pos1 - pos2) * HORIZONTAL_TRAVEL_TIME;
};

// Calculate vertical travel time between floors
export const calculateVerticalTravelTime = (floor1, floor2) => {
  return Math.abs(floor1 - floor2) * VERTICAL_TRAVEL_TIME;
};

// Calculate total travel time for a set of rooms
export const calculateTotalTravelTime = (rooms) => {
  if (rooms.length <= 1) return 0;
  
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
      totalTime += currentPos * HORIZONTAL_TRAVEL_TIME;
      
      // Add horizontal travel from stairs/lift to next room
      const nextPos = getRoomPositionOnFloor(nextRoom);
      totalTime += nextPos * HORIZONTAL_TRAVEL_TIME;
    }
  }
  
  return totalTime;
};

// Find optimal room combination for booking
export const findOptimalRooms = (availableRooms, requestedRooms) => {
  if (requestedRooms > availableRooms.length) {
    return null; // Not enough rooms available
  }
  
  if (requestedRooms === 1) {
    return [availableRooms[0]];
  }
  
  // Group rooms by floor
  const roomsByFloor = {};
  availableRooms.forEach(room => {
    const floor = getFloorFromRoom(room);
    if (!roomsByFloor[floor]) {
      roomsByFloor[floor] = [];
    }
    roomsByFloor[floor].push(room);
  });
  
  // Sort floors by number of available rooms (descending)
  const sortedFloors = Object.keys(roomsByFloor)
    .map(Number)
    .sort((a, b) => roomsByFloor[b].length - roomsByFloor[a].length);
  
  let bestCombination = null;
  let bestTravelTime = Infinity;
  
  // Try to find rooms on the same floor first
  for (const floor of sortedFloors) {
    const floorRooms = roomsByFloor[floor];
    if (floorRooms.length >= requestedRooms) {
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
};

// Generate random room occupancy
export const generateRandomOccupancy = (occupancyPercentage = 0.3) => {
  const allRooms = generateAllRooms();
  const occupiedRooms = [];
  
  allRooms.forEach(room => {
    if (Math.random() < occupancyPercentage) {
      occupiedRooms.push(room);
    }
  });
  
  return occupiedRooms;
};

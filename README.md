# Hotel Room Reservation System

A sophisticated React-based hotel room booking system that optimizes room selection based on travel time calculations between rooms.

## 🏨 System Overview

The system manages a 10-floor hotel with 97 rooms:
- **Floors 1-9**: 10 rooms each (101-110, 201-210, ..., 901-910)
- **Floor 10**: 7 rooms (1001-1007)
- **Stairs/Lift**: Located on the left side of each floor

## ✨ Features

### 🎯 Smart Room Selection
- **Priority-based booking**: Rooms on the same floor are prioritized
- **Travel time optimization**: Minimizes total travel time between booked rooms
- **Multi-floor support**: Intelligent selection when same-floor rooms are unavailable
- **Maximum booking limit**: Up to 5 rooms per booking

### 🧮 Travel Time Calculations
- **Horizontal travel**: 1 minute per room on the same floor
- **Vertical travel**: 2 minutes per floor using stairs/lift
- **Optimal routing**: Considers stairs/lift location for efficient path planning

### 🎨 Interactive Visualization
- **Building layout**: Visual representation of all floors and rooms
- **Room status**: Color-coded rooms (Available, Occupied, Booked, Selected)
- **Real-time updates**: Dynamic visualization as rooms are booked

### 🎲 Control Features
- **Random occupancy generation**: Simulate real hotel scenarios
- **Reset functionality**: Clear all bookings and occupancy
- **Statistics dashboard**: Comprehensive booking analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Hotel-Booking-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production
```bash
npm run build
npm run preview
```

## 🎮 Usage Instructions

### 1. Room Booking Process
1. **Enter room count**: Specify how many rooms you want to book (1-5)
2. **Find optimal rooms**: Click "Find Optimal Rooms" to get the best combination
3. **Review selection**: Check the selected rooms and travel time
4. **Confirm booking**: Click "Book Selected Rooms" to complete the reservation

### 2. Control Panel
- **Generate Random Occupancy**: Creates realistic hotel occupancy scenarios (~30% occupancy)
- **Reset All**: Clears all bookings and occupied rooms
- **Statistics**: View real-time occupancy rates and room availability

### 3. Building Visualization
- **Floor indicators**: Each floor is clearly labeled (F1, F2, etc.)
- **Room colors**:
  - 🟢 **Green**: Selected rooms (currently being booked)
  - 🔵 **Blue**: Booked rooms
  - 🔴 **Red**: Occupied rooms
  - ⚪ **Gray**: Available rooms
- **Stairs/Lift**: Yellow "S" indicators on the left side

## 🏗️ Technical Architecture

### Frontend Framework
- **React 19**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Fast build tool and development server

### Core Algorithms
- **Optimal Room Selection**: Prioritizes same-floor rooms, then minimizes travel time
- **Travel Time Calculation**: Considers both horizontal and vertical movement
- **Multi-floor Optimization**: Balances floor proximity with room availability

### Component Structure
```
src/
├── components/
│   ├── BuildingVisualization.jsx    # Hotel building layout
│   ├── BookingInterface.jsx         # Room booking form
│   ├── ControlPanel.jsx             # System controls
│   └── BookingStats.jsx             # Statistics dashboard
├── utils/
│   └── roomBooking.js               # Core booking logic
├── App.jsx                          # Main application
└── main.jsx                         # Entry point
```

## 📊 Algorithm Details

### Room Selection Priority
1. **Same Floor First**: Maximum rooms on the same floor
2. **Travel Time Minimization**: Optimal arrangement within floor
3. **Multi-floor Fallback**: When same-floor rooms are insufficient

### Travel Time Formula
```
Total Time = Σ(Horizontal Travel) + Σ(Vertical Travel) + Σ(Stairs Access)
```

Where:
- **Horizontal Travel**: |Room Position A - Room Position B| × 1 minute
- **Vertical Travel**: |Floor A - Floor B| × 2 minutes
- **Stairs Access**: Distance from room to stairs/lift on each floor

## 🎯 Example Scenarios

### Scenario 1: Same Floor Booking
- **Request**: 4 rooms
- **Available**: Rooms 101, 102, 105, 106 on Floor 1
- **Result**: All 4 rooms on Floor 1 (minimal travel time)

### Scenario 2: Multi-floor Booking
- **Request**: 3 rooms
- **Available**: Floor 1: 101, 102 | Floor 2: 201, 202, 203
- **Result**: Rooms 201, 202, 203 on Floor 2 (better than mixed floors)

### Scenario 3: Optimal Path
- **Request**: 2 rooms
- **Available**: Floor 1: 101, 110 | Floor 2: 201, 202
- **Result**: Rooms 201, 202 on Floor 2 (adjacent rooms vs. far apart)

## 🔧 Customization

### Room Configuration
Modify constants in `src/utils/roomBooking.js`:
```javascript
export const FLOORS = 10;                    // Number of floors
export const ROOMS_PER_FLOOR = 10;           // Rooms per floor (1-9)
export const TOP_FLOOR_ROOMS = 7;            // Rooms on top floor
export const MAX_ROOMS_PER_BOOKING = 5;      // Maximum rooms per booking
```

### Travel Time Settings
```javascript
export const HORIZONTAL_TRAVEL_TIME = 1;     // Minutes per room
export const VERTICAL_TRAVEL_TIME = 2;       // Minutes per floor
```

### Occupancy Generation
```javascript
// In ControlPanel.jsx
const randomOccupied = generateRandomOccupancy(0.3); // 30% occupancy
```

## 🧪 Testing

The system includes comprehensive testing scenarios:
- **Edge cases**: Maximum room limits, insufficient availability
- **Algorithm validation**: Travel time calculations and room selection
- **UI responsiveness**: Different screen sizes and device types
- **State management**: Proper handling of room status changes

## 🚀 Deployment

### Build and Deploy
1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - Any static hosting service

### Environment Variables
No environment variables are required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues, questions, or feature requests:
1. Check the existing issues
2. Create a new issue with detailed description
3. Provide reproduction steps if applicable

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

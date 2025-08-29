# Hotel Booking System - Project Summary

## 1. Project Overview
A React-based hotel room reservation system for a 10-floor hotel (97 rooms total) that optimizes room selection based on travel time calculations. The system prioritizes same-floor bookings and minimizes travel time between rooms using intelligent algorithms.

## 2. Features Implemented
- **Smart Room Selection**: Priority-based booking with travel time optimization
- **Interactive Building Visualization**: Color-coded room status with real-time updates
- **Travel Time Calculations**: 1 min/room horizontally, 2 min/floor vertically
- **Control Panel**: Random occupancy generation and reset functionality
- **Statistics Dashboard**: Real-time occupancy rates and booking analytics
- **Responsive Design**: Works on desktop and mobile devices

## 3. Setup Instructions
```bash
# Clone and install
git clone <repository-url>
cd Hotel-Booking-System
npm install

# Development
npm run dev

# Production
npm run build
npm run preview
```
Access at `http://localhost:5173`

## 4. Live Demo & GitHub
- **GitHub**: [Repository URL]
- **Live Demo**: [Deployment URL]
- **Tech Stack**: React 19, Tailwind CSS, Vite

## 5. Assumptions & Decisions
- Maximum 5 rooms per booking for practical limitations
- Stairs/lift located on left side of each floor
- 30% random occupancy rate for realistic scenarios
- Same-floor rooms prioritized over multi-floor selections
- Floor 10 has only 7 rooms (1001-1007)

## 6. Challenges & Solutions
- **Challenge**: Complex travel time calculations across floors
  - **Solution**: Implemented weighted algorithm considering horizontal + vertical movement
- **Challenge**: Optimal room selection with multiple constraints
  - **Solution**: Priority-based selection with fallback mechanisms
- **Challenge**: Real-time UI updates for room status
  - **Solution**: React state management with efficient re-rendering

## 7. Improvements (Future Enhancements)
- **Advanced Features**: Room preferences, pricing tiers, booking history
- **Algorithm Optimization**: Machine learning for better room suggestions
- **Integration**: Payment gateway, user authentication, email notifications
- **Performance**: Virtual scrolling for larger hotels, caching mechanisms
- **Mobile App**: Native iOS/Android applications

## 8. Contact
- **Developer**: [Your Name]
- **Email**: [Your Email]
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]

---
*Built with React, Tailwind CSS, and modern web technologies*

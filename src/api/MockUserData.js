// Mock data for user rides, notifications, and scooter availability

export const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  totalRides: 45,
  totalDistance: 180.5,
  totalSaved: 25.30
};

export const mockNotifications = [
  {
    id: 1,
    title: "Weekend Special Offer!",
    message: "Get 20% off on all rides this weekend. Use code WEEKEND20",
    type: "promotion",
    isRead: false,
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "New Scooter Added",
    message: "Check out our new Xiaomi Pro 3 scooters in your area!",
    type: "update",
    isRead: true,
    date: "2024-01-14"
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "Your payment of $12.50 has been processed successfully.",
    type: "payment",
    isRead: true,
    date: "2024-01-13"
  }
];

export const mockRides = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:30",
    startLocation: "Central Park",
    endLocation: "Times Square",
    distance: 4.2,
    duration: 18,
    cost: 8.40,
    status: "completed",
    rating: 5,
    review: "Amazing ride! The scooter was in perfect condition and the route was smooth. Highly recommended!",
    scooterId: "SC001",
    scooterName: "Xiaomi Pro 2"
  },
  {
    id: 2,
    date: "2024-01-14",
    time: "09:15",
    startLocation: "Brooklyn Bridge",
    endLocation: "Manhattan Beach",
    distance: 6.8,
    duration: 28,
    cost: 12.60,
    status: "completed",
    rating: 4,
    scooterId: "SC002",
    scooterName: "Segway Ninebot"
  },
  {
    id: 3,
    date: "2024-01-13",
    time: "16:45",
    startLocation: "Central Station",
    endLocation: "Shopping Mall",
    distance: 3.1,
    duration: 15,
    cost: 6.20,
    status: "completed",
    rating: 4,
    review: "Good ride overall, but the scooter was a bit slow. The app worked perfectly though.",
    scooterId: "SC003",
    scooterName: "Yamaha Zoomer"
  },
  {
    id: 4,
    date: "2024-01-12",
    time: "11:20",
    startLocation: "University Campus",
    endLocation: "Library",
    distance: 2.5,
    duration: 12,
    cost: 4.50,
    status: "completed",
    rating: 4,
    scooterId: "SC001",
    scooterName: "Xiaomi Pro 2"
  },
  {
    id: 5,
    date: "2024-01-16",
    time: "10:00",
    startLocation: "Airport Terminal",
    endLocation: "Hotel District",
    distance: 5.5,
    duration: 22,
    cost: 11.00,
    status: "upcoming",
    scooterId: "SC004",
    scooterName: "NIU NQi"
  }
];

export const mockAvailableScooters = [
  {
    id: "SC001",
    name: "Xiaomi Pro 2",
    battery: 85,
    range: "40km",
    pricePerMin: 0.20,
    location: "Central Park",
    distance: 0.2,
    partner: "Bird"
  },
  {
    id: "SC002",
    name: "Segway Ninebot",
    battery: 60,
    range: "25km",
    pricePerMin: 0.25,
    location: "Times Square",
    distance: 0.5,
    partner: "Lime"
  },
  {
    id: "SC003",
    name: "Yamaha Zoomer",
    battery: 75,
    range: "35km",
    pricePerMin: 0.22,
    location: "Brooklyn Bridge",
    distance: 0.8,
    partner: "Bird"
  },
  {
    id: "SC004",
    name: "NIU NQi",
    battery: 80,
    range: "38km",
    pricePerMin: 0.21,
    location: "Central Station",
    distance: 0.3,
    partner: "Lime"
  }
];


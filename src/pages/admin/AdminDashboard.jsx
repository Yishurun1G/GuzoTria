import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  FaUsers, 
  FaBicycle, 
  FaRoute, 
  FaDollarSign, 
  FaChartLine, 
  FaClock, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload,
  FaFilter,
  FaSearch
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1234,
    activeScooters: 89,
    totalRides: 5678,
    revenue: 12345,
    todayRides: 45,
    maintenance: 12,
    available: 77,
    offline: 8
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'ride', user: 'John Doe', action: 'completed a ride', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'scooter', scooter: 'SC-001', action: 'needs maintenance', time: '5 minutes ago', status: 'warning' },
    { id: 3, type: 'user', user: 'Jane Smith', action: 'registered', time: '10 minutes ago', status: 'info' },
    { id: 4, type: 'ride', user: 'Mike Johnson', action: 'started a ride', time: '15 minutes ago', status: 'success' },
    { id: 5, type: 'scooter', scooter: 'SC-002', action: 'went offline', time: '20 minutes ago', status: 'error' }
  ]);

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', status: 'active', rides: 12 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-01-14', status: 'active', rides: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-01-13', status: 'active', rides: 15 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-01-12', status: 'inactive', rides: 3 },
    { id: 5, name: 'David Brown', email: 'david@example.com', joinDate: '2024-01-11', status: 'active', rides: 7 }
  ]);

  const [recentRides, setRecentRides] = useState([
    { id: 1, user: 'John Doe', scooter: 'SC-001', startTime: '14:30', duration: '15 min', distance: '2.5 km', cost: '$3.50', status: 'completed' },
    { id: 2, user: 'Jane Smith', scooter: 'SC-002', startTime: '14:15', duration: '8 min', distance: '1.2 km', cost: '$2.00', status: 'completed' },
    { id: 3, user: 'Mike Johnson', scooter: 'SC-003', startTime: '14:00', duration: '25 min', distance: '4.1 km', cost: '$5.75', status: 'in-progress' },
    { id: 4, user: 'Sarah Wilson', scooter: 'SC-004', startTime: '13:45', duration: '12 min', distance: '1.8 km', cost: '$2.50', status: 'completed' },
    { id: 5, user: 'David Brown', scooter: 'SC-005', startTime: '13:30', duration: '18 min', distance: '3.2 km', cost: '$4.25', status: 'completed' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayRides: prev.todayRides + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 50)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <FaCheckCircle className="text-green-500" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'error': return <FaTimesCircle className="text-red-500" />;
      case 'info': return <FaClock className="text-blue-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your scooter service.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FaDownload className="text-sm" />
              Export Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FaPlus className="text-sm" />
              Add Scooter
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <FaChartLine className="text-xs" />
                  +12% from last month
                </p>
              </div>
              <FaUsers className="text-4xl text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Scooters</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeScooters}</p>
                <p className="text-sm text-gray-600">
                  {stats.available} available, {stats.maintenance} in maintenance
                </p>
              </div>
              <FaBicycle className="text-4xl text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalRides.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <FaChartLine className="text-xs" />
                  +8% from last week
                </p>
              </div>
              <FaRoute className="text-4xl text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-orange-600">${stats.revenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <FaChartLine className="text-xs" />
                  +15% from last month
                </p>
              </div>
              <FaDollarSign className="text-4xl text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Rides</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.todayRides}</p>
              </div>
              <FaClock className="text-2xl text-indigo-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance Required</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
              </div>
              <FaExclamationTriangle className="text-2xl text-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offline Scooters</p>
                <p className="text-2xl font-bold text-red-600">{stats.offline}</p>
              </div>
              <FaTimesCircle className="text-2xl text-red-500" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {activity.user && <span className="font-medium">{activity.user}</span>}
                        {activity.scooter && <span className="font-medium">{activity.scooter}</span>}
                        {' '}{activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <FaUsers className="text-2xl text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Manage Users</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FaBicycle className="text-2xl text-green-600" />
                  <span className="text-sm font-medium text-green-800">Manage Scooters</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <FaRoute className="text-2xl text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">View Rides</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <FaDollarSign className="text-2xl text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">View Revenue</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.rides}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEye />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Rides */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Rides</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scooter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ride.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ride.scooter}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ride.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ride.cost}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ride.status)}`}>
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}


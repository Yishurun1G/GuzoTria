import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { 
  FaUsers, 
  FaMotorcycle, 
  FaRoute, 
  FaDollarSign,
  FaCalendarAlt,
  FaDownload,
  FaChartLine,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaWrench,
  FaClock
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for analytics
const mockRidesData = [
  { date: '2024-01-15', rides: 120 },
  { date: '2024-01-16', rides: 145 },
  { date: '2024-01-17', rides: 98 },
  { date: '2024-01-18', rides: 167 },
  { date: '2024-01-19', rides: 189 },
  { date: '2024-01-20', rides: 203 },
  { date: '2024-01-21', rides: 178 }
];

const mockScooterStatusData = [
  { name: 'Available', value: 45, color: '#10B981' },
  { name: 'In Maintenance', value: 8, color: '#F59E0B' },
  { name: 'Offline', value: 12, color: '#EF4444' }
];

const mockMetricsData = [
  {
    metric: 'Avg Ride Duration',
    value: '12.5 min',
    change: '+5.2%',
    trend: 'up'
  },
  {
    metric: 'Avg Distance',
    value: '3.2 km',
    change: '-2.1%',
    trend: 'down'
  },
  {
    metric: 'Avg Cost',
    value: '$2.45',
    change: '+1.8%',
    trend: 'up'
  },
  {
    metric: 'Daily Active Users',
    value: '1,247',
    change: '+12.3%',
    trend: 'up'
  },
  {
    metric: 'Peak Usage Hour',
    value: '5:00 PM',
    change: '+0.5%',
    trend: 'up'
  },
  {
    metric: 'Customer Satisfaction',
    value: '4.7/5',
    change: '+0.3%',
    trend: 'up'
  }
];

function FilterBar({ selectedRange, onRangeChange, onCustomDateChange }) {
  const dateRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="text-blue-600" />
          <span className="font-medium text-gray-700">Analytics Period:</span>
          <div className="flex gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onRangeChange(range.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedRange === range.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
            <FaDownload />
            Export CSV
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2">
            <FaDownload />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsSummary({ stats }) {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'blue',
      change: '+8.2%'
    },
    {
      title: 'Active Scooters',
      value: stats.activeScooters,
      icon: FaMotorcycle,
      color: 'green',
      change: '+12.5%'
    },
    {
      title: 'Total Rides',
      value: stats.totalRides,
      icon: FaRoute,
      color: 'purple',
      change: '+15.3%'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue}`,
      icon: FaDollarSign,
      color: 'yellow',
      change: '+18.7%'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <FaArrowUp className="text-xs" />
                {card.change}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(card.color)}`}>
              <card.icon className="text-2xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RidesChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          Rides Over Time
        </h3>
        <span className="text-sm text-gray-500">Daily rides</span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="rides" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ScooterStatusChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaChartPie className="text-green-600" />
          Scooter Status Distribution
        </h3>
        <span className="text-sm text-gray-500">Current status</span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricsTable({ data }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Key Metrics</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((metric, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {metric.metric}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {metric.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                    {metric.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [selectedRange, setSelectedRange] = useState('7days');
  const [stats, setStats] = useState({
    totalUsers: '2,847',
    activeScooters: '65',
    totalRides: '1,247',
    revenue: '3,125'
  });

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    // Here you would typically fetch new data based on the selected range
    console.log('Selected range:', range);
  };

  const handleCustomDateChange = (startDate, endDate) => {
    console.log('Custom date range:', startDate, 'to', endDate);
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Implement CSV export logic
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Implement PDF export logic
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
        </div>

        <FilterBar 
          selectedRange={selectedRange}
          onRangeChange={handleRangeChange}
          onCustomDateChange={handleCustomDateChange}
        />

        <StatsSummary stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RidesChart data={mockRidesData} />
          <ScooterStatusChart data={mockScooterStatusData} />
        </div>

        <MetricsTable data={mockMetricsData} />
      </div>
    </AdminLayout>
  );
}

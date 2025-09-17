import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaBatteryFull, 
  FaBatteryThreeQuarters, 
  FaBatteryHalf, 
  FaBatteryQuarter, 
  FaBatteryEmpty,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaWrench,
  FaTimes
} from "react-icons/fa";

// Mock data for scooters
const mockScooters = [
  {
    id: "SC001",
    model: "Guzo Pro X1",
    partner: "City Partners",
    battery: 85,
    status: "Active",
    lastSeen: "2 hours ago",
    location: { lat: 40.7128, lng: -74.0060 },
    specs: {
      maxSpeed: "25 km/h",
      range: "30 km",
      weight: "15 kg",
      chargingTime: "4 hours"
    },
    usage: {
      totalRides: 1247,
      totalRevenue: 18705,
      maintenanceCount: 3,
      lastMaintenance: "2 weeks ago"
    }
  },
  {
    id: "SC002", 
    model: "Guzo Eco S2",
    partner: "Green Transport",
    battery: 45,
    status: "Maintenance",
    lastSeen: "1 day ago",
    location: { lat: 40.7589, lng: -73.9851 },
    specs: {
      maxSpeed: "20 km/h",
      range: "25 km", 
      weight: "12 kg",
      chargingTime: "3 hours"
    },
    usage: {
      totalRides: 892,
      totalRevenue: 13380,
      maintenanceCount: 5,
      lastMaintenance: "1 week ago"
    }
  },
  {
    id: "SC003",
    model: "Guzo Pro X1", 
    partner: "City Partners",
    battery: 92,
    status: "Active",
    lastSeen: "30 minutes ago",
    location: { lat: 40.7505, lng: -73.9934 },
    specs: {
      maxSpeed: "25 km/h",
      range: "30 km",
      weight: "15 kg", 
      chargingTime: "4 hours"
    },
    usage: {
      totalRides: 2103,
      totalRevenue: 31545,
      maintenanceCount: 2,
      lastMaintenance: "1 month ago"
    }
  },
  {
    id: "SC004",
    model: "Guzo Lite L1",
    partner: "Urban Mobility",
    battery: 15,
    status: "Low Battery",
    lastSeen: "3 hours ago", 
    location: { lat: 40.7614, lng: -73.9776 },
    specs: {
      maxSpeed: "18 km/h",
      range: "20 km",
      weight: "10 kg",
      chargingTime: "2.5 hours"
    },
    usage: {
      totalRides: 567,
      totalRevenue: 8505,
      maintenanceCount: 1,
      lastMaintenance: "3 weeks ago"
    }
  }
];

function ScooterTable({ scooters, onEdit, onDelete, onViewDetails }) {
  const getBatteryIcon = (battery) => {
    if (battery >= 80) return <FaBatteryFull className="text-green-500" />;
    if (battery >= 60) return <FaBatteryThreeQuarters className="text-yellow-500" />;
    if (battery >= 40) return <FaBatteryHalf className="text-orange-500" />;
    if (battery >= 20) return <FaBatteryQuarter className="text-red-500" />;
    return <FaBatteryEmpty className="text-red-600" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Maintenance": return "bg-yellow-100 text-yellow-800";
      case "Low Battery": return "bg-red-100 text-red-800";
      case "Offline": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {scooters.map((scooter) => (
            <tr key={scooter.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {scooter.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {scooter.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {scooter.partner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center gap-2">
                  {getBatteryIcon(scooter.battery)}
                  <span>{scooter.battery}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(scooter.status)}`}>
                  {scooter.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {scooter.lastSeen}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetails(scooter)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEdit(scooter)}
                    className="text-indigo-600 hover:text-indigo-900 p-1"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(scooter.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Filters({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Low Battery">Low Battery</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner</label>
          <select
            value={filters.partner}
            onChange={(e) => onFilterChange('partner', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Partners</option>
            <option value="City Partners">City Partners</option>
            <option value="Green Transport">Green Transport</option>
            <option value="Urban Mobility">Urban Mobility</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Battery Level</label>
          <select
            value={filters.battery}
            onChange={(e) => onFilterChange('battery', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="high">High (80%+)</option>
            <option value="medium">Medium (40-79%)</option>
            <option value="low">Low (0-39%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function AddScooterModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    model: "",
    partner: "",
    battery: "",
    status: "Active",
    location: { lat: "", lng: "" }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScooter = {
      id: `SC${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData,
      battery: parseInt(formData.battery),
      location: { lat: parseFloat(formData.location.lat), lng: parseFloat(formData.location.lng) },
      lastSeen: "Just added",
      specs: {
        maxSpeed: "25 km/h",
        range: "30 km",
        weight: "15 kg",
        chargingTime: "4 hours"
      },
      usage: {
        totalRides: 0,
        totalRevenue: 0,
        maintenanceCount: 0,
        lastMaintenance: "N/A"
      }
    };
    onAdd(newScooter);
    setFormData({
      model: "",
      partner: "",
      battery: "",
      status: "Active",
      location: { lat: "", lng: "" }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Scooter</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner</label>
            <select
              value={formData.partner}
              onChange={(e) => setFormData({...formData, partner: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Partner</option>
              <option value="City Partners">City Partners</option>
              <option value="Green Transport">Green Transport</option>
              <option value="Urban Mobility">Urban Mobility</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Battery %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.battery}
              onChange={(e) => setFormData({...formData, battery: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Low Battery">Low Battery</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.location.lat}
                onChange={(e) => setFormData({...formData, location: {...formData.location, lat: e.target.value}})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="40.7128"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.location.lng}
                onChange={(e) => setFormData({...formData, location: {...formData.location, lng: e.target.value}})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="-74.0060"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Scooter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ScooterDetailDrawer({ isOpen, onClose, scooter }) {
  if (!isOpen || !scooter) return null;

  const getBatteryIcon = (battery) => {
    if (battery >= 80) return <FaBatteryFull className="text-green-500" />;
    if (battery >= 60) return <FaBatteryThreeQuarters className="text-yellow-500" />;
    if (battery >= 40) return <FaBatteryHalf className="text-orange-500" />;
    if (battery >= 20) return <FaBatteryQuarter className="text-red-500" />;
    return <FaBatteryEmpty className="text-red-600" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Scooter Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium">{scooter.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium">{scooter.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Partner:</span>
                <span className="font-medium">{scooter.partner}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Battery:</span>
                <div className="flex items-center gap-2">
                  {getBatteryIcon(scooter.battery)}
                  <span className="font-medium">{scooter.battery}%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium">{scooter.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Seen:</span>
                <span className="font-medium">{scooter.lastSeen}</span>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              Location
            </h3>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Lat: {scooter.location.lat}</p>
              <p className="text-sm text-gray-600">Lng: {scooter.location.lng}</p>
            </div>
          </div>
          
          {/* Specs */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Max Speed:</span>
                <span className="font-medium">{scooter.specs.maxSpeed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Range:</span>
                <span className="font-medium">{scooter.specs.range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{scooter.specs.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Charging Time:</span>
                <span className="font-medium">{scooter.specs.chargingTime}</span>
              </div>
            </div>
          </div>
          
          {/* Usage Stats */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Usage Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <FaClock className="text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-blue-600">{scooter.usage.totalRides}</p>
                <p className="text-sm text-gray-600">Total Rides</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <FaDollarSign className="text-green-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-green-600">${scooter.usage.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <FaWrench className="text-yellow-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-yellow-600">{scooter.usage.maintenanceCount}</p>
                <p className="text-sm text-gray-600">Maintenance</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <FaClock className="text-gray-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-gray-600">{scooter.usage.lastMaintenance}</p>
                <p className="text-sm text-gray-600">Last Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminScooters() {
  const [scooters, setScooters] = useState(mockScooters);
  const [filteredScooters, setFilteredScooters] = useState(mockScooters);
  const [filters, setFilters] = useState({
    status: "",
    partner: "",
    battery: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);

  // Filter scooters based on current filters
  useEffect(() => {
    let filtered = scooters;

    if (filters.status) {
      filtered = filtered.filter(scooter => scooter.status === filters.status);
    }

    if (filters.partner) {
      filtered = filtered.filter(scooter => scooter.partner === filters.partner);
    }

    if (filters.battery) {
      filtered = filtered.filter(scooter => {
        if (filters.battery === "high") return scooter.battery >= 80;
        if (filters.battery === "medium") return scooter.battery >= 40 && scooter.battery < 80;
        if (filters.battery === "low") return scooter.battery < 40;
        return true;
      });
    }

    setFilteredScooters(filtered);
  }, [scooters, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddScooter = (newScooter) => {
    setScooters(prev => [...prev, newScooter]);
  };

  const handleEditScooter = (scooter) => {
    // TODO: Implement edit functionality
    console.log("Edit scooter:", scooter);
  };

  const handleDeleteScooter = (scooterId) => {
    if (window.confirm("Are you sure you want to delete this scooter?")) {
      setScooters(prev => prev.filter(scooter => scooter.id !== scooterId));
    }
  };

  const handleViewDetails = (scooter) => {
    setSelectedScooter(scooter);
    setShowDetailDrawer(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Scooter Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus />
            Add New Scooter
          </button>
        </div>

        <Filters filters={filters} onFilterChange={handleFilterChange} />

        <div className="bg-white rounded-lg shadow">
          <ScooterTable
            scooters={filteredScooters}
            onEdit={handleEditScooter}
            onDelete={handleDeleteScooter}
            onViewDetails={handleViewDetails}
          />
        </div>

        <AddScooterModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddScooter}
        />

        <ScooterDetailDrawer
          isOpen={showDetailDrawer}
          onClose={() => setShowDetailDrawer(false)}
          scooter={selectedScooter}
        />
      </div>
    </AdminLayout>
  );
}


import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { 
  FaMapMarkerAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaSearch,
  FaTimes,
  FaMotorcycle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock
} from "react-icons/fa";

// Mock data for locations
const mockLocations = [
  {
    id: 1,
    name: "Addis Ababa University",
    address: "Sidist Kilo, Addis Ababa, Ethiopia",
    capacity: 50,
    totalScooters: 35,
    status: "active",
    coordinates: { lat: 9.0054, lng: 38.7636 },
    lastUpdated: "2024-01-20"
  },
  {
    id: 2,
    name: "Bole International Airport",
    address: "Bole, Addis Ababa, Ethiopia",
    capacity: 100,
    totalScooters: 78,
    status: "active",
    coordinates: { lat: 8.9779, lng: 38.7993 },
    lastUpdated: "2024-01-21"
  },
  {
    id: 3,
    name: "Mercato Shopping Center",
    address: "Mercato, Addis Ababa, Ethiopia",
    capacity: 30,
    totalScooters: 12,
    status: "maintenance",
    coordinates: { lat: 9.0249, lng: 38.7469 },
    lastUpdated: "2024-01-19"
  },
  {
    id: 4,
    name: "National Palace",
    address: "Arat Kilo, Addis Ababa, Ethiopia",
    capacity: 25,
    totalScooters: 0,
    status: "inactive",
    coordinates: { lat: 9.0300, lng: 38.7600 },
    lastUpdated: "2024-01-15"
  },
  {
    id: 5,
    name: "Unity Park",
    address: "Entoto, Addis Ababa, Ethiopia",
    capacity: 40,
    totalScooters: 28,
    status: "active",
    coordinates: { lat: 9.0500, lng: 38.7800 },
    lastUpdated: "2024-01-22"
  }
];

function LocationTable({ locations, onEdit, onDelete, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <FaCheckCircle className="text-green-500" />;
      case "maintenance": return <FaExclamationTriangle className="text-yellow-500" />;
      case "inactive": return <FaClock className="text-red-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Scooters</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {locations.map((location) => (
            <tr key={location.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-500">Capacity: {location.capacity}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 max-w-xs truncate" title={location.address}>
                  {location.address}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaMotorcycle className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{location.totalScooters}</span>
                  <span className="text-sm text-gray-500">/ {location.capacity}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getStatusIcon(location.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                    {location.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetails(location)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEdit(location)}
                    className="text-green-600 hover:text-green-900 p-1"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(location.id)}
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

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations by name or address..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLocationModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    capacity: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      id: Math.floor(Math.random() * 10000),
      ...formData,
      capacity: parseInt(formData.capacity),
      totalScooters: 0,
      status: "active",
      coordinates: { lat: 9.0054, lng: 38.7636 }, // Default coordinates
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    onAdd(newLocation);
    setFormData({
      name: "",
      address: "",
      capacity: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Addis Ababa University"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Sidist Kilo, Addis Ababa, Ethiopia"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50"
              required
            />
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
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LocationDetailDrawer({ isOpen, onClose, location }) {
  if (!isOpen || !location) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <FaCheckCircle className="text-green-500" />;
      case "maintenance": return <FaExclamationTriangle className="text-yellow-500" />;
      case "inactive": return <FaClock className="text-red-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Location Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FaMapMarkerAlt className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{location.name}</h3>
                <p className="text-gray-600 text-sm">{location.address}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(location.status)}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                    {location.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capacity:</span>
                <span className="font-medium">{location.capacity} scooters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Scooters:</span>
                <span className="font-medium">{location.totalScooters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Spots:</span>
                <span className="font-medium">{location.capacity - location.totalScooters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(location.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Coordinates</h4>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Lat: {location.coordinates.lat}</p>
                <p className="text-sm text-gray-600">Lng: {location.coordinates.lng}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Map Preview</h4>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map goes here</p>
                <p className="text-sm text-gray-400 mt-1">Interactive map will be integrated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLocations() {
  const [locations, setLocations] = useState(mockLocations);
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = locations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [locations, searchTerm]);

  const handleAddLocation = (newLocation) => {
    setLocations(prev => [...prev, newLocation]);
  };

  const handleEditLocation = (location) => {
    console.log("Edit location:", location);
  };

  const handleDeleteLocation = (locationId) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(prev => prev.filter(location => location.id !== locationId));
    }
  };

  const handleViewDetails = (location) => {
    setSelectedLocation(location);
    setShowDetailDrawer(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Location Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus />
            Add Location
          </button>
        </div>

        {/* Map Preview Area */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Map Overview
            </h2>
            <div className="bg-gray-100 p-12 rounded-lg text-center">
              <FaMapMarkerAlt className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-2">Map goes here</p>
              <p className="text-gray-400">Interactive map showing all locations will be integrated</p>
            </div>
          </div>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="bg-white rounded-lg shadow">
          <LocationTable
            locations={filteredLocations}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
            onViewDetails={handleViewDetails}
          />
        </div>

        <AddLocationModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddLocation}
        />

        <LocationDetailDrawer
          isOpen={showDetailDrawer}
          onClose={() => setShowDetailDrawer(false)}
          location={selectedLocation}
        />
      </div>
    </AdminLayout>
  );
}

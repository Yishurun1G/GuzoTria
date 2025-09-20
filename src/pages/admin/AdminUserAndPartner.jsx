import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  FaUsers, 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaUserTag,
  FaBan,
  FaUnlock,
  FaCheckCircle,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCrown
} from "react-icons/fa";

// Mock data for users and partners
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+251912345678",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    totalRides: 45,
    totalSpent: 1250,
    location: "Addis Ababa"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+251912345679",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    totalRides: 32,
    totalSpent: 890,
    location: "Addis Ababa"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+251912345680",
    role: "user",
    status: "suspended",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
    totalRides: 12,
    totalSpent: 340,
    location: "Addis Ababa"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+251912345681",
    role: "user",
    status: "active",
    joinDate: "2024-01-12",
    lastActive: "2024-01-21",
    totalRides: 28,
    totalSpent: 720,
    location: "Addis Ababa"
  }
];

const mockPartners = [
  {
    id: 1,
    name: "Scooter Hub Addis",
    email: "contact@scooterhub.com",
    phone: "+251911234567",
    role: "partner",
    status: "approved",
    joinDate: "2024-01-01",
    lastActive: "2024-01-20",
    totalScooters: 25,
    totalEarnings: 15000,
    location: "Addis Ababa",
    businessLicense: "BL-2024-001"
  },
  {
    id: 2,
    name: "Green Mobility Solutions",
    email: "info@greenmobility.com",
    phone: "+251911234568",
    role: "partner",
    status: "pending",
    joinDate: "2024-01-18",
    lastActive: "2024-01-19",
    totalScooters: 15,
    totalEarnings: 0,
    location: "Addis Ababa",
    businessLicense: "BL-2024-002"
  },
  {
    id: 3,
    name: "Urban Transport Co.",
    email: "admin@urbantransport.com",
    phone: "+251911234569",
    role: "partner",
    status: "rejected",
    joinDate: "2024-01-12",
    lastActive: "2024-01-15",
    totalScooters: 0,
    totalEarnings: 0,
    location: "Addis Ababa",
    businessLicense: "BL-2024-003"
  },
  {
    id: 4,
    name: "City Rides Ltd",
    email: "info@cityrides.com",
    phone: "+251911234570",
    role: "partner",
    status: "approved",
    joinDate: "2024-01-08",
    lastActive: "2024-01-21",
    totalScooters: 18,
    totalEarnings: 12000,
    location: "Addis Ababa",
    businessLicense: "BL-2024-004"
  }
];

function UserPartnerTable({ data, onEdit, onDelete, onViewDetails, onSuspend, onActivate, onApprove, onReject }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "suspended": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin": return <FaCrown className="text-yellow-500" />;
      case "partner": return <FaUserTag className="text-blue-500" />;
      case "user": return <FaUsers className="text-gray-500" />;
      default: return <FaUsers className="text-gray-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      {item.role === "partner" ? <FaUserTag className="text-gray-600" /> : <FaUsers className="text-gray-600" />}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getRoleIcon(item.role)}
                  <span className="text-sm text-gray-900 capitalize">{item.role}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <div className="flex items-center gap-1">
                    <FaPhone className="text-gray-400" />
                    {item.phone}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {item.location}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.role === "user" ? (
                    <>
                      <div>Rides: {item.totalRides}</div>
                      <div>Spent: ${item.totalSpent}</div>
                    </>
                  ) : (
                    <>
                      <div>Scooters: {item.totalScooters}</div>
                      <div>Earnings: ${item.totalEarnings}</div>
                    </>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="text-green-600 hover:text-green-900 p-1"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  {item.role === "user" ? (
                    item.status === "active" ? (
                      <button
                        onClick={() => onSuspend(item.id)}
                        className="text-yellow-600 hover:text-yellow-900 p-1"
                        title="Suspend"
                      >
                        <FaBan />
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivate(item.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Activate"
                      >
                        <FaUnlock />
                      </button>
                    )
                  ) : (
                    item.status === "pending" && (
                      <>
                        <button
                          onClick={() => onApprove(item.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => onReject(item.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )
                  )}
                  <button
                    onClick={() => onDelete(item.id)}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={filters.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="partner">Partner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function AddUserPartnerModal({ isOpen, onClose, onAdd, type }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: type,
    status: type === "user" ? "active" : "pending",
    location: "Addis Ababa"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Math.floor(Math.random() * 10000),
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: "Just added",
      ...(type === "user" ? {
        totalRides: 0,
        totalSpent: 0
      } : {
        totalScooters: 0,
        totalEarnings: 0,
        businessLicense: `BL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      })
    };
    onAdd(newItem);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: type,
      status: type === "user" ? "active" : "pending",
      location: "Addis Ababa"
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New {type === "user" ? "User" : "Partner"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Add {type === "user" ? "User" : "Partner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailDrawer({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{item.role === "user" ? "User" : "Partner"} Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                {item.role === "partner" ? <FaUserTag className="text-2xl text-gray-600" /> : <FaUsers className="text-2xl text-gray-600" />}
              </div>
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{item.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.status === "active" || item.status === "approved" ? "bg-green-100 text-green-800" :
                  item.status === "suspended" || item.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Join Date:</span>
                <span className="font-medium">{new Date(item.joinDate).toLocaleDateString()}</span>
              </div>
              {item.role === "partner" && item.businessLicense && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Business License:</span>
                  <span className="font-medium">{item.businessLicense}</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Activity Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                {item.role === "user" ? (
                  <>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{item.totalRides}</p>
                      <p className="text-sm text-gray-600">Total Rides</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">${item.totalSpent}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{item.totalScooters}</p>
                      <p className="text-sm text-gray-600">Total Scooters</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">${item.totalEarnings}</p>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminUserAndPartner() {
  const [users, setUsers] = useState(mockUsers);
  const [partners, setPartners] = useState(mockPartners);
  const [filteredData, setFilteredData] = useState([...mockUsers, ...mockPartners]);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    search: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("user");

  // Filter data based on current filters
  useEffect(() => {
    let data = [...users, ...partners];

    if (filters.role) {
      data = data.filter(item => item.role === filters.role);
    }

    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.email.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredData(data);
  }, [users, partners, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddUserPartner = (newItem) => {
    if (newItem.role === "user") {
      setUsers(prev => [...prev, newItem]);
    } else {
      setPartners(prev => [...prev, newItem]);
    }
  };

  const handleEditUserPartner = (item) => {
    console.log("Edit item:", item);
  };

  const handleDeleteUserPartner = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setUsers(prev => prev.filter(item => item.id !== itemId));
      setPartners(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const handleSuspendUser = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: "suspended" } : user
    ));
  };

  const handleActivateUser = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: "active" } : user
    ));
  };

  const handleApprovePartner = (partnerId) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? { ...partner, status: "approved" } : partner
    ));
  };

  const handleRejectPartner = (partnerId) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? { ...partner, status: "rejected" } : partner
    ));
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailDrawer(true);
  };

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User & Partner Management</h1>
          <div className="flex gap-2">
            <button
              onClick={() => openAddModal("user")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaUserPlus />
              Add User
            </button>
            <button
              onClick={() => openAddModal("partner")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaUserPlus />
              Add Partner
            </button>
          </div>
        </div>

        <Filters filters={filters} onFilterChange={handleFilterChange} />

        <div className="bg-white rounded-lg shadow">
          <UserPartnerTable
            data={filteredData}
            onEdit={handleEditUserPartner}
            onDelete={handleDeleteUserPartner}
            onViewDetails={handleViewDetails}
            onSuspend={handleSuspendUser}
            onActivate={handleActivateUser}
            onApprove={handleApprovePartner}
            onReject={handleRejectPartner}
          />
        </div>

        <AddUserPartnerModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUserPartner}
          type={modalType}
        />

        <DetailDrawer
          isOpen={showDetailDrawer}
          onClose={() => setShowDetailDrawer(false)}
          item={selectedItem}
        />
      </div>
    </AdminLayout>
  );
}
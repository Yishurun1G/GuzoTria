// src/components/admin/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUsers, 
  FaBicycle, 
  FaMapMarkerAlt, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaUser,
  FaBell
} from "react-icons/fa";

function AdminSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  
  const menuItems = [
    { name: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
    { name: "Users", icon: FaUsers, path: "/admin/users" },
    { name: "Scooters", icon: FaBicycle, path: "/admin/scooters" },
    { name: "Locations", icon: FaMapMarkerAlt, path: "/admin/locations" },
    { name: "Analytics", icon: FaChartBar, path: "/admin/analytics" },
    { name: "Settings", icon: FaCog, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50
        ${isOpen ? 'w-64' : 'w-16 lg:w-64'}
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className={`flex items-center gap-3 ${!isOpen && 'lg:flex'}`}>
            <FaBicycle className="text-2xl text-blue-500" />
            <span className={`font-bold text-xl ${!isOpen && 'lg:block hidden'}`}>
              Guzo Admin
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
            >
              <item.icon className="text-lg flex-shrink-0" />
              <span className={`${!isOpen && 'lg:block hidden'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FaUser className="text-sm" />
            </div>
            <div className={`${!isOpen && 'lg:block hidden'}`}>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@guzo.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            <span className={`${!isOpen && 'lg:block hidden'}`}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;


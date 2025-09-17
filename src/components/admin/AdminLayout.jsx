// src/components/admin/AdminLayout.jsx
import { useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaBars className="text-xl" />
            </button>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell className="text-xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
import { FaBicycle, FaBell, FaCar, FaBullhorn, FaCreditCard, FaComment, FaMotorcycle, FaSearch, FaTags, FaThLarge,FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function AdminSidebar({Icon, title, to}){
  return(
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 text-lg font-medium px-5 py-3 rounded-lg cursor-pointer transition-colors duration-300 ${ isActive ? "bg-[var(--bg-tertiary)] text-white" : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <Icon /> {title}
    </NavLink>
  )
}

export default function AdminDashboard(){
  return(
    <section className="grid h-[100vh] grid-cols-[22rem_1fr] grid-rows-[auto_1fr] text-white">

      {/* SIDEBAR */}
      <div className="row-span-full border-r border-white/50">
        <div className="flex items-center gap-3 text-3xl font-bold px-12 py-6">
          <FaBicycle /> Guzo
        </div>

        <div className="flex flex-col gap-4 mt-5 px-6">
          <AdminSidebar Icon={FaThLarge} title="Dashboard" to="/admin" />
          <AdminSidebar Icon={FaBullhorn} title="Advertisement" to="/advertisement-management" />
          <AdminSidebar Icon={FaCreditCard} title="Bookings & Transactions" to="/bookings-and-transactions" />
          <AdminSidebar Icon={FaMotorcycle} title="Scooter Management" to="/scooter-management" />
          <AdminSidebar Icon={FaUsers} title="User Management" to="/user-and-partner-management" />
          <AdminSidebar Icon={FaTags} title="Discounts & Promotions" to="/discounts-and-promotions" />
        </div>
      </div>



      {/* HEADER SECTION */}
      <div className="bg-[var(--bg-tertiary)] border-b border-white/50">
        {/* SEARCH */}
        <div className="relative text-xl py-3 flex items-center justify-end gap-6 mr-10">
          <input type="text" placeholder="Search dashboard..." 
          className="px-6 py-2 bg-[#505050] rounded-lg text-xl text-white/80 placeholder:text-white/80 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />

          <button className="flex items-center justify-center p-3 hover:bg-[#505050] rounded-full transition-all duration-200">
            <FaSearch />
          </button>
          <button className="flex items-center justify-center p-3 hover:bg-[#505050] rounded-full transition-all duration-200">
            <FaComment />
          </button>
          <button className="flex items-center justify-center p-3 hover:bg-[#505050] rounded-full transition-all duration-200">
            <FaBell />
          </button>

          <div className="bg-red-500 w-12 h-12 rounded-full">

          </div>
        </div>

        
      </div>

      {/* MAIN SECTION */}
      <div className="overflow-scroll">
        <h1 className="text-4xl font-bold p-10">Guzo Admin Dashboard</h1>

        <div className="flex items-center text-2xl px-15">
          <div className="flex items-center w-[15rem] p-5 border border-white/50 rounded-lg">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Total Rides Today</p>
              <p className="font-bold text-4xl">1,892</p>
            </div>

            <div className="inline-flex items-center justify-center self-start p-2 bg-blue-100 rounded-full text-blue-700">
              <FaCar className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
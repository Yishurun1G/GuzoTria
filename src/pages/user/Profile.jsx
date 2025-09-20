import { useState } from "react";
import Navbar from "../../components/Navbar";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCamera, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaExclamationTriangle,
  FaCog
} from "react-icons/fa";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    name: "Zufan gebrehiwot",
    email: "zufan@example.com",
    phone: "0987654321",
    profilePicture: null,
    address: "addis Ababa, Ethiopia",
    dateOfBirth: "1990-05-15",
    emergencyContact: "0912345678"
  });

  // Form states
  const [personalForm, setPersonalForm] = useState(userData);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handlePersonalInfoChange = (field, value) => {
    setPersonalForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePersonalForm = () => {
    const newErrors = {};
    
    if (!personalForm.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!personalForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(personalForm.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!personalForm.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePersonalInfo = () => {
    if (validatePersonalForm()) {
      setUserData(personalForm);
      setIsEditing(false);
      setErrors({});
      setSuccessMessage("Personal information updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChangePassword = () => {
    if (validatePasswordForm()) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setShowPasswordForm(false);
      setErrors({});
      setSuccessMessage("Password changed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };


  const cancelEdit = () => {
    setPersonalForm(userData);
    setIsEditing(false);
    setErrors({});
  };

  const tabs = [
    { id: "personal", label: "Profile Settings", icon: FaUser },
    { id: "security", label: "Security", icon: FaLock }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <FaCamera className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-sm text-gray-500">Manage your profile and security settings</p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
              <FaCheck className="mr-2" />
              {successMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Profile Settings Tab */}
              {activeTab === "personal" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={cancelEdit}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <FaTimes />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSavePersonalInfo}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FaSave />
                          <span>Save</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        } ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <FaExclamationTriangle className="mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        } ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <FaExclamationTriangle className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={personalForm.phone}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        } ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <FaExclamationTriangle className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={personalForm.dateOfBirth}
                        onChange={(e) => handlePersonalInfoChange("dateOfBirth", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={personalForm.address}
                        onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        value={personalForm.emergencyContact}
                        onChange={(e) => handlePersonalInfoChange("emergencyContact", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">Change Password</h3>
                          <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordForm(!showPasswordForm)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Change Password
                        </button>
                      </div>
                      
                      {showPasswordForm && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showCurrentPassword ? "text" : "password"}
                                  value={passwordForm.currentPassword}
                                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.currentPassword ? "border-red-500" : "border-gray-300"
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <FaExclamationTriangle className="mr-1" />
                                  {errors.currentPassword}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showNewPassword ? "text" : "password"}
                                  value={passwordForm.newPassword}
                                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.newPassword ? "border-red-500" : "border-gray-300"
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <FaExclamationTriangle className="mr-1" />
                                  {errors.newPassword}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={passwordForm.confirmPassword}
                                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <FaExclamationTriangle className="mr-1" />
                                  {errors.confirmPassword}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <button
                              onClick={handleChangePassword}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Update Password
                            </button>
                            <button
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                                setErrors({});
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

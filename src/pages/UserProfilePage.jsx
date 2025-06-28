import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const UserProfilePage = () => {
  const { user, loading: authLoading, error: authError, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setProfileMessage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setProfileMessage(null);

    if (!formData.name || !formData.email) {
      setProfileMessage({ type: 'error', message: 'Please fill in all required fields.' });
      setFormLoading(false);
      return;
    }

    try {
      await updateProfile(formData);
      setProfileMessage({ type: 'success', message: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setProfileMessage({ type: 'error', message: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setFormLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-gray-600 ml-4">Loading profile...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <p className="text-lg text-red-600">error {authError}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <p className="text-lg text-gray-600">No user data found. Please login.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 main-content-area">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            {profileMessage && (
              <div className={`mb-4 px-4 py-3 rounded relative ${profileMessage.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`} role="alert">
                <span className="block sm:inline">{profileMessage.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">
              <InputField
                label="name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
              <InputField
                label="email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                required
              />
              <InputField
                label="id"
                id="userId"
                name="userId"
                type="text"
                value={user._id || 'N/A'}
                readOnly
                className="bg-gray-50 cursor-not-allowed"
              />

              <div className="flex justify-end space-x-3 mt-6">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        if (user) {
                          setFormData({ name: user.name || '', email: user.email || '' });
                        }
                        setProfileMessage(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                      disabled={formLoading}
                    >
                     Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={formLoading}
                    >
                      {formLoading ? 'Updating...' : 'Update profile'}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Edit profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;

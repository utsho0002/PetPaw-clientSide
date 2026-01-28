import React, { useContext, useState } from "react";

import { updateProfile } from "firebase/auth";
import { FaUserEdit, FaSave, FaCamera } from "react-icons/fa";
import Swal from "sweetalert2"; // Ensure you have installed: npm install sweetalert2
import { AuthContext } from "../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // 1. State for Form Data
  // We set the initial values to the current user data
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  
  // State to check if we are in "Edit Mode"
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 2. Function to Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault(); // Stop page refresh
    setLoading(true);

    try {
      // Firebase function to update user data
      await updateProfile(user, {
        displayName: name,
        photoURL: photo
      });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Refresh the page to see changes.',
        timer: 2000
      });
      
      setIsEditing(false); // Turn off edit mode
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-base-content">My Profile</h1>
            <p className="text-base-content/60">Manage your personal information</p>
        </div>
        
        {/* Toggle Edit Button */}
        <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`btn ${isEditing ? "btn-error" : "btn-primary"}`}
        >
            {isEditing ? "Cancel Editing" : <><FaUserEdit /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: PROFILE CARD --- */}
        <div className="card bg-base-100 shadow-xl border border-base-200 h-fit">
            <div className="card-body items-center text-center">
                {/* Profile Image */}
                <div className="avatar placeholder mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-32 ring ring-primary ring-offset-base-100 ring-offset-2">
                        {photo ? (
                            <img src={photo} alt="Profile" />
                        ) : (
                            <span className="text-3xl">{name[0]}</span>
                        )}
                    </div>
                </div>
                
                <h2 className="card-title text-2xl">{name}</h2>
                <p className="text-sm opacity-70">{user?.email}</p>
                <div className="badge badge-secondary mt-2">Customer</div>
                
                <div className="divider my-2"></div>
                
                {/* Quick Stats */}
                <div className="w-full flex justify-between px-4 text-sm">
                    <span>Account Status:</span>
                    <span className="text-success font-bold">Active</span>
                </div>
                <div className="w-full flex justify-between px-4 text-sm mt-2">
                    <span>Joined:</span>
                    <span className="font-bold">
                        {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                    </span>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: DETAILS FORM --- */}
        <div className="card bg-base-100 shadow-xl border border-base-200 md:col-span-2">
            <div className="card-body">
                <h2 className="card-title mb-4">Personal Details</h2>
                
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    
                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing} // Only editable if isEditing is true
                            className="input input-bordered w-full" 
                        />
                    </div>

                    {/* Email Input (Always Disabled) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email Address</span>
                        </label>
                        <input 
                            type="text" 
                            value={user?.email}
                            disabled={true} // Email cannot be changed easily
                            className="input input-bordered w-full bg-base-200" 
                        />
                        <label className="label">
                            <span className="label-text-alt text-warning">Email cannot be changed</span>
                        </label>
                    </div>

                    {/* Photo URL Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Photo URL</span>
                        </label>
                        <div className="join">
                            <div className="btn btn-square join-item cursor-default bg-base-200 border-base-300">
                                <FaCamera />
                            </div>
                            <input 
                                type="text" 
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                disabled={!isEditing}
                                placeholder="https://example.com/my-photo.jpg"
                                className="input input-bordered w-full join-item" 
                            />
                        </div>
                    </div>

                    {/* Save Button (Only shows when editing) */}
                    {isEditing && (
                        <div className="mt-6 flex justify-end">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : <><FaSave /> Save Changes</>}
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
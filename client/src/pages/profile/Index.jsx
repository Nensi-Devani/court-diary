import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import userImg from '../../assets/images/user.jpg';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.data);
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!profile) return <div className="p-4 text-center">Profile not found</div>;

  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      {/* Profile Card */}
      <div className="card card-primary card-outline text-center">
        <div className="card-body box-profile">
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src={profile.avatar || userImg}
              alt="User profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>

          <h3 className="profile-username text-center mt-2">
            {profile.name}
          </h3>

          <hr />

          <div className="text-left px-2">
            <p className="mb-2">
              <strong>Email</strong>
              <span className="float-right text-primary">
                {profile.email}
              </span>
            </p>

            <hr />

            <p className="mb-2">
              <strong>Mobile No</strong>
              <span className="float-right text-primary">
                {profile.phone || '-'}
              </span>
            </p>
          </div>

          <div className="d-flex mt-3">
            <Link to='/profile/edit' className="btn btn-primary col-md-6 mr-1">
              Edit
            </Link>
            <Link to='/profile/change-password' className="btn btn-primary col-md-6">
              Change Password
            </Link>
          </div>

        </div>
      </div>

      {/* Office Details */}
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          Office Details
        </div>

        <div className="card-body">
          {profile.office?.name && (
            <>
              <p className="mb-2">
                <i className="fas fa-building mr-2"></i>
                <strong>Office Name</strong>
              </p>
              <p className="text-muted">{profile.office.name}</p>
              <hr />
            </>
          )}

          <p className="mb-2">
            <i className="fas fa-phone-alt mr-2"></i>
            <strong>Office Contact</strong>
          </p>
          <p className="text-muted">{profile.office?.phone || '-'}</p>

          <hr />

          <p className="mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <strong>Office Address</strong>
          </p>
          <p className="text-muted">{profile.office?.address || '-'}</p>

          <hr />

          <p className="mb-2">
            <i className="fas fa-envelope mr-2"></i>
            <strong>Work Mail</strong>
          </p>
          <p className="text-muted">{profile.office?.email || '-'}</p>

        </div>
      </div>

    </div>
  )
}

export default Profile;
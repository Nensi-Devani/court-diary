import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';
import FormInput from '../../components/form/FormInput';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    status: 'upcoming'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/meetings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Since getMeetings returns a list, find the specific one
        const meeting = res.data.data.find(m => m._id === id);
        if (meeting) {
          const start = new Date(meeting.startDatetime);
          const end = new Date(meeting.endDatetime);
          
          setFormData({
            title: meeting.title,
            startDate: start.toISOString().split('T')[0],
            startTime: start.toTimeString().split(' ')[0].substring(0, 5),
            endDate: end.toISOString().split('T')[0],
            endTime: end.toTimeString().split(' ')[0].substring(0, 5),
            status: meeting.status
          });
        }
      } catch (err) {
        toast.error('Failed to load meeting details');
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      
      const startDatetime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDatetime = new Date(`${formData.endDate}T${formData.endTime}`);

      const payload = {
        title: formData.title,
        startDatetime,
        endDatetime,
        status: formData.status
      };

      await axios.put(`http://localhost:5000/api/meetings/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Meeting updated successfully');
      navigate('/meetings');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update meeting');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <Title title="Edit Meeting" breadCrumpParent="Meetings" breadCrumpParentLink="/meetings" />
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <FormInput
                label="Meeting Title"
                name="title"
                value={formData.title}
                setFormData={setFormData}
                required
              />

              <div className="form-row">
                <FormInput
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  setFormData={setFormData}
                  className="col-md-6"
                  required
                />
                <FormInput
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  setFormData={setFormData}
                  className="col-md-6"
                  required
                />
              </div>

              <div className="form-row">
                <FormInput
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  setFormData={setFormData}
                  className="col-md-6"
                  required
                />
                <FormInput
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  setFormData={setFormData}
                  className="col-md-6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select 
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary px-4">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;

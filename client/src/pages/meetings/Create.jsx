import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../../components/ui/Title';
import FormInput from '../../components/form/FormInput';

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    clientEmail: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
    status: 'upcoming'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      const startDatetime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDatetime = new Date(`${formData.endDate}T${formData.endTime}`);

      if (endDatetime < startDatetime) {
        toast.error("End time cannot be before start time");
        setLoading(false);
        return;
      }

      const payload = {
        title: formData.title,
        clientEmail: formData.clientEmail,
        startDatetime,
        endDatetime,
        description: formData.description,
        status: formData.status
      };

      await axios.post("http://localhost:5000/api/meetings", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Meeting scheduled successfully");
      navigate('/meetings');
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to schedule meeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Schedule Meeting" breadCrumpParent="Meetings" breadCrumpParentLink="/meetings" />
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <FormInput
                label="Meeting Title"
                name="title"
                value={formData.title}
                setFormData={setFormData}
                placeholder="e.g. Consultation with Jane Doe"
                required
              />

              <FormInput
                label="Client Email (for notification)"
                name="clientEmail"
                type="email"
                value={formData.clientEmail}
                setFormData={setFormData}
                placeholder="client@example.com"
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

              <FormInput
                label="Description"
                name="description"
                value={formData.description}
                setFormData={setFormData}
                as="textarea"
                rows={3}
                placeholder="Meeting notes..."
              />

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
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? 'Saving...' : 'Schedule'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;

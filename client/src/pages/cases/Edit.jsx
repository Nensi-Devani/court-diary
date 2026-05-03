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
    caseNo: '',
    title: '',
    description: '',
    status: 'Active',
    location: '',
    hearingNotes: '',
    previousHearingSummary: '',
    // Payment fields
    paymentAmount: '',
    paymentStatus: 'Pending',
    paymentDate: '',
    paymentNotes: '',
  });
  const [loading, setLoading] = useState(true);
  const [docFile, setDocFile] = useState(null);
  const [docCategory, setDocCategory] = useState('court');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [existingDocs, setExistingDocs] = useState([]);
  const [pendingDocs, setPendingDocs] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredDocs = existingDocs.filter(doc => 
    filterCategory === 'all' ? true : doc.category === filterCategory
  );
  
  useEffect(() => {
    const fetchCase = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const c = res.data.data;
        setFormData({
          caseNo: c.caseNo || '',
          title: c.title || '',
          description: c.description || '',
          status: c.status || 'Active',
          location: c.location || '',
          hearingNotes: c.hearingNotes || '',
          previousHearingSummary: c.previousHearingSummary || '',
          paymentAmount: c.paymentAmount != null ? c.paymentAmount : '',
          paymentStatus: c.paymentStatus || 'Pending',
          paymentDate: c.paymentDate ? c.paymentDate.split('T')[0] : '',
          paymentNotes: c.paymentNotes || '',
        });
        setExistingDocs(c.uploads || []);
      } catch (err) {
        toast.error('Failed to load case details');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/cases/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Case updated successfully');
      // Go back to the right cases list
      const role = localStorage.getItem('userRole');
      navigate(role === 'admin' ? '/admin/cases' : '/cases');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update case');
    }
  };

  const handleDocUpload = async (e) => {
    e.preventDefault();
    if (pendingDocs.length === 0) return toast.error('No documents to upload');
    setUploadingDoc(true);
    try {
      const token = localStorage.getItem('token');
      let latestDocs = [...existingDocs];
      
      toast.info(`Uploading ${pendingDocs.length} documents...`);
      for (const doc of pendingDocs) {
        const data = new FormData();
        data.append('file', doc.file);
        data.append('category', doc.category);

        const res = await axios.post(`http://localhost:5000/api/cases/${id}/upload`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        latestDocs = res.data.data.uploads;
      }
      
      toast.success('All documents uploaded successfully');
      setExistingDocs(latestDocs);
      setPendingDocs([]);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload documents');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDocDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to remove this document?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:5000/api/cases/${id}/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Document removed');
      setExistingDocs(res.data.data.uploads);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to remove document');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <Title title="Edit Case" breadCrumpParent="Cases" breadCrumpParentLink="/cases" />
      <div className="container">
        <form onSubmit={handleSubmit}>

          {/* Case Details Card */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Case Details</div>
            <div className="card-body">
              <div className="form-row">
                <FormInput label="Case No" name="caseNo" value={formData.caseNo} setFormData={setFormData} className="col-md-6" required />
                <div className="col-md-6 form-group">
                  <label>Status</label>
                  <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Reopened">Reopened</option>
                  </select>
                </div>
              </div>
              <FormInput label="Case Title" name="title" value={formData.title} setFormData={setFormData} required />
              <FormInput label="Location" name="location" value={formData.location} setFormData={setFormData} />
              <div className="form-row">
                <FormInput label="Hearing Notes" name="hearingNotes" value={formData.hearingNotes} setFormData={setFormData} as="textarea" rows={3} className="col-md-6" />
                <FormInput label="Previous Hearing Summary" name="previousHearingSummary" value={formData.previousHearingSummary} setFormData={setFormData} as="textarea" rows={3} className="col-md-6" />
              </div>
              <FormInput label="Case Description" name="description" value={formData.description} setFormData={setFormData} as="textarea" rows={3} />
            </div>
          </div>

          {/* Payment Details Card */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Payment Details</div>
            <div className="card-body">
              <div className="form-row">
                <div className="col-md-6 form-group">
                  <label>Payment Amount (₹)</label>
                  <input type="number" name="paymentAmount" className="form-control" value={formData.paymentAmount} onChange={handleChange} placeholder="Enter amount" min="0" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Payment Status</label>
                  <select className="form-control" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                    <option value="Waived">Waived</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 form-group">
                  <label>Payment Date</label>
                  <input type="date" name="paymentDate" className="form-control" value={formData.paymentDate} onChange={handleChange} />
                </div>
                <div className="col-md-6 form-group">
                  <label>Payment Notes</label>
                  <input type="text" name="paymentNotes" className="form-control" value={formData.paymentNotes} onChange={handleChange} placeholder="e.g. Cheque #1234, UPI" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Case Documents Card */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center">
              <span>Case Documents</span>
              <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                <small className="text-muted">Filter:</small>
                <select 
                  className="form-control form-control-sm" 
                  style={{ width: '120px' }}
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="court">Court</option>
                  <option value="evidence">Evidence</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-4 border p-2 bg-light rounded">
                <div className="col-md-12 mb-2"><small className="font-weight-bold">Select Documents to Upload:</small></div>
                <div className="col-md-5">
                  <label className="small">Select File</label>
                  <input type="file" id="docInput" className="form-control form-control-sm" onChange={(e) => setDocFile(e.target.files[0])} />
                </div>
                <div className="col-md-4">
                  <label className="small">Category</label>
                  <select className="form-control form-control-sm" value={docCategory} onChange={(e) => setDocCategory(e.target.value)}>
                    <option value="court">Court</option>
                    <option value="evidence">Evidence</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <button type="button" className="btn btn-sm btn-success w-100" onClick={() => {
                    if(!docFile) return toast.error('Select a file');
                    setPendingDocs([...pendingDocs, { file: docFile, category: docCategory }]);
                    setDocFile(null);
                    document.getElementById('docInput').value = '';
                  }}>
                    Add to List
                  </button>
                </div>

                {pendingDocs.length > 0 && (
                  <div className="col-md-12 mt-3">
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered bg-white">
                        <thead className="thead-light small">
                          <tr>
                            <th>Pending File</th>
                            <th>Category</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingDocs.map((pd, idx) => (
                            <tr key={idx}>
                              <td className="small">{pd.file.name}</td>
                              <td className="small text-capitalize">{pd.category}</td>
                              <td>
                                <button type="button" className="btn btn-xs btn-danger" onClick={() => setPendingDocs(pendingDocs.filter((_, i) => i !== idx))}>Remove</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm float-right" onClick={handleDocUpload} disabled={uploadingDoc}>
                      {uploadingDoc ? 'Uploading...' : `Upload ${pendingDocs.length} Documents`}
                    </button>
                  </div>
                )}
              </div>

              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="bg-light">
                    <tr>
                      <th>File</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.length === 0 ? (
                      <tr><td colSpan="4" className="text-center text-muted">No documents found for this category</td></tr>
                    ) : (
                      filteredDocs.map((doc, i) => (
                        <tr key={i}>
                          <td>Document {i + 1}</td>
                          <td className="text-capitalize">
                            <span className={`badge ${
                              doc.category === 'court' ? 'bg-primary' : 
                              doc.category === 'evidence' ? 'bg-danger' : 
                              'bg-warning text-dark'
                            }`}>
                              {doc.category}
                            </span>
                          </td>
                          <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                          <td>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-info mr-1">View</a>
                            <button type="button" className="btn btn-xs btn-danger" onClick={() => handleDocDelete(doc._id)}>Remove</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <button type="submit" className="btn btn-primary px-4">Update Case</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
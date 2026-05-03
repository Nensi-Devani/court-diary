import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../components/ui/Title'
import FormInput from '../../components/form/FormInput'
import ClientIndex from '../clients/Index'
import axios from 'axios'
import { toast } from 'react-toastify'

const Create = () => {
  const [formData, setFormData] = useState({
    caseNo: '',
    title: '',
    description: '',
    status: true,
    firstHearing: '',
    nextHearing: '',
    previousHearing: '',
    location: '',
    hearingNotes: '',
    previousSummary: '',
    oppositePartyName: '',
    oppositeLawyer: '',
    oppositeNotes: '',
    lawyerNotes: '',
    client: '',
    paymentAmount: 0,
    paymentStatus: 'Pending',
    paymentDate: '',
    paymentNotes: '',
  });

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [category, setCategory] = useState('court');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddDoc = () => {
    if (!currentDoc) return toast.error('Please select a file first');
    setSelectedDocs([...selectedDocs, { file: currentDoc, category }]);
    setCurrentDoc(null);
    // Reset file input
    document.getElementById('docInput').value = '';
  };

  const handleRemoveDoc = (index) => {
    setSelectedDocs(selectedDocs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Structure parties
      const parties = [];
      if (formData.oppositePartyName) {
        parties.push({ name: formData.oppositePartyName, type: 'client', notes: formData.oppositeNotes });
      }
      if (formData.oppositeLawyer) {
        parties.push({ name: formData.oppositeLawyer, type: 'lawyer', notes: formData.lawyerNotes });
      }

      const caseData = {
        ...formData,
        clientId: formData.client || undefined,
        parties,
        status: formData.status ? 'Active' : 'Inactive'
      };

      const res = await axios.post("http://localhost:5000/api/cases", caseData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const caseId = res.data.data._id;

      // Upload all selected documents
      if (selectedDocs.length > 0) {
        toast.info(`Uploading ${selectedDocs.length} documents...`);
        for (const doc of selectedDocs) {
          const fileFormData = new FormData();
          fileFormData.append('file', doc.file);
          fileFormData.append('category', doc.category);

          await axios.post(`http://localhost:5000/api/cases/${caseId}/upload`, fileFormData, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
        }
      }

      toast.success("Case created successfully with documents");
      navigate('/cases');
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title="Add Case" breadCrumpParent="Cases" breadCrumpParentLink="/cases" />

      <div className="container">
        <form onSubmit={handleSubmit}>

          {/* CASE DETAILS */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Case Details:</div>

            <div className="card-body">
              <div className="form-row">

                <FormInput
                  label="Case No"
                  name="caseNo"
                  value={formData.caseNo}
                  setFormData={setFormData}
                  className="col-md-6"
                  required
                />

                <div className="col-md-6 d-flex align-items-center justify-content-end">
                  <label className="mr-2">Status</label>
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked })
                    }
                  />
                </div>
              </div>

              <FormInput
                label="Case Title"
                name="title"
                value={formData.title}
                setFormData={setFormData}
                required
              />

              <div className="form-row">
                <FormInput
                  label="Case First Hearing"
                  name="firstHearing"
                  type="date"
                  value={formData.firstHearing}
                  setFormData={setFormData}
                  className="col-md-6"
                />

                <FormInput
                  label="Case Next Hearing"
                  name="nextHearing"
                  type="date"
                  value={formData.nextHearing}
                  setFormData={setFormData}
                  className="col-md-6"
                />
              </div>

              <div className="form-row">
                <FormInput
                  label="Previous Hearing"
                  name="previousHearing"
                  value={formData.previousHearing}
                  setFormData={setFormData}
                  className="col-md-6"
                />

                <FormInput
                  label="Location"
                  name="location"
                  value={formData.location}
                  setFormData={setFormData}
                  className="col-md-6"
                />
              </div>

              <div className="form-row">
                <FormInput
                  label="Hearing Notes"
                  name="hearingNotes"
                  value={formData.hearingNotes}
                  setFormData={setFormData}
                  as="textarea"
                  rows={3}
                  className="col-md-6"
                />

                <FormInput
                  label="Previous Hearing Summary"
                  name="previousSummary"
                  value={formData.previousSummary}
                  setFormData={setFormData}
                  as="textarea"
                  rows={3}
                  className="col-md-6"
                />
              </div>

              <FormInput
                label="Case Description"
                name="description"
                value={formData.description}
                setFormData={setFormData}
                as="textarea"
                rows={3}
              />
            </div>
          </div>

          {/* DOCUMENT SECTION */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Case Documents:</div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-5">
                  <label>Select Document</label>
                  <input 
                    type="file" 
                    id="docInput"
                    className="form-control" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setCurrentDoc(e.target.files[0])}
                  />
                </div>
                <div className="col-md-4">
                  <label>Category</label>
                  <select 
                    className="form-control" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="court">Court</option>
                    <option value="evidence">Evidence</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <button type="button" className="btn btn-success w-100" onClick={handleAddDoc}>
                    Add Document
                  </button>
                </div>
              </div>

              {selectedDocs.length > 0 && (
                <div className="table-responsive mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="font-weight-bold text-muted">Pending Uploads:</small>
                    <div className="d-flex align-items-center" style={{ gap: '5px' }}>
                      <small className="text-muted">Filter:</small>
                      <select 
                        className="form-control form-control-sm" 
                        style={{ width: '100px' }}
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
                  <table className="table table-sm table-bordered">
                    <thead className="bg-light text-xs">
                      <tr>
                        <th>File Name</th>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDocs
                        .filter(doc => filterCategory === 'all' ? true : doc.category === filterCategory)
                        .map((doc, index) => (
                        <tr key={index}>
                          <td className="small text-truncate" style={{ maxWidth: '200px' }}>{doc.file.name}</td>
                          <td className="text-capitalize small">
                            <span className={`badge ${
                              doc.category === 'court' ? 'bg-primary' : 
                              doc.category === 'evidence' ? 'bg-danger' : 
                              'bg-warning text-dark'
                            }`}>
                              {doc.category}
                            </span>
                          </td>
                          <td>
                            <button type="button" className="btn btn-xs btn-danger" onClick={() => handleRemoveDoc(index)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                      {selectedDocs.filter(doc => filterCategory === 'all' ? true : doc.category === filterCategory).length === 0 && (
                        <tr><td colSpan="3" className="text-center text-muted small">No documents found for this category</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* OPPOSITE PARTY */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Opposite Party Details:</div>

            <div className="card-body">
              <div className="form-row">
                <FormInput
                  label="Opposite Party Name"
                  name="oppositePartyName"
                  value={formData.oppositePartyName}
                  setFormData={setFormData}
                  className="col-md-6"
                />

                <FormInput
                  label="Opposite Party's Lawyer Name"
                  name="oppositeLawyer"
                  value={formData.oppositeLawyer}
                  setFormData={setFormData}
                  className="col-md-6"
                />
              </div>

              <div className="form-row">
                <FormInput
                  label="Other Notes (Opp. Party)"
                  name="oppositeNotes"
                  value={formData.oppositeNotes}
                  setFormData={setFormData}
                  as="textarea"
                  rows={3}
                  className="col-md-6"
                />

                <FormInput
                  label="Other Notes (Lawyer)"
                  name="lawyerNotes"
                  value={formData.lawyerNotes}
                  setFormData={setFormData}
                  as="textarea"
                  rows={3}
                  className="col-md-6"
                />
              </div>
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Payment Details:</div>

            <div className="card-body">
              <div className="form-row">
                <FormInput
                  label="Amount"
                  name="paymentAmount"
                  type="number"
                  value={formData.paymentAmount}
                  setFormData={setFormData}
                  className="col-md-4"
                />

                <div className="form-group col-md-4">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                    <option value="Waived">Waived</option>
                  </select>
                </div>

                <FormInput
                  label="Payment Date"
                  name="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  setFormData={setFormData}
                  className="col-md-4"
                />
              </div>
              <div className="form-row">
                <FormInput
                  label="Payment Notes"
                  name="paymentNotes"
                  value={formData.paymentNotes}
                  setFormData={setFormData}
                  as="textarea"
                  rows={2}
                  className="col-md-12"
                />
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header font-weight-bold">Client Details:</div>

            <div className="card-body">
                <button
                    type="button"
                    className="btn btn-success mb-2"
                    onClick={() => setShowClientModal(true)}
                >
                    Choose Client
                </button>
                {formData.client && <span className="ml-3 font-weight-bold text-success">Client Selected!</span>}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="text-center mb-4">
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? 'Creating Case...' : 'Add Case'}
            </button>
          </div>

        </form>
      </div>

      {/* MODAL */}
      {showClientModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Client</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowClientModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ClientIndex
                  onSelect={(client) => {
                    setFormData({ ...formData, client: client._id });
                    setShowClientModal(false);
                  }}
                  isModal={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Create;
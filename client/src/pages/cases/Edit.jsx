// pages/cases/Edit.jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../../components/ui/Title'
import FormInput from '../../components/form/FormInput'
import ClientIndex from '../clients/Index'

const Edit = () => {
  const { id } = useParams();

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
  });

  const [showClientModal, setShowClientModal] = useState(false);

  // DEMO DATA LOAD
  useEffect(() => {
    const demoData = {
      caseNo: 'CASE-101',
      title: 'Property Dispute Case',
      description: 'Dispute regarding land ownership',
      status: true,
      firstHearing: '2025-01-10',
      nextHearing: '2025-04-15',
      previousHearing: '2025-02-20',
      location: 'Rajkot Court',
      hearingNotes: 'Client present, next date given',
      previousSummary: 'Initial arguments completed',
      oppositePartyName: 'Amit Patel',
      oppositeLawyer: 'Mr. Shah',
      oppositeNotes: 'Strong opposition',
      lawyerNotes: 'Prepare documents',
      client: '1',
    };

    setFormData(demoData);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Case Data:', formData);
  };

  return (
    <>
      <Title
        title={`Edit Case`}
        breadCrumpParent="Cases"
        breadCrumpParentLink="/cases"
      />

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

          {/* CLIENT */}
          <div className="card mb-3">
            <div className="card-header font-weight-bold">Client Details:</div>

            <div className="card-body">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setShowClientModal(true)}
              >
                Change Client
              </button>
            </div>
          </div>

          {/* submit */}
          <div className="text-center mb-4">
            <button type="submit" className="btn btn-primary px-4">
              Update
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
  )
}

export default Edit
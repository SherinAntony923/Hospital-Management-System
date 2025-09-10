import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';

const PrescribeMedicines = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [prescriptions, setPrescriptions] = useState([{ medicine: '', quantity: 1, notes: '' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient and medicine list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientRes, medsRes] = await Promise.all([
          axios.get(`/patients/${patientId}/`),
          axios.get('/medicines/')
        ]);
        setPatient(patientRes.data);
        setMedicines(medsRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patientId]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index][field] = value;
    setPrescriptions(newPrescriptions);
  };

  // Add new medicine field
  const addMedicineField = () => {
    setPrescriptions([...prescriptions, { medicine: '', quantity: 1, notes: '' }]);
  };

  // Remove a medicine field
  const removeMedicineField = (index) => {
    const newPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(newPrescriptions);
  };

  // Submit all medicines
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const pres of prescriptions) {
        if (!pres.medicine) continue;
        await axios.post('/doctor/prescriptions/', {
          patient: patientId,
          medicine: pres.medicine,
          quantity: pres.quantity,
          notes: pres.notes
        });
      }
      alert('All medicines prescribed successfully!');
      setPrescriptions([{ medicine: '', quantity: 1, notes: '' }]);
    } catch (err) {
      console.error(err);
      alert('Failed to prescribe medicines');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Prescribing for: {patient.username}</h2>
      <p>Email: {patient.email}</p>

      <form onSubmit={handleSubmit}>
        {prescriptions.map((pres, index) => (
          <div key={index} className="mb-3 border p-3">
            <label>Medicine:</label>
            <select
              className="form-control mb-2"
              value={pres.medicine}
              onChange={e => handleChange(index, 'medicine', e.target.value)}
              required
            >
              <option value="">Select medicine</option>
              {medicines.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>

            <label>Quantity:</label>
            <input
              type="number"
              className="form-control mb-2"
              value={pres.quantity}
              min={1}
              onChange={e => handleChange(index, 'quantity', e.target.value)}
              required
            />

            <label>Notes:</label>
            <textarea
              className="form-control mb-2"
              value={pres.notes}
              onChange={e => handleChange(index, 'notes', e.target.value)}
            />

            {prescriptions.length > 1 && (
              <button type="button" className="btn btn-danger mt-2" onClick={() => removeMedicineField(index)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={addMedicineField}>
          Add Another Medicine
        </button>
        <br />
        <button type="submit" className="btn btn-primary mt-3">
          Prescribe All Medicines
        </button>
      </form>
    </div>
  );
};

export default PrescribeMedicines;

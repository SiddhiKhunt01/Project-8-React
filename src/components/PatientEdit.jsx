import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import PatientView from './PatientView';
import { useNavigate } from 'react-router-dom';
import PatientAdd from './PatientAdd';
import { FaEdit, FaUsers } from "react-icons/fa";
import { FaUserPlus, FaUsersViewfinder } from "react-icons/fa6";

const PatientEdit = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({});
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
        setPatients(savedPatients);
        setLoading(false); 
      }, 2000);
  

      return () => clearTimeout(timeout);
    }, []);

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);
  }, []);


  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData(patient);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);


  const handleDelete = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

const [errors, setErrors] = useState({});


const validate = () => {
  const newErrors = {};
  if (!formData.name.trim()) newErrors.name = 'Name is required';
  if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be greater than 0';
  if (!formData.gender) newErrors.gender = 'Gender is required';
  if (!formData.dob) newErrors.dob = 'Date of Birth is required';
  if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
  if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = 'Phone number must be 10 digits';
  if (!formData.address.trim()) newErrors.address = 'Address is required';
  if (!formData.disease.trim()) newErrors.disease = 'Disease is required';
  if (!formData.admissionDate) newErrors.admissionDate = 'Admission Date is required';
  if (formData.assignedDoctors.length === 0) newErrors.assignedDoctors = 'At least one doctor must be assigned';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSave = () => {
  if (validate()) {
    const updatedPatients = patients.map((p) =>
      p.id === selectedPatient.id ? { ...formData } : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setShowModal(false);
  }
};

const navigate = useNavigate();
const handleView = () => {
navigate('/');    
};
const handleAdd = () => {
navigate('/add');    
};

  return (
    <div>
       <div className='header'>
       <div className='title'>
      <h4 className='text-light'>Siddhi hospital</h4> 
    </div>

    <button className="one-btn" onClick={handleView} element={<PatientView />}><span ><p><FaUsersViewfinder /></p>View Patients</span></button>
    
    <button className="two-btn" onClick={handleAdd} element={<PatientAdd />}><span ><p><FaEdit /></p>Add Patient</span></button>
  </div> 
      <h3 style={{fontFamily:"Kanit, sans-serif"}} className='text-info'>Edit Patients-Data</h3>
      <div className='list bg-info'>
            <div className='list-bar'>#</div>
            <div className='list-bar'>Name</div>
            <div className='list-bar'>Age</div>
            <div className='list-bar'>Phone</div>
            <div className='list-bar'>Disease</div>
            <div className='list-bar'>Admission Date</div>
            <div className='list-bar'>Assigned Doctors</div>
            <div className='list-bar'>Action</div>
            </div>
        
        {
        patients.length > 0 ? (
            patients.map((patient, index) => (
              <div className='list l-data' key={patient.id}>
                <div className='list-bar list-data'>{index + 1}</div>
                <div className='list-bar lis-data'>{patient.name}</div>
                <div className='list-bar lis-data'>{patient.age}</div>
                <div className='list-bar lis-data'>{patient.phone}</div>
                <div className='list-bar lis-data'>{patient.disease}</div>
                <div className='list-bar lis-data'>{patient.admissionDate}</div>
                <div className='list-bar lis-data'>{patient.assignedDoctors}</div>
                <div className='list-bar lis-data'>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(patient)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div colSpan="7" className="text-center">
                No Patients Found
              </div>
            </div>
          )}
       
     

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData && (
            <Form>
              <div className='form-input-edit'>
                {/* Name */}
              <Form.Group className="input-data input-name mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Age */}
              <Form.Group className="input-data input-age mb-4">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  isInvalid={!!errors.age}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.age}
                </Form.Control.Feedback>
              </Form.Group>
              </div>

              <div className='form-input-edit'>
                {/* Gender */}
              <Form.Group className="input-data input-gender mb-4">
                <Form.Label>Gender</Form.Label>
                <div>
                  <Form.Check
                    
                    label="Male"
                    type="radio"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    isInvalid={!!errors.gender}
                  />
                  <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
                  <Form.Check
                    inline
                    label="Female"
                    type="radio"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    isInvalid={!!errors.gender}
                  />
                  <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
                </div>
              </Form.Group>
              
              {/* Blood Group */}
              <Form.Group className="input-data input-blood mb-4">
                <Form.Label>Blood Group</Form.Label>
                <div>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(
                    (group) => (
                      <Form.Check
                        inline
                        key={group}
                        label={group}
                        type="radio"
                        value={group}
                        checked={formData.bloodGroup === group}
                        onChange={(e) =>
                          setFormData({ ...formData, bloodGroup: e.target.value })
                        }
                        isInvalid={!!errors.bloodGroup}
                      />
                    )
                  )}
                      <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup}
                      </Form.Control.Feedback>

                </div>
              </Form.Group>
              </div>

              <div className='form-input-edit'>
                {/* Date of Birth */}
              <Form.Group className="input-data input-dob mb-4">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.dob || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  isInvalid={!!errors.dob}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
            
              {/* Phone */}
              <Form.Group className="input-data input-phone mb-4">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              </div>

              {/* Address */}
              <Form.Group className="input-data input-address mb-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.address || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <div className='form-input-edit'>
                {/* Disease */}
              <Form.Group className="input-data input-disease mb-4">
                <Form.Label>Disease</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.disease || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, disease: e.target.value })
                  }
                  isInvalid={!!errors.disease}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.disease}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Admission Date */}
              <Form.Group className="input-data input-admission mb-4">
                <Form.Label>Admission Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.admissionDate || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, admissionDate: e.target.value })
                  }
                  isInvalid={!!errors.admissionDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.admissionDate}
                </Form.Control.Feedback>
              </Form.Group>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientEdit;
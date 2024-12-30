import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import PatientView from './PatientView';
import PatientEdit from './PatientEdit';
import { FaEdit } from "react-icons/fa";
import { FaUsersViewfinder } from 'react-icons/fa6';

const PatientAdd = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
          setPatients(savedPatients);
          setLoading(false); 
        }, 2000);
    
        return () => clearTimeout(timeout);
      }, []);


  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    phone: '',
    address: '',
    disease: '',
    admissionDate: '',
    assignedDoctors: [],
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const doctors = ['Dr. Rajesh', 'Dr. Anjali', 'Dr. Vivek', 'Dr. Amit', 'Dr. Arjun'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const patients = JSON.parse(localStorage.getItem('patients')) || [];
      const newPatient = { id: Date.now(), ...formData };
      localStorage.setItem('patients', JSON.stringify([...patients, newPatient]));
      setSubmitted(true);
      setTimeout(() => navigate('/'), 500);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const assignedDoctors = checked
        ? [...prevData.assignedDoctors, value]
        : prevData.assignedDoctors.filter((doctor) => doctor !== value);
      return { ...prevData, assignedDoctors };
    });
  };

      const handleView = () => {
      navigate('/');    
      };
      const handleEdit = () => {
      navigate('/edit');    
      };

  return (
    <div className="patient-form">
        <div class='header'>
        <div class='title'>
      <h4 className='text-light'>Siddhi hospital</h4> 
    </div>
    <button className="one-btn" onClick={handleView}  element={<PatientView />}><span ><p><FaUsersViewfinder /></p>View Patients</span></button>
    <button className="two-btn" onClick={handleEdit}  element={<PatientEdit />}><span ><p><FaEdit /></p>Edit Patient</span></button>
  </div>
      <h2 className="add-title text-info">Add Patient-Data</h2>
    
      <Form className='form-container' onSubmit={handleSubmit} noValidate>
        <div className='form-input-edit'>
          {/* Name */}
        <Form.Group className="input-data input-name mb-4">
          <Form.Label className='text-info'>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group className="input-data input-age mb-4">
          <Form.Label className='text-info'>Age</Form.Label>
          <Form.Control
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
        </Form.Group>
        </div>

        <div className='form-input-edit'>
          {/* Gender */}
        <Form.Group className="input-data input-gender mb-3">
          <Form.Label className='text-info'>Gender</Form.Label>
          <div>
            <Form.Check
              
              label="Male"
              type="radio"
              value="Male"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              value="Female"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            <Form.Check
              inline
              label="Other"
              type="radio"
              value="Other"
              name="gender"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </Form.Group>
        {/* Blood Group */}
        <Form.Group className="input-data input-blood-group mb-3">
          <Form.Label className='text-info'>Blood Group</Form.Label>
          <div>
            {['A-', 'A+', 'B-','B+', 'O+', 'O-', 'AB-', 'AB+'].map((group) => (
              <Form.Check
                inline
                key={group}
                label={group}
                type="radio"
                value={group}
                name="bloodGroup"
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              />
            ))}
          </div>
          {errors.bloodGroup && <div className="text-danger">{errors.bloodGroup}</div>}
        </Form.Group>
        </div>

        <div className='form-input-edit'>
          {/* Date of Birth */}
        <Form.Group className="input-data input-dob mb-3">
          <Form.Label className='text-info'>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            isInvalid={!!errors.dob}
          />
          <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
        </Form.Group>


        {/* Phone Number */}
        <Form.Group className="input-data input-phone mb-3">
          <Form.Label className='text-info'>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>
        </div>

        {/* Address */}
        <Form.Group className="mb-3">
          <Form.Label className='text-info'>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <div className='form-input-edit'>
          {/* Disease */}
        <Form.Group className="input-data input-disease mb-3">
          <Form.Label className='text-info'>Disease</Form.Label>
          <Form.Control
            type="text"
            value={formData.disease}
            onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
            isInvalid={!!errors.disease}
          />
          <Form.Control.Feedback type="invalid">{errors.disease}</Form.Control.Feedback>
        </Form.Group>

        {/* Admission Date */}
        <Form.Group className="input-data input-admission-date mb-3">
          <Form.Label className='text-info'>Admission Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.admissionDate}
            onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
            isInvalid={!!errors.admissionDate}
          />
          <Form.Control.Feedback type="invalid">{errors.admissionDate}</Form.Control.Feedback>
        </Form.Group>
        </div>

        {/* Assigned Doctor */}
        <Form.Group className="mb-5">
          <Form.Label className='text-info'>Assigned Doctor</Form.Label>
          <div className='d-flex'>
          {doctors.map((doctor) => (
              <div className='me-5'>
                <Form.Check className='doctor-checkbox'
              key={doctor}
              label={doctor}
              type="checkbox"
              value={doctor}
              onChange={handleCheckboxChange}
            />
              </div>
          ))}
          </div>
          {errors.assignedDoctors && <div className="text-danger">{errors.assignedDoctors}</div>}
        </Form.Group>

        <Button type="submit" className='btn btn-info' >Add Patient</Button>
      </Form>
    </div>
  );
};

export default PatientAdd;
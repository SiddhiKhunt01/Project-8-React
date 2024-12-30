import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientAdd from './PatientAdd';
import PatientEdit from './PatientEdit';
import { FaUserPlus, FaUsersViewfinder } from "react-icons/fa6";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import './PatientView.css';

const PatientView = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
      setPatients(savedPatients);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const filteredPatients = patients.filter((patient) => {
    return Object.values(patient).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const fieldA = a[sortField]?.toString().toLowerCase();
    const fieldB = b[sortField]?.toString().toLowerCase();
    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/add');
  };
  const handleEdit = () => {
    navigate('/edit');
  };

  return (
    <div className="patient-view">
      <div className="header">
      <div className="title">
          <h4 className='text-light'>Siddhi Hospital</h4>
        </div>

        <button className="btn add-btn" onClick={handleAdd}>
          <FaUsersViewfinder />
          <span>Add Patient</span>
        </button>
        
        <button className="btn edit-btn" onClick={handleEdit}>
          <FaEdit />
          <span>Edit Patient</span>
        </button>
      </div>
      <div className="view-header">
        <Dropdown className="filter-dropdown">
          <Dropdown.Toggle id="dropdown-sort">
            <FaFilter />
            <span>Filter</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Ascending</Dropdown.Header>
            {["name", "age", "bloodGroup", "admissionDate"].map((field) => (
              <Dropdown.Item key={field} onClick={() => handleSortChange(field, "asc")}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Header>Descending</Dropdown.Header>
            {["name", "age", "bloodGroup", "admissionDate"].map((field) => (
              <Dropdown.Item key={field} onClick={() => handleSortChange(field, "desc")}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <h3 className="list-title">Patient List</h3>
        <Form.Control
          className="search-box"
          type="text"
          placeholder="Search by any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <div className="card-container">
          {sortedPatients.map((patient) => (
            <div
              className="view-card"
              onClick={() => handleView(patient)}
              key={patient.id}
              title="View Details"
            >
              <div className="card-data"><span>Patient ID:</span> {patient.id}</div>
              <div className="card-data"><span>Name:</span> {patient.name}</div>
              <div className="card-data"><span>Age:</span> {patient.age}</div>
              <div className="card-data"><span>Phone:</span> {patient.phone}</div>
              <div className="card-data"><span>Disease:</span> {patient.disease}</div>
              <div className="card-data"><span>Admission Date:</span> {patient.admissionDate}</div>
              <div className="card-data"><span>Doctors:</span> {patient.assignedDoctors}</div>
            </div>
          ))}
        </div>
      {sortedPatients.length === 0 && !loading && (
        <div className="no-patients">
          <p>No DATA Found!!</p>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <div className="patient-details">
              <p><span>Name:</span> {selectedPatient.name}</p>
              <p><span>Age:</span> {selectedPatient.age}</p>
              <p><span>Gender:</span> {selectedPatient.gender}</p>
              <p><span>DOB:</span> {selectedPatient.dob}</p>
              <p><span>Blood Group:</span> {selectedPatient.bloodGroup}</p>
              <p><span>Phone:</span> {selectedPatient.phone}</p>
              <p><span>Address:</span> {selectedPatient.address}</p>
              <p><span>Disease:</span> {selectedPatient.disease}</p>
              <p><span>Admission Date:</span> {selectedPatient.admissionDate}</p>
              <p><span>Doctors:</span> {selectedPatient.assignedDoctors.join(', ')}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientView;

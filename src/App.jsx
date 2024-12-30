import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientView from './components/PatientView';
import PatientAdd from './components/PatientAdd';
import PatientEdit from './components/PatientEdit';

const App = () => {
  return (
    <>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<PatientView />} />
          <Route path="/add" element={<PatientAdd />} />
          <Route path="/edit" element={<PatientEdit />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

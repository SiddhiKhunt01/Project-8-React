import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientAdd from './PatientAdd';
import PatientEdit from './PatientEdit';

const Header = () => {
    const navigate = useNavigate();
    const handleAdd = () => {
    navigate('/add');    
    };
    const handleEdit = () => {
    navigate('/edit');    
    };

  return (
    <>
    <div class='header'>
    <button className="logout-btn" onClick={handleAdd} element={<PatientAdd />}><span className="text-underline"><img src="../img/exit.png" alt=""/>Logout</span></button>
    <div class='title'>
      <h4>The Minimalist</h4> 
    </div>
    <button className="cart-btn" onClick={handleEdit} element={<PatientEdit />}><span className="text-underline"><img src="../img/shopping-cart (1).png" alt=""/>cart</span></button>
  </div>
  </>
  );
};

export default Header;
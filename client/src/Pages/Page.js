import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './PagesCss/Pages.css';

function Page() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    navigate("/Dashboard");
  };

  return (
    <div className='page-login'>
      <div className='login-img'>
        <div className='login-logo'>
          <Link to="/"><img src={require('../Assets/img/physioApp 3 (1).png')} alt="icône" /></Link>
          <Link className='link-home' to="/"><h1>PhysioApp</h1></Link>
        </div>
        <div className='img-login'></div>
      </div>
      <div className='login-form'>
        <div className='form-page'>
          <h1>PhysioApp</h1>
          <p>the inclusion of technical staff and supervisors adds depth to the user experience by providing support and guidance to the user's management decisions</p>
          <div className='btns-category'>
            <button className={selectedButton === 'Suppervisor' ? 'btn-supervisor selected' : 'btn-supervisor'} onClick={() => handleButtonClick('Suppervisor')}>Suppervisor</button>
            <button className={selectedButton === 'Technical staff' ? 'btn-tech selected' : 'btn-tech'} onClick={() => handleButtonClick('Technical staff')}>Technical staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../component css/Profile.css';

function Profile({ playerId }) {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get(`http://localhost:5000/api/player/${playerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPlayer(response.data);
            } catch (error) {
                console.error('Error fetching player:', error);
            }
        };

        if (playerId) {
            fetchPlayer();
        }
    }, [playerId]);

    if (!player) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-player'>
            <div className='nav-profile'>
                <img src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
                <div className='birth-name'>
                    <h1>{player.firstname} {player.lastname}</h1>
                    <p>{player.date}</p>
                </div>
                <span className="menu-icon">&#8942;</span>
            </div>

            <div className='profile-detaille'>
                <div className='profile-section1'>
                    <h1>Email</h1>
                    <p>{player.email}</p>
                    <h1>Phone number</h1>
                    <p>{player.phoneNumber}</p>
                    <h1>ID</h1>
                    <p>{player.idNumber}</p>
                    <h1>BMI</h1>
                    <p>{player.bmi}</p>
                </div>
        <div className='profile-section2'>
          <h1>Positon</h1>
          <p>{player.position}</p>
          <h1>Height</h1>
          <p>{player.height}</p>
          <h1>Weight</h1>
          <p>{player.weight}</p>
        </div>
        <div className='img-stad'>
        <img className='stad-profile ' src={require('../../Assets/img/Football_field 1.png')} alt="Mon icône" />
        {player.position === 'Goalkeeper' && (
        <img className='img-position position2' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        )}
        {player.position === 'Forward' && (
        <img className='img-position position3' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        )}
        
        <img className='img-position position4' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position5' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position6' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position7' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position8' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position9' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position10' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />
        <img className='img-position position11' src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&usqp=CAU'} alt="Player's photo" />       
        </div>
      </div>
    </div>

  )
}

export default Profile
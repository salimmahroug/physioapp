import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../PagesCss/AddPlayer.css'
import { importUserData } from '../../API/Api';

function AddPlayerForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    date: '',
    category: '',
    position: '',
    height: '',
    weight: '',
    phoneNumber: '',
    idNumber: '',
    Urlimage: ''
  });
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserClubType = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
  
        const response = await importUserData({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const userClubType = response.data.clubType;
        if (!userClubType) { 
          console.error('Club type not found for the user.');
          return;
        }
        const clubTypePositions = {
          'football': ["Goal keeper", "Full back", "Centre back", "Mid-fielder", "Winger", "striker", "Player-maker",],
          'basketball': ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
          'handball': ["Goalkeeper", "Left Wing", "Left Back", "Pivot", "Right Back", "Right Wing"],
          'baseball': ["Pitcher", "Catcher", "First Base", "Second Base", "Third Base", "Shortstop", "Left Field", "Center Field", "Right Field"],
          'volleyball': ["Setter", "Outside Hitter", "Middle Blocker", "Libero", "Opposite"],
          'rugby': ["Prop", "Hooker", "Lock", "Flanker", "Number Eight", "Scrum-Half", "Fly-Half", "Center", "Wing", "Full-Back"],
          'tennis': ["Singles", "Doubles"],
          
          'golf': ["Player"],
          'swimming': ["Freestyle", "Backstroke", "Breaststroke", "Butterfly"],
          'cricket': ["Batsman", "Bowler", "Wicketkeeper", "All-Rounder"],
          'hockey': ["Forward", "Defenseman", "Goaltender"],
          'athletics': ["Sprinter", "Middle Distance", "Long Distance", "Jumper", "Thrower", "Hurdler"],
          'cycling': ["Sprinter", "Climber", "Time-Trialist", "Domestique"],
          'gymnastics': ["Artistic", "Rhythmic", "Trampoline"],
          'eSports': ["DPS", "Tank", "Support", "In-Game Leader"],
          'badminton': ["Singles", "Doubles", "Mixed Doubles"],
          'tableTennis': ["Singles", "Doubles"],
          'archery': ["Recurve", "Compound", "Longbow"],
          'boxing': ["Flyweight", "Featherweight", "Lightweight", "Welterweight", "Middleweight", "Heavyweight"],
          'wrestling': ["Freestyle", "Greco-Roman"],
          'karate': ["Kata", "Kumite"],
          'sailing': ["Skipper", "Crew"],
          'skiing': ["Alpine", "Nordic", "Freestyle"],
          'fencing': ["Épée", "Foil", "Sabre"]
        };
        if (clubTypePositions[userClubType]) {
          setPositions(clubTypePositions[userClubType]);
        } else {
          console.error('Positions not found for userClubType:', userClubType);
        }
      } catch (error) {
        console.error('Error fetching user club type:', error);
      }
    };
  
    fetchUserClubType();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post('http://127.0.0.1:5000/api/player', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Player added:', response.data);

      // Utilisation de la fonction navigate pour naviguer vers la page du tableau de bord du superviseur
      navigate('/page');

    } catch (error) {
      console.error('Error adding player:', error);
      console.log('Error details:', error.response.data);
      console.log('Status code:', error.response.status);
    }
  };

  return (
    <div className='add-player-container'>
      <h2 className='Recent'>Recent Transactions</h2>
      <form className='Rcenct-players'>
        <h2>Recent players</h2>
        <div className='line-blue'></div>
      </form>
      <form onSubmit={handleSubmit} >

        <div className='inputs-addplayer'>
          <div className='inputs-section1'>
            <div>
              <h2>name</h2>
              <input className='inputs-type1' type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
            </div>
            <div>
              <h2>surname</h2>
              <input className='inputs-type1' type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
            </div>
            <div>
              <h2>Email</h2>
              <input className='inputs-type2' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <h2>Birth date</h2>
              <input className='inputs-type2' type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <h2>Height</h2>
              <input className='inputs-type1' type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
            </div>
            <div>
              <h2>Weight</h2>
              <input className='inputs-type1' type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
            </div>
          </div>
          <div className='inputs-section2'>
            <h2>CIN</h2>
            <input className='inputs-type2' type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} />
            <h2>Phone</h2>
            <input className='inputs-type2' type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            <h2>position</h2>
            <select
              className='inputs-type2 select-inp'
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="">Position</option>
              {positions.map((position, index) => (
                <option key={index} value={position}>{position}</option>
              ))}
            </select>
            <h2>category</h2>
            <select
              className='inputs-type2 select-inp'
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="First team">First team</option>
              <option value="Olympic team">Olympic team</option>
              <option value="U19">U19</option>
              <option value="U17">U17</option>
              <option value="U15">U15</option>
              <option value="U13">U13</option>
              <option value="Academy team">Academy team</option>
            </select>
          </div>
        </div>
        <button className='btn-saveplayer' type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default AddPlayerForm;

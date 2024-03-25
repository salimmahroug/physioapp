import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../PagesCss/Overview.css';
import axios from 'axios';

function Overview() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, []);
    const fetchPlayers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await axios.get(`http://localhost:5000/api/player`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const deletePlayer = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            await axios.delete(`http://localhost:5000/api/player/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlayers(players.filter(player => player._id !== id));
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        const menu = document.getElementById(`menu-${id}`);
        const isOpen = menu.classList.contains('show');

        // Fermer tous les menus ouverts
        const menus = document.querySelectorAll('.menu-options.show');
        menus.forEach((menu) => {
            menu.classList.remove('show');
        });

        // Ouvrir le menu cible si ce n'est pas déjà ouvert
        if (!isOpen) {
            menu.classList.add('show');
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menus = document.querySelectorAll('.menu-options.show');
            menus.forEach((menu) => {
                if (!menu.contains(event.target)) {
                    menu.classList.remove('show');
                }
            });
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='Overview'>
            <h2 className='Overview-tiltle'>Overview</h2>
            <div className='dash-courb'>
                <div className='courb'></div>
                <div className='courb-notification'></div>
            </div>
            <h2 className='Recent'>Recent Transactions</h2>
            <div className='Rcenct-players'>
                <h2>Recent players</h2>
                <div className='line-blue'></div>
            </div>
            <ul className="player-list">
                {players.map((player, index) => (
                    <React.Fragment key={player._id}>
                        <li>
                            <img className="player-image" src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPC7ikoXgW66ZFb0JFMRADmdD8hxYbgk2N5g&usqp=CAU'} alt="" />
                            <div className='name-player'>
                                <h2 className='player-name'>Player name</h2>
                                <h5>{player.firstname} {player.lastname}</h5>
                            </div>
                            <div className='player-category'>
                                <h2>Category</h2>
                                <h5>{player.category}</h5>
                            </div>
                            <button className='player-Details'>View Details</button>
                            <span className="menu-icon" onClick={(e) => toggleMenu(e, player._id)}>&#8942;</span>
                            <div id={`menu-${player._id}`} className="menu-options">
                                <Link className='link-edit' to={`/edit-player/${player._id}`}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 15.5V11.9583L11.5 0.979167C11.6667 0.826389 11.8508 0.708333 12.0525 0.625C12.2542 0.541667 12.4658 0.5 12.6875 0.5C12.9097 0.5 13.125 0.541667 13.3333 0.625C13.5417 0.708333 13.7222 0.833333 13.875 1L15.0208 2.16667C15.1875 2.31944 15.3092 2.5 15.3858 2.70833C15.4625 2.91667 15.5006 3.125 15.5 3.33333C15.5 3.55556 15.4619 3.7675 15.3858 3.96917C15.3097 4.17083 15.1881 4.35472 15.0208 4.52083L4.04167 15.5H0.5ZM12.6667 4.5L13.8333 3.33333L12.6667 2.16667L11.5 3.33333L12.6667 4.5Z" fill="#464646" />
                                </svg>
                                    Edit</Link>
                                <button onClick={() => deletePlayer(player._id)}><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1C1.23478 1 0.98043 1.10536 0.792893 1.29289C0.605357 1.48043 0.5 1.73478 0.5 2V3C0.5 3.26522 0.605357 3.51957 0.792893 3.70711C0.98043 3.89464 1.23478 4 1.5 4H2V13C2 13.5304 2.21071 14.0391 2.58579 14.4142C2.96086 14.7893 3.46957 15 4 15H10C10.5304 15 11.0391 14.7893 11.4142 14.4142C11.7893 14.0391 12 13.5304 12 13V4H12.5C12.7652 4 13.0196 3.89464 13.2071 3.70711C13.3946 3.51957 13.5 3.26522 13.5 3V2C13.5 1.73478 13.3946 1.48043 13.2071 1.29289C13.0196 1.10536 12.7652 1 12.5 1H9C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0L6 0C5.73478 0 5.48043 0.105357 5.29289 0.292893C5.10536 0.48043 5 0.734784 5 1H1.5ZM4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5V12.5C5 12.6326 4.94732 12.7598 4.85355 12.8536C4.75979 12.9473 4.63261 13 4.5 13C4.36739 13 4.24021 12.9473 4.14645 12.8536C4.05268 12.7598 4 12.6326 4 12.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5ZM7 5C7.13261 5 7.25979 5.05268 7.35355 5.14645C7.44732 5.24021 7.5 5.36739 7.5 5.5V12.5C7.5 12.6326 7.44732 12.7598 7.35355 12.8536C7.25979 12.9473 7.13261 13 7 13C6.86739 13 6.74021 12.9473 6.64645 12.8536C6.55268 12.7598 6.5 12.6326 6.5 12.5V5.5C6.5 5.36739 6.55268 5.24021 6.64645 5.14645C6.74021 5.05268 6.86739 5 7 5ZM10 5.5V12.5C10 12.6326 9.94732 12.7598 9.85355 12.8536C9.75979 12.9473 9.63261 13 9.5 13C9.36739 13 9.24021 12.9473 9.14645 12.8536C9.05268 12.7598 9 12.6326 9 12.5V5.5C9 5.36739 9.05268 5.24021 9.14645 5.14645C9.24021 5.05268 9.36739 5 9.5 5C9.63261 5 9.75979 5.05268 9.85355 5.14645C9.94732 5.24021 10 5.36739 10 5.5Z" fill="#454545" />
                                </svg>
                                    Remove</button>
                            </div>
                        </li>
                        {index !== players.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </ul>

        </div>
    );
}

export default Overview;

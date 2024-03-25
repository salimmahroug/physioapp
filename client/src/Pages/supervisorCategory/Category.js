import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../PagesCss/Category.css';


function Category({ categoryName }) {
    const navigate = useNavigate();
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const handleLoginClick = () => {
        navigate("/dashboard/AddPlayer");
    };
    const handleProfile = (id) => {
        setSelectedPlayerId(id);
        navigate(`/dashboard/Detaille?${id}`);
    };
    const [players, setPlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 4;

    const fetchPlayers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await axios.post(`http://localhost:5000/api/player/category/${categoryName}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    useEffect(() => {
        fetchPlayers();
        setCurrentPage(1);
    }, [categoryName]);

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
        const menus = document.querySelectorAll('.menu-options.show');

        menus.forEach((menu) => {
            menu.classList.remove('show');
        });

        menu.classList.toggle('show');
    };

    // Calculer l'index de début et de fin des joueurs à afficher sur la page actuelle
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className='categorys'>
            <h2 className='Recent'>{categoryName}</h2>
            <button className='btn-addplayer' onClick={handleLoginClick}>Add player <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999919 5.16832L5.16659 5.16832L5.16659 1.00166C5.16659 0.780644 5.25438 0.568682 5.41066 0.412402C5.56694 0.256121 5.77891 0.168325 5.99992 0.168325C6.22093 0.168325 6.43289 0.256121 6.58917 0.412402C6.74546 0.568682 6.83325 0.780644 6.83325 1.00166L6.83325 5.16832L10.9999 5.16832C11.2209 5.16832 11.4329 5.25612 11.5892 5.4124C11.7455 5.56868 11.8333 5.78064 11.8333 6.00166C11.8333 6.22267 11.7455 6.43463 11.5892 6.59091C11.4329 6.74719 11.2209 6.83499 10.9999 6.83499L6.83325 6.83499L6.83325 11.0017C6.83325 11.2227 6.74545 11.4346 6.58917 11.5909C6.43289 11.7472 6.22093 11.835 5.99992 11.835C5.7789 11.835 5.56694 11.7472 5.41066 11.5909C5.25438 11.4346 5.16659 11.2227 5.16659 11.0017L5.16659 6.83499L0.999918 6.83499C0.778904 6.83499 0.566943 6.74719 0.410662 6.59091C0.254382 6.43463 0.166585 6.22267 0.166585 6.00166C0.166585 5.78064 0.254382 5.56868 0.410662 5.4124C0.566943 5.25612 0.778905 5.16832 0.999919 5.16832Z" fill="#718EBF" />
            </svg>
            </button>
            <div className='Recent-players'>
                <h2 className='categ-recent'>Recent players</h2>
                <div className='line-blue'></div>
            </div>
            <ul className="player-list">
                {currentPlayers.map((player, index) => (
                    <li key={index}>
                        <img className="player-image" src={player.Urlimage ? player.Urlimage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPC7ikoXgW66ZFb0JFMRADmdD8hxYbgk2N5g&usqp=CAU'} alt="" />
                        <div className='name-player'>
                            <h2 className='player-name'>Player name</h2>
                            <h5>{player.firstname} {player.lastname}</h5>
                        </div>
                        <div className='player-category'>
                            <h2>Category</h2>
                            <h5>{player.category}</h5>
                        </div>
                        <button onClick={() => handleProfile(player._id)} className='player-Details'>View Details</button>                        <span className="menu-icon" onClick={(e) => toggleMenu(e, player._id)}>&#8942;</span>
                        <div id={`menu-${player._id}`} className="menu-options">
                            <button onClick={() => deletePlayer(player._id)}>Delete Player</button>
                            <Link to={`/edit-player/${player._id}`}>Edit Player</Link>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Affichage de la pagination avec boutons "Précédent" et "Suivant" */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L2 6L7 11" stroke="#6598EC" stroke-width="1.5" />
                </svg> Previous</button>
                {Array.from({ length: Math.ceil(players.length / playersPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
                ))}
                <button onClick={nextPage} disabled={currentPage === Math.ceil(players.length / playersPerPage)}> Next <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="#6598EC" stroke-width="1.5" />
                </svg></button>
            </div>
        </div>
    );
}

export default Category;

import React, { useState } from 'react';
import '../PagesCss/Playerdetaill.css';
import Profile from '../../Components/playerDetaille/Profile';
import Case from '../../Components/playerDetaille/Case';
import History from '../../Components/playerDetaille/History';
import Quiz from '../../Components/playerDetaille/Quiz';
import Analyse from '../../Components/playerDetaille/Analyse';
import {useLocation} from 'react-router-dom';

function PlayerDetaill() {
  const location = useLocation();
  const search = location.search;

  const ID = search.slice(1);

  const [profilActiv, setIsProfilActiv] = useState(true);
  const [caseActiv, setIsCaseActiv] = useState(false);
  const [historyActiv, setIsHistoryActiv] = useState(false);
  const [quizActiv, setIsQuizActiv] = useState(false);
  const [analyseActiv, setIsAnalyseActiv] = useState(false);

  const handleCaseClick = () => {
    setIsProfilActiv(false);
    setIsCaseActiv(true);
    setIsHistoryActiv(false);
    setIsQuizActiv(false);
    setIsAnalyseActiv(false);
  };

  const handleHistoryClick = () => {
    setIsProfilActiv(false);
    setIsCaseActiv(false);
    setIsHistoryActiv(true);
    setIsQuizActiv(false);
    setIsAnalyseActiv(false);
  };

  const handleProfileClick = () => {
    setIsProfilActiv(true);
    setIsCaseActiv(false);
    setIsHistoryActiv(false);
    setIsQuizActiv(false);
    setIsAnalyseActiv(false);
  };

  const handleQuizClick = () => {
    setIsProfilActiv(false);
    setIsCaseActiv(false);
    setIsHistoryActiv(false);
    setIsQuizActiv(true);
    setIsAnalyseActiv(false);
  };

  const handleAnalyseClick = () => {
    setIsProfilActiv(false);
    setIsCaseActiv(false);
    setIsHistoryActiv(false);
    setIsQuizActiv(false);
    setIsAnalyseActiv(true);
  };

  return (
    <div className='player-detaille'>
      <h1>player name</h1>
      <ul>
        <button onClick={handleCaseClick} className={caseActiv ? 'active button-detaill' : 'button-detaill'}>Case</button>
        <button onClick={handleHistoryClick} className={historyActiv ? 'active button-detaill' : 'button-detaill'}>History</button>
        <button onClick={handleProfileClick} className={profilActiv ? 'active button-detaill' : 'button-detaill'}>Profile</button>
        <button onClick={handleQuizClick} className={quizActiv ? 'active button-detaill' : 'button-detaill'}>Quiz</button>
        <button onClick={handleAnalyseClick} className={analyseActiv ? 'active button-detaill' : 'button-detaill'}>Analyse</button>
      </ul>
      <div className='detaille-content'>
        {profilActiv && <Profile playerId={ID} />}
        {caseActiv && <Case />}
        {historyActiv && <History />}
        {quizActiv && <Quiz />}
        {analyseActiv && <Analyse />}
      </div>
    </div>
  );
}

export default PlayerDetaill;
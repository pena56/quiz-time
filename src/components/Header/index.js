import React, { useState, useEffect } from 'react';

import './style.css';
import userProfile from '../../imgs/user.svg';
import coin from '../../imgs/coin.svg';
import { useStateValue } from '../../StateProvider';
import { db } from '../../firebase';

function Index() {
  const [{ user, totalScore }, dispatch] = useStateValue();
  const [rank, setRank] = useState(null);

  useEffect(() => {
    const getUserScore = async function () {
      if (user && user.id) {
        await db
          .collection('scores')
          .where('user_id', '==', user.id)
          .onSnapshot((snapshot) => {
            const data = snapshot.docs[0].data();
            dispatch({
              type: 'SYNC_SCORE',
              score: data.score,
            });
          });
      }
    };

    getUserScore();
  }, [dispatch, user]);

  useEffect(() => {
    const getUserRating = async function () {
      if (user && user.id) {
        await db
          .collection('scores')
          .orderBy('score', 'desc')
          .onSnapshot((snapshot) => {
            snapshot.docs.filter((doc, ind) => {
              if (doc.data().user_id === user.id) {
                return setRank(ind + 1);
              }
            });
          });
      }
    };

    getUserRating();
  }, [user]);

  return (
    <div className="header">
      <div className="header-user">
        <img
          src={user ? user.profile || userProfile : null}
          alt="profile"
          className="header-profile"
        />
        <div className="header-details">
          <p className="details-title">Rank</p>
          <p className="details-score">{rank}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="header-points">
        <div className="header-details">
          <p className="details-title">Points</p>
          <p className="details-score">{totalScore}</p>
        </div>
        <img src={coin} alt="coin" className="header-coin" />
      </div>
    </div>
  );
}

export default Index;

import React from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';
import choose from '../../imgs/choose.svg';
import googleIcon from '../../imgs/google-icon.svg';
import { useStateValue } from '../../StateProvider';
import { googleProvider, auth, db } from '../../firebase';

function Index() {
  const [{ user, totalScore }, dispatch] = useStateValue();

  // const signinAsAnon = () => {
  //   dispatch({
  //     type: 'SIGNIN_AS_ANON',
  //   });
  // };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        localStorage.setItem('id', res.user.uid);
        localStorage.setItem('name', res.user.displayName);
        localStorage.setItem('profile', res.user.photoURL);

        db.collection('scores').add({
          user_id: res.user.uid,
          score: totalScore,
        });

        dispatch({
          type: 'SIGNIN_WITH_GOOGLE',
          user: res.user,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="signin">
      {user ? (
        <Redirect to="/" />
      ) : (
        <>
          <img src={choose} alt="brand" className="signin__brand" />
          <h1 className="signin__title">Quiz Time</h1>
          <button onClick={signInWithGoogle} className="signin__button">
            <img
              src={googleIcon}
              className="signin__button-logo"
              alt="google"
            />
            Sign In with Google
          </button>

          {/* <button onClick={signinAsAnon} className="signin__button">
            Continue without signing in
          </button> */}
        </>
      )}
    </div>
  );
}

export default Index;

import React from 'react';
import { Redirect } from 'react-router-dom';

import './style.css';

import knowledge from '../../imgs/knowledge.svg';
import books from '../../imgs/books.svg';
import film from '../../imgs/video.svg';
import music from '../../imgs/music.svg';
import theater from '../../imgs/theater.svg';
import television from '../../imgs/televisions.svg';
import videoGames from '../../imgs/game-console.svg';
import board from '../../imgs/board.svg';
import planet from '../../imgs/planet.svg';
import desktop from '../../imgs/desktop.svg';
import maths from '../../imgs/calculating.svg';
import myth from '../../imgs/myth.svg';
import sports from '../../imgs/sports.svg';
import world from '../../imgs/world.svg';
import clock from '../../imgs/clock.svg';
import politics from '../../imgs/politics.svg';
import art from '../../imgs/art.svg';
import celebrity from '../../imgs/celebrity.svg';
import animal from '../../imgs/animal.svg';
import car from '../../imgs/car.svg';
import comic from '../../imgs/comic.svg';
import gadget from '../../imgs/gadget.svg';
import manga from '../../imgs/manga.svg';
import cartoon from '../../imgs/cartoon.svg';

import Category from '../Category';
import { useStateValue } from '../../StateProvider';
import { googleProvider, auth, db } from '../../firebase';

function Index() {
  const [{ user, totalScore }, dispatch] = useStateValue();

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

  const logOut = () => {
    auth.signOut().then(
      function () {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('profile');
        console.log('successfully Signed out');
      },
      function (err) {
        console.error(err);
      }
    );
  };

  return (
    <>
      {user ? (
        <div className="home">
          <div className="home__title">
            <p className="home__title-welcome">
              Welcome, {user.name} <br />
              <small>
                {user.id ? (
                  <span onClick={logOut}>Log Out</span>
                ) : (
                  <>
                    <span
                      onClick={signInWithGoogle}
                      style={{ borderBottom: '1px solid #fff' }}
                    >
                      Sign In
                    </span>{' '}
                    to save your Progress and see Your Rank
                  </>
                )}
              </small>
            </p>
            <h1>Let's Play</h1>
            <p>Choose a Category to start playing.</p>
          </div>
          <div className="home__cards">
            <Category cover={knowledge} name="General Knowledge" id={9} />
            <Category cover={books} name="Books" id={10} />
            <Category cover={film} name="Film" id={11} />
            <Category cover={music} name="Music" id={12} />
            <Category cover={theater} name="theater" id={13} />
            <Category cover={television} name="television" id={14} />
            <Category cover={videoGames} name="video games" id={15} />
            <Category cover={board} name="board games" id={16} />
            <Category cover={planet} name="Science & Nature" id={17} />
            <Category cover={desktop} name="computers" id={18} />
            <Category cover={maths} name="mathematics" id={19} />
            <Category cover={myth} name="mythology" id={20} />
            <Category cover={sports} name="sports" id={21} />
            <Category cover={world} name="geography" id={22} />
            <Category cover={clock} name="History" id={23} />
            <Category cover={politics} name="Politics" id={24} />
            <Category cover={art} name="art" id={25} />
            <Category cover={celebrity} name="celebrity" id={26} />
            <Category cover={animal} name="animal" id={27} />
            <Category cover={car} name="vehicles" id={28} />
            <Category cover={comic} name="Comics" id={29} />
            <Category cover={gadget} name="gadgets" id={30} />
            <Category cover={manga} name="japanese anime & manga" id={31} />
            <Category cover={cartoon} name="cartoons & animations" id={32} />
          </div>
        </div>
      ) : (
        <Redirect to="/signin" />
      )}
    </>
  );
}

export default Index;

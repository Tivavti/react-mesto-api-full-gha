import React from 'react';
import Header from '../components/Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitDeletePopup from './SubmitDeletePopup';
import { AppContext } from '../contexts/AppContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isSubmitDeletePopupOpen, setSubmitDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState(" ");

  const [isLoading, setLoading] = React.useState(false);

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const navigate = useNavigate();
  const checkToken = () => {
    auth.checkValidityToken()
      .then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true })
      })
      .catch((e) => {
        setLoggedIn(false);
      });
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo.data);
          setCards(cards.reverse())
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSubmitDeletePopupOpen(false);

    setSelectedCard(null);
    setDeletedCard(null);
    setInfoTooltipOpen(null);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleSubmitDeleteClick(card) {
    setSubmitDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  };

  function handleCardDelete() {
    setLoading(true);
    api.deleteCard(deletedCard._id)
      .then((card) => {
        setCards(cards => cards.filter((c) => c._id !== deletedCard._id))
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      });
  };

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api.setUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      });
  };

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api.setUserAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      });
  };

  function handleAddPlaceSubmit({ name, link }) {
    setLoading(true);
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(() => {
        setSuccess(true);
        setLoggedIn(true);
        setUserEmail(email)
        navigate("/", { replace: true })
      })
      .catch((e) => {
        setSuccess(false);
        setLoggedIn(false);
        handleInfoTooltip();
      });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setSuccess(true);
        handleInfoTooltip();
        navigate("/signin", { replace: true });
      })
      .catch((e) => {
        setSuccess(false);
        handleInfoTooltip();
      });
  }

  function handleLogout() {
    auth.logout()
    .then(() => {
      setLoggedIn(false);
      navigate('/signin', {replace: true});
      setCurrentUser({});
    })
    .catch(console.error)
  }

  const handleInfoTooltipStatus = isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            setLoggedIn={setLoggedIn}
            userEmail={userEmail}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route exact path="/signup" element={
              <Register
                handleRegister={handleRegister}
              />
            } />
            <Route exact path="/signin" element={
              <Login
                handleLogin={handleLogin}
              />
            } />
            <Route exact path="/" element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleSubmitDeleteClick}
                cards={cards}
              />
            } />
          </Routes>
          <InfoTooltip
            isSuccess={isSuccess}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            handleInfoTooltipStatus={handleInfoTooltipStatus}
          />
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <SubmitDeletePopup
            isOpen={isSubmitDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider >
  );
}

export default App;

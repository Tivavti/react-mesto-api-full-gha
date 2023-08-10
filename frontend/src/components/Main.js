import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, onSubmitDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="page">
      <main className="content">
        <section className="profile">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Редактировать аватар"
            onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар." />
          </button>
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              name="popup-button"
              aria-label="Редактировать данные профиля"
              onClick={onEditProfile}
            >
            </button>
          </div>
          <button
            className="profile__add-button button"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          >
          </button>
          <p className="profile__occupation">{currentUser.about}</p>
        </section>
        <section className="elements" aria-label="Место">
          <div className="elements__list">
            {cards.map((card) => (
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} onSubmitDelete={onSubmitDelete} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Main;
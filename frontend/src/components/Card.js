import React from "react";

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_active'}`
  );

  return (
    <div className="element">
      {isOwn && <button
        type="button"
        className="element__delete-button button"
        name="delete-button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>}
      <img className="element__image" src={card.link} alt={`Фотография ${card.name}`} onClick={handleCardClick} />
      <h2 className="element__title">{card.name}</h2>
      <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
      <p className="element__quantity-likes">{card.likes.length}</p>
    </div>
  )
}

export default Card;
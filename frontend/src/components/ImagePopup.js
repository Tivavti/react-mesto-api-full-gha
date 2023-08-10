import React from "react";

import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose)
  return (
    <div className={`popup popup_type_image ${card && "popup_opened"}`}>
      <figure className="popup__image-container">
        <button
          className="popup__button-closed button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
        </button>
        <img className="popup__image" alt={card ? card.name : ""} src={card ? card.link : ""} />
        <figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
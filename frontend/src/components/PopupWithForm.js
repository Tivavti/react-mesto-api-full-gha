import React from "react";

import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({ name, title, isOpen, children, buttonTitle, onClose, onSubmit }) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-closed button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__inputs" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button popup__button-save popup__button_valid" type="submit">
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
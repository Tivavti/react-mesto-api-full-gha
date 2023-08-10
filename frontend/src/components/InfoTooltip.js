import React from "react";
import successPath from '../images/success.svg';
import goeswrongPath from '../images/goeswrong.svg';
import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, isSuccess, handleInfoTooltipStatus }) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-closed button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
        </button>
        <img className="infoTooltip__status" src={isSuccess ? successPath : goeswrongPath} alt={isSuccess ? "Зарегистрирован" : "Что-то пошло не так"} />
        <h2 className="popup__title">{handleInfoTooltipStatus}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
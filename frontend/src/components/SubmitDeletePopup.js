import React from "react";

import PopupWithForm from "./PopupWithForm";

function SubmitDeletePopup({ isOpen, onClose, onSubmitDelete, card, isLoading }) {
  function handleSubmitDelete(evt) {
    evt.preventDefault();

    onSubmitDelete(card)
  }

  return (
    <PopupWithForm
      name="submit"
      title="Вы уверены?"
      buttonTitle={isLoading ? "Удаляю..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitDelete}
    />
  )
}

export default SubmitDeletePopup;
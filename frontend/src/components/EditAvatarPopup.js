import React from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
          type="url"
          className="popup__item popup__item_type_avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__item-error popup__item-error_type_avatar"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
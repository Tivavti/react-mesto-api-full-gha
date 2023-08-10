import React from "react";

import PopupWithForm from "./PopupWithForm";

import useForm from "../hooks/useForm";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({ ...values, "name": currentUser.name, "about": currentUser.about })
  }, [currentUser, isOpen]);


  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonTitle={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__item popup__item_type_name"
          type="name"
          value={values.name || ""}
          onChange={handleChange}
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__item-error popup__item-error_type_name"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          value={values.about || ""}
          onChange={handleChange}
          className="popup__item popup__item_type_about"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__item-error popup__item-error_type_about"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
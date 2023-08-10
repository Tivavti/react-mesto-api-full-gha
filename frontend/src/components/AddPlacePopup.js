import React from "react";

import PopupWithForm from "./PopupWithForm";

import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    setValues({})
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonTitle={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <label className="popup__label">
        <input
          value={values.name || ""}
          onChange={handleChange}
          type="name"
          className="popup__item popup__item_type_place"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__item-error popup__item-error_type_name"></span>
      </label>
      <label className="popup__label">
        <input
          value={values.link || ""}
          onChange={handleChange}
          type="url"
          className="popup__item popup__item_type_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__item-error popup__item-error_type_link"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
'use client';

import { useState } from 'react';

export default function CreateStorePage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !latitude || !longitude) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);

      if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
        setError('Широта и долгота должны быть числами.');
        return;
      }

      const newStore = {
        name,
        address,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      };

      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStore),
      });

      if (response.ok) {
        alert('Зоомагазин успешно создан!');
        setName('');
        setAddress('');
        setLatitude('');
        setLongitude('');
        setError('');
      } else {
        alert('Ошибка при создании зоомагазина.');
        setError('Ошибка при создании зоомагазина.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке запроса.');
      setError('Ошибка при отправке запроса.');
    }
  };

  return (
    <div className="container">
      <h1>Создать новый зоомагазин</h1>
      <form onSubmit={handleSubmit} className="form">
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Широта:</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            step="any"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Долгота:</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            step="any"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Создать</button>
      </form>
      <style jsx>{`
    .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        border: rgb(0, 0, 0);
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
    }
    h1 {
        text-align: center;
        color: rgb(0, 0, 0);
        margin-bottom: 20px;
    }
    .form {
        display: flex;
        flex-direction: column;
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: rgb(0, 0, 0);
    }
    .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
        color: rgb(255, 255, 255);
        background-color: rgb(0, 0, 0);
    }
    .form-control:focus {
        outline: none;
        border-color: rgb(0, 0, 0);
        box-shadow: 0 0 5px rgba(0, 0, 0);
    }
    .btn {
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .btn-primary {
        background-color: rgb(151, 151, 151);
        color: rgb(0, 0, 0);
    }
    .btn-primary:hover {
        background-color: rgb(255, 255, 255);
    }
    .error {
        color: rgb(255, 0, 0);
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid rgb(255, 0, 0);
        border-radius: 4px;
        background-color: rgb(255, 230, 230);
        text-align: center;
    }
`}</style>
    </div>
  );
}

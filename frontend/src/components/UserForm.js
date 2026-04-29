import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = ({ refresh }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ name, email });
    setName('');
    setEmail('');
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;

import React, { useEffect, useState } from 'react';
import { getUsers } from './services/api';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>3-Tier App - User Management</h2>

      <UserForm refresh={fetchUsers} />

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

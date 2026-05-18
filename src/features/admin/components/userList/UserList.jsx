import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService.js';
import Spinner from '../../../../core/layout/spinner/Spinner.jsx';
import './UserList.scss';

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getAllUsers();
        setUsers(data);
      } catch (error) {
        setError(error.response?.data || 'Došlo je do greške prilikom učitavanja korisnika.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list-page">
      <h2 className="user-list-title">Korisnici</h2>

      {error && <p className="error-message">{error}</p>}

      {users === null && !error && <Spinner />}

      {users !== null && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Email</th>
              <th>Uloga</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;

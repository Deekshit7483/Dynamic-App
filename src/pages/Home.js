import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { FaUser, FaFile } from 'react-icons/fa';

function getIcon(iconName) {
    switch (iconName) {
      case 'user': return <FaUser />;
      case 'file': return <FaFile />;
      default: return '📄';
    }
  }

function Home() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('/menu')
      .then((res) => {
        console.log('API response:', res.data);
        setMenus(res.data.menu || []);
      })
      .catch((err) => {
        console.error('Failed to fetch menu:', err);
      });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <h3>Menu</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menus.map((menu, index) => (
            <li key={index} style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              📄 {menu.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Welcome</h1>
        <p>Select a menu item from the sidebar.</p>
      </div>
    </div>
  );
}

export default Home;

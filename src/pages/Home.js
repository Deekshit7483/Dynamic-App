// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import Sidebar from '../pages/Nav'; 

function Home() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/menu')
      .then((res) => {
        console.log(res.data.menu);
        setMenus(res.data.menu || []);
      })
      .catch((err) => {
        console.error('Failed to fetch menu:', err);
      });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar menus={menus} /> {/* Pass menus as a prop */}

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Welcome</h1>
        <p>Select a menu item from the sidebar.</p>
      </div>
    </div>
  );
}

export default Home;

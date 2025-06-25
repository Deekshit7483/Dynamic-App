import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { FaUser, FaFile } from 'react-icons/fa';

// Sidebar icon helper
function getIcon(iconName) {
  switch (iconName) {
    case 'user': return <FaUser />;
    case 'file': return <FaFile />;
    default: return '📄';
  }
}

const Nav = () => {
  const [menus, setMenus] = useState([]);

  // Fetch menus
  useEffect(() => {
    axiosInstance.get('/api/menu')
      .then((res) => {
        setMenus(res.data.menu || []);
      })
      .catch((err) => {
        console.error('Failed to fetch menu:', err);
      });
  }, []);

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    }}>
      {/* Menu Header - Clickable link */}
      <h3>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Menu
        </Link>
      </h3>

      {/* Menu Items */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menus.map((menu, index) => (
          <li
            key={index}
            style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Link to={`/page/${menu.pageId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {getIcon(menu.icon)} {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;

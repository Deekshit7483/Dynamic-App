import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const Report = ({ columns }) => {
  const [data, setData] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/report/data')
      .then((res) => {
        const result = res.data.Data || [];
        setData(result);
        setFilteredData(result);
      })
      .catch((err) => console.error('Failed to load report:', err));
  }, []);

  useEffect(() => {
    if (filterEmail.trim() === '') {
      setFilteredData(data);
    } else {
      const lowerEmail = filterEmail.toLowerCase();
      const filtered = data.filter(item =>
        item.email?.toLowerCase().includes(lowerEmail)
      );
      setFilteredData(filtered);
    }
  }, [filterEmail, data]);

  return (
    <div>

      {/* Filter*/}
      <div style={{ marginBottom: '10px' }}>
        <label>
          Filter by Email:{' '}
          <input
            type="text"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Enter email"
            style={{ padding: '5px', width: '250px' }}
          />
        </label>
      </div>

      {/* Table */}
      <table
        border="1"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.name === 'createdAt'
                      ? new Date(row[col.name]).toLocaleString()
                      : row[col.name]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

const Report = ({columns}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/report/data')
      .then((res) => {
        setData(res.data.Data || []);
      })
      .catch((err) => console.error('Failed to load report:', err));
  }, []);

  return (
    <div>
      <h2>Customer Report</h2>
      <table
        border="1"
        style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.name === 'createdAt'
                    ? new Date(row[col.name]).toLocaleString()
                    : row[col.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;

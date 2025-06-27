import React from 'react';

const Report = ({ columns, data }) => {
  return (
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
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Report;

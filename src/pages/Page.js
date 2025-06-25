import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Nav from '../pages/Nav';  // Sidebar component import

const Page = () => {
  const { pageId } = useParams();
  const [pageData, setPageData] = useState(null);
  const [formData, setFormData] = useState({});
  const [reportData, setReportData] = useState([]);

  // Fetch page metadata
  useEffect(() => {
    axiosInstance.get(`/api/page?pageId=${pageId}`)
      .then((res) => {
        setPageData(res.data);
      })
      .catch((err) => {
        console.error('Failed to load page metadata:', err);
      });
  }, [pageId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/form/submit', {
      formId: pageData.form.id,
      data: formData
    })
      .then(() => {
        alert('Form submitted successfully!');
        setFormData({});
      })
      .catch((err) => {
        alert('Form submission failed.');
        console.error(err);
      });
  };

  // Fetch report data based on filters
  useEffect(() => {
    if (pageData && pageData.report) {
      axiosInstance.post('/report/data', {
        reportId: pageData.report.id,
        filters: pageData.report.filters
      })
        .then((res) => {
          setReportData(res.data);  // Assuming the API returns filtered data
        })
        .catch((err) => {
          console.error('Failed to fetch report data:', err);
        });
    }
  }, [pageData]);

  // Loading state
  if (!pageData) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar (Navigation) */}
      <Nav />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>{pageData.name}</h2>

        {/* Render Form if it's a form page */}
        {pageData.type === 'form' && (
          <form onSubmit={handleSubmit}>
            {pageData.form.fields.map((field) => (
              <div key={field.name} style={{ marginBottom: '10px' }}>
                <label>{field.label || field.name}</label><br />
                <input
                  type={field.type === 'datetime' ? 'datetime-local' : field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}

        {/* Render Report if it's a report page */}
        {pageData.type === 'report' && (
          <>
            {/* Filters */}
            {pageData.report.filters.map((filter, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <label>{filter.label}</label><br />
                <input
                  type={filter.type}
                  name={filter.name}
                  placeholder={`Enter ${filter.label}`}
                  onChange={(e) => setReportData(reportData.filter(item => item[filter.name].includes(e.target.value)))}
                />
              </div>
            ))}

            {/* Report Table */}
            <table
              border="1"
              style={{
                marginTop: '20px',
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  {pageData.report.columns.map((col, index) => (
                    <th key={index}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index}>
                    {pageData.report.columns.map((col, colIndex) => (
                      <td key={colIndex}>{row[col.name]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

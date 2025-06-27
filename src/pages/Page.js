import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Nav from '../pages/Nav';
import Form from '../pages/Form';
import Report from '../pages/Report';

const Page = () => {
  const { pageId } = useParams();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/api/page?pageId=${pageId}`)
      .then((res) => 
        setPageData(res.data))
      .catch((err) => 
        console.error('Failed to load page metadata:', err)
    );
  }, [pageId]);

  if (!pageData) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Nav />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>{pageData.name}</h2>

        {pageData.type === 'form' && (
          <Form fields={pageData.form.fields} />
        )}

        {pageData.type === 'report' && (
          <Report columns={pageData.report.columns} 
          data={pageData.report.data || []} />
        )}
      </div>
    </div>
  );
};

export default Page;
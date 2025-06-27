import Nav from '../pages/Nav'; 

function Home() {

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
        <Nav />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Welcome</h1>
        <p>This is Home page</p>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage.jsx';

const Home = () => (
  <div>
    <h2>Bun venit la ATV Rental Manager</h2>
    <p>Selectează o secțiune din meniu pentru a începe.</p>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>ATV Rental Manager</h1>
        <nav>
          <NavLink to="/" end>
            Acasă
          </NavLink>
          <NavLink to="/clients">Clienți</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

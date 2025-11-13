// Aplicatie React creată cu Vite
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage.jsx';
import ClientsPage from './pages/ClientsPage.jsx';
import AtvsPage from './pages/AtvsPage.jsx';
import RentalsPage from './pages/RentalsPage.jsx';
import CreateRentalPage from './pages/CreateRentalPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/atvs" element={<AtvsPage />} />
        <Route path="/rentals" element={<RentalsPage />} />
        <Route path="/rentals/new" element={<CreateRentalPage />} />
      </Route>
    </Routes>
  );
}

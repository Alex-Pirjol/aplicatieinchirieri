import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>ATV Rental</h2>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/clients">Clienți</NavLink>
        <NavLink to="/atvs">ATV-uri</NavLink>
        <NavLink to="/rentals">Contracte</NavLink>
        <NavLink to="/rentals/new">Contract nou</NavLink>
      </aside>
      <div>
        <nav>
          <strong>ATV Rental Manager</strong>
          <div>
            <Link to="/">Acasă</Link>
          </div>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

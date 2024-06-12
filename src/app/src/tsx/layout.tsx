import { Outlet } from 'react-router-dom';

const Layout = () => (
    <div className="main-index">
        <Outlet />
    </div>
);

export default Layout;
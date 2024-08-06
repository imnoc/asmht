import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const LayoutAdmin = () => (
  <div>
    <Sidebar />
    <main>
      <Outlet /> 
    </main>
  </div>
);
export default LayoutAdmin

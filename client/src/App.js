import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
    return (<div className="container">
      <Navbar />
      <main>
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>);
}
export default App;

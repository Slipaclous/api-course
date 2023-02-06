import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import CustomerPageWithPagination from './pages/CustomersPageWithPagination'
import InvoicesPage from './pages/InvoicesPage';

const App = () => {
  return ( 
  <Router>
    <Navbar />
    <main className="container pt-5">

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customerpage" element={<CustomerPageWithPagination />} />
      
    </Routes>
    </main>
  </Router>
   );
}
 
export default App;
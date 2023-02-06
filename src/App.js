import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import CustomerPageWithPagination from './pages/CustomersPageWithPagination'

const App = () => {
  return ( 
  <Router>
    <Navbar />
    <main className="container pt-5">

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customerpage" element={<CustomerPageWithPagination />} />
      
    </Routes>
    <h1>Test</h1>
    </main>
  </Router>
   );
}
 
export default App;
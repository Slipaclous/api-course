import { useState, useEffect } from 'react';
import Axios from 'axios';
import Pagination from '../components/Pagination';

const CustomersPageWithPagination = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const handlePageChange = (page) => {
        setCustomers([]);
        setCurrentPage(page);
    }


    useEffect(() => {
        Axios.get("http://localhost:8000/api/customers?pagination=true&count=" + itemsPerPage + "&page=" + currentPage)
            .then(response => {
                setTotalItems(response.headers["x-total-count"]);
                setCustomers(response.data["hydra:member"]);
            })
            .catch(error => console.log(error.response));
    }, [currentPage]);
    
    return ( 
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th className="text-center">Montant restant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan='8' className='text-center'>Chargement...</td>
                        </tr>
                    )}
                    
                    {customers.map(customer => (

                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                                <a href="#">{customer.firstName} {customer.lastName}</a>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className='text-center'>
                                <span className="badge bg-primary badge-primary">{customer.invoices.length}</span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()}€</td>
                            <td className="text-center">{customer.unpaidAmount.toLocaleString()}€</td>
                            <td>
                                <button className="btn btn-sm btn-danger mx-2">Supprimer</button>
                                <button className="btn btn-sm btn-warning">Modifier</button>
                            </td>
                        </tr>
                        
                    ))}
                    <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems} onPageChanged={handlePageChange} />

                </tbody>

            </table>    
        </>
     );
}
 
export default CustomersPageWithPagination;
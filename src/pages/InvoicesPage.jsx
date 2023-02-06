import { useState,useEffect } from "react";
import Pagination from "../components/Pagination";
import moment from "moment/moment";
import InvoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}
const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;

    //récupérer les invoices
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    }
    //au chargement du composant, on va chercher les invoices
    useEffect(() => {
        fetchInvoices();
    }, []);

    //Gestion de la suppression d'une invoice
    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        //optimiste
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        //faire le changement dans la base de données
        try {
            await InvoicesAPI.delete(id);
        } catch (error) {
            //notification d'erreur
            setInvoices(originalInvoices);
            console.log(error.response);
        }
    }
    //Gestion de la recherche
    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }
    //pour l pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    //filtrage des invoices en fonction de la recherche
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);
    //Gestion du format de date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    



        return(
                <>
                <h1>Liste des factures</h1>
                <div className="form-group">
                    <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/></div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Client</th>
                            <th className="text-center">Date d'envoi</th>
                            <th className="text-center">Statut</th>
                            <th className="text-center">Montant</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedInvoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td>{invoice.chrono}</td>
                                <td>
                                    <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                                </td>
                                <td className="text-center">{moment(invoice.sentAt).format('DD/MM/YYYY')}</td>
                                <td className="text-center">
                                    <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                                </td>
                                <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                                <td>
                                    <button className="btn btn-sm btn-primary mr-1">Editer</button>
                                    <button className="btn btn-sm btn-danger">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                   {itemsPerPage < filteredInvoices.length && 
                       <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChanged={handlePageChange} />
                     }

        </>
        )
        }
export default InvoicesPage;
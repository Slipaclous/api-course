import { useState, useEffect } from "react";
import invoicesAPI from "../services/invoicesAPI";
import Field from "../components/forms/Field";
import customersAPI from "../services/customersAPI";
import { Link, useParams, useNavigate } from "react-router-dom";

const InvoicePäge = () => {
    const { id = "new" } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });
    const [customers, setCustomers] = useState([]);
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });
    const [editing, setEditing] = useState(false);

    // Récupération des clients
    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll();
            setCustomers(data);
            if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
        } catch (error) {
            console.log(error.response);
        }
    }

    // Récupération de la facture en fonction de l'identifiant
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await invoicesAPI.find(id);
            setInvoice({ amount, status, customer: customer.id });
        } catch (error) {
            console.log(error.response);
            navigate("/invoices");
        }
    }

    // Chargement du client si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Chargement de la facture si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (editing) {
                await invoicesAPI.update(id, invoice);
                navigate("/invoices");
            } else {
                await invoicesAPI.create(invoice);
                navigate("/invoices");
            }
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
            }
        }
    };

    
    return ( 
        <>
        <h1>Création d'une facture</h1>
        <form>
            <Field
                name="amount"
                label="Montant"
                placeholder="Montant de la facture"
                type="number"
                value={invoice.amount}
                onChange={handleChange}
                error={errors.amount}

            />
        </form>
        </>
     );
}
 
export default InvoicePäge;
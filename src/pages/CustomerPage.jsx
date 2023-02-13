import { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";

const CustomerPage = (props) => {

    var { id = "new" } = useParams();
    const navigate = useNavigate();

    //si j'édite ou non 
    const [editing, setEditing] = useState(false);
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: ""
    });

    // Récupération du customer en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await CustomersAPI.find(id);
            setCustomer({ firstName, lastName, email, company });
        } catch (error) {
            console.log(error.response);
            navigate("/customers",{replace: true});
        }
    }

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(customer);
        try {
            if (editing) {
                await CustomersAPI.update(id, customer);
                navigate("/customers");
            } else {
                await CustomersAPI.create(customer);
                navigate("/customers");
            }
        }catch({response}){
        const {violations} = response.data;
        if(violations){
            const apiErrors = {};
            violations.forEach(({propertyPath, message}) => {
                apiErrors[propertyPath] = message;
            });
            setErrors(apiErrors);
        }
        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);


    return ( 
        <>
            {editing && <h1>Modification du client</h1> || <h1>Création d'un client</h1>}
            <>  
                <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    value={customer.firstName}
                    onChange={handleChange}
                    placeholder="Prénom du client"
                    error={errors.firstName}
                />
                <Field  
                    name="lastName"
                    label="Nom"
                    value={customer.lastName}
                    onChange={handleChange}
                    placeholder="Nom du client"
                    error={errors.lastName}

                />
                <Field 
                    name="email"
                    label="Email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="Email du client"
                    error={errors.email}

                />
                <Field 
                    name="company"
                    label="Entreprise"
                    value={customer.company}
                    onChange={handleChange}
                    placeholder="Entreprise du client"
                    error={errors.company}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                    </div>
                </form>
                </>
                </>
);
}

export default CustomerPage;
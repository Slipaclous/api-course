const Select = ({ name, label, value, error="",onChange,children }) => {
    return (
        <div className="my-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                className={"form-select" + (error && " is-invalid")}
            >
                {children}
            </select>
            {error && (
                <p className="invalid-feedback">{error}</p>
            )}
        </div>
    );
}
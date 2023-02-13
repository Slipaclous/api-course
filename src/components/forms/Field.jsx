const Field = ({name,label,value,onChange,placeholder="",type="text",error=""}) => {
    return ( 
        <div className="my-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={name}
                className={"form-control" + (error && " is-invalid")}
            />
            { error && (
                <p className="invalid-feedback">{error}</p>
            )}
        </div>
     );
}
 
export default Field;
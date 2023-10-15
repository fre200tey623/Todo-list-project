export default function Placeholder({onChange,placeholder,value}){
    return (
        <>
            <input type="text" className="placeholder" onChange={onChange} placeholder={placeholder} value={value}></input>
        </>
    )
}

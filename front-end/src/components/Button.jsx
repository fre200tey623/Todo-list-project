import React from "react"
export default function Button({onClick,nome,className}){
    return (
        <>
            <button onClick={onClick} className={className}>{nome}</button>
        </>
    )
}
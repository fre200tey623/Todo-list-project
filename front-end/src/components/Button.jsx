import React from "react"
export default function Button({onClick,nome}){
    return (
        <>
            <button onClick={onClick}>{nome}</button>
        </>
    )
}
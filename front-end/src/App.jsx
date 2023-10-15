import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Placeholder from './components/Placeholder'
import Button from './components/Button'

function App() {

  const [resposta,setResposta] = useState([])
  const [atividade,setAtividade] = useState("")

  useEffect(()=>{
    axios.get("https://localhost:7139/Atividades")
    .then((res)=>{
      setResposta(res.data)
  })
    .catch(err=>{console.error(err)})
  },[resposta])


  function adicionarAtividade(){
    const dataAtual = new Date();
    dataAtual.getTimezoneOffset
    axios.post("https://localhost:7139/Atividades",{"descricao":atividade})
    .then(response=>console.log(response),
    )
    .catch(err=>console.log(err))
    
    setAtividade("")
    // return console.log("Valor da Atividade->"+atividade)
  }
  const placeholder = "Digite algo para adicionar uma atividade"

  return (
    <>
      <div className='main'>
        <div className='titulo'> 
          <label>Lista de Tarefas</label>
        </div>
        <div className='pesquisa'>
          <Placeholder onChange={(event)=> setAtividade(event.target.value)} value={atividade} placeholder={placeholder}/>
          <Button nome={"Adicionar"} onClick={adicionarAtividade}/>
        </div>
        <ul className='conteudo'>
          {resposta.map((valor) =>(
            <li key={valor.atividadesId} >
              <div className='container'>
                <label>{valor.atividadesId}</label>
                <label>{valor.descricao}</label>
                <label>{valor.horaDeCriacao}</label>
              </div>
              <div>
                <Button />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Placeholder from './components/Placeholder'
import Button from './components/Button'
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import Carregamento from './components/Carregamento'
import Card from './components/Card'

function App() {

  const [resposta,setResposta] = useState([])
  const [atividade,setAtividade] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    axios.get("https://localhost:7139/Atividades")
    .then((res)=>{   
      setResposta(res.data);
      setLoading(false)
    })
    .catch(err=>{console.error(err)})
  },[resposta])

  function adicionarAtividade(){
    axios.post("https://localhost:7139/Atividades",{"descricao":atividade})
    .then(response=>console.log(response),
    )
    .catch(err=>console.log(err))
    
    setAtividade("")
  }
  const placeholder = "Digite algo para adicionar uma atividade"
  const mensagem = "Nenhuma atividade foi adicionada ainda..."
  const dataAtual = new Date()
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear()

  function deletarTarefa(id){
    axios.delete(`https://localhost:7139/Atividades/${id}`)
    .then((response) => {
      console.log('Recurso excluído com sucesso:', response.data);
    })
    .catch((error) => {
      console.error('Erro ao excluir o recurso:', error);
    });
  }

  function concluirTarefa(id){

  axios.get(`https://localhost:7139/Atividades/${id}`)
    .then((response) => {
      const atividade = response.data; 

      atividade.concluido = !atividade.concluido;
    
      axios.put(`https://localhost:7139/Atividades/${id}`, atividade)
        .then((response) => {
          console.log('Atualização bem-sucedida:', response.data);
        })
        .catch((error) => {
          console.error('Erro na atualização:', error);
        });
    })
    .catch((error) => {
      console.error('Erro na obtenção do valor atual:', error);
    });
  }

  return (
    <>
      <div className='main'>
        <div className='cabecalho'>
        <div className='dataAtual'>
          <div className='dia'>
            <label>{dia}</label>
          </div>
          <div className='blocoMesAno'>
            <label>{mes}</label>
            <label>{ano}</label>
          </div>
        </div>
        <div className='titulo'> 
          <label>Lista de Tarefas</label>
        </div>
        </div>
        <div className='pesquisa'>
          <Placeholder onChange={(event)=> setAtividade(event.target.value)} value={atividade} placeholder={placeholder}/>
          <Button nome={"Adicionar"} onClick={adicionarAtividade}/>
        </div>
        {loading ? (<Carregamento informacao={"Carregando conteudo..."}/>) :
        (resposta.length === 0 ? mensagem:<div className='conteudo'>
          <ul className=''>
            {resposta.map((valor) =>(
              <li key={valor.atividadesId} >
                <div className='card'>
                  <div className='container'>
                    <Card className={valor.concluido?'tarefaConluida':''} valor={valor.descricao}/>
                  </div>
                  <div className='buttons'>
                    <div>
                      <Button nome={<AiOutlineCheck className='icon'/>} className={valor.concluido? "buttonConcluido":"buttonNaoConcluido"} onClick={()=>concluirTarefa(valor.atividadesId)}/>
                    </div>
                    <div>
                      <Button nome={<BsTrash className='icon'/>} className={"buttonDelete"} onClick={()=>(deletarTarefa(valor.atividadesId))}/>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>)}
      </div>
      
    </>
  )
}

export default App

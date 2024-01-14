import { useEffect,useContext } from 'react'
import './App.css'
import Placeholder from './components/Placeholder'
import Button from './components/Button'
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import Carregamento from './components/Carregamento'
import Card from './components/Cards'
import { AppContext } from './context/AppContext'
import { api } from './api/api'

function App() {
  const {atividade,setAtividade,resposta,setResposta,loading,setLoading,concluirTarefa,deletarTarefa,adicionarAtividade} = useContext(AppContext);

  const placeholder = "Digite algo para adicionar uma atividade"
  const mensagem = "Nenhuma atividade foi adicionada ainda..."
  const dataAtual = new Date()
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear()

  useEffect(()=>{
    api.get()
    .then((res)=>{   
      setResposta(res.data);
      setLoading(false)
    })
    .catch(err=>{console.error(err)})
  },[resposta])
  

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
        
        <div className='conteudo-wrap'>
        <div className='pesquisa'>
          <Placeholder onChange={(event)=> setAtividade(event.target.value)} value={atividade} placeholder={placeholder}/>
          <Button nome={"Adicionar"} onClick={adicionarAtividade} className="botaoAdicionar"/>
        </div>
        {loading ? (<Carregamento informacao={"Carregando conteudo..."}/>) :
        (resposta.length === 0 ? mensagem:<div className=''>
    
            {resposta.map((valor) =>(
              <div key={valor.atividadesId} >
                    <Card className={valor.concluido?'tarefaConluida':''} valor={valor.descricao} data={valor.horaDeCriacao}/>
              </div>
            ))}
          
        </div>)}
        </div>
      </div>
    </>
  )
}

export default App

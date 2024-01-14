import { createContext,useState } from "react";
import axios from 'axios'
import { api } from "../api/api";
export const AppContext = createContext({})

export function AppContextProvider({children}){
    const [resposta,setResposta] = useState([])
    const [atividade,setAtividade] = useState("")
    const [loading,setLoading] = useState(true)

    function concluirTarefa(id){

        api.get(`/${id}`)
          .then((response) => {
            const atividade = response.data; 
      
            atividade.concluido = !atividade.concluido;
          
            api.put(`/${id}`, atividade)
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
    
    function deletarTarefa(id){
        api.delete(`/${id}`)
        .then((response) => {
          console.log('Recurso excluído com sucesso:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao excluir o recurso:', error);
        });
      }

    function adicionarAtividade(){
      const data = new Date();
      const dataFormatada = data.toISOString();
        api.post("",{"descricao":atividade,"horaDeCriacao":dataFormatada})
        .then(response=>console.log(response),
        )
        .catch(err=>console.log(err))
        
        setAtividade("")
      }
    
    return <AppContext.Provider value={{resposta,setResposta,atividade,setAtividade,loading,setLoading,concluirTarefa,deletarTarefa,adicionarAtividade}}>
        {children}
        </AppContext.Provider>
}
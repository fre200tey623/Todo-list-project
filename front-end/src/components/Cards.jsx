
import Button from './Button'
import { Card } from 'antd'
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
export default function Cards({className,valor,data}){
    return(
        <>
        <Card title={valor} >
                <div style={{display:"flex"}}>
                    <div style={{display:"flex", flexDirection:'column'}}>
                      {/* <label className={className}>{valor}</label> */}
                      <label className={className}>{data}</label>
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
            
        </Card>
        </>
    )
}
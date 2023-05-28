import { Layout } from 'componentes'
import { useState } from 'react'
import { ClienteForm } from './form'
import { Cliente } from 'app/models/clientes'
import { useClienteService } from 'app/services'
import { Alert } from 'componentes/message'

export const CadastroCliente: React.FC = () =>{

const [ cliente, setCliente ] = useState<Cliente>({});
const [messages, setMessages] = useState<Array<Alert>>([])
const service = useClienteService();

const handleSubmit = (cliente: Cliente) => {
   
    if(cliente.id){
        service.atualizar(cliente).then(response =>{
            setMessages([{
                tipo:"success", texto:"Cliente Atualizado com Sucesso"
            }])
        })
    }else{
        service.salvar(cliente).then(clienteSalvo => {
            setCliente(clienteSalvo);
            setMessages([{
                tipo:"success", texto:"Cliente Salvo com Sucesso"
            }])
        })
    }
}


    return(
        <Layout titulo='Clientes' mensagens={messages}>
        <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
         </Layout>
    )
}
import { useState } from 'react'
import { Layout, Input, Message } from 'componentes'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import {converterEmBigDecimal} from 'app/util/money'
import { Alert } from 'componentes/message'
import * as yup from 'yup'
import Link from 'next/link'

const msgCampoObrigatorio = "Campo Obrigatório"

const validationSchema = yup.object().shape({
        sku: yup.string().trim().required(msgCampoObrigatorio),
        nome: yup.string().trim().required(msgCampoObrigatorio),
        descricao: yup.string().trim().required(msgCampoObrigatorio),
        preco: yup.number()
        .required(msgCampoObrigatorio)
        .moreThan(0, "valor Deve ser maior que 0")
})

interface FormErros{
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;

}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string>()
    const [ cadastro, setCadastro ] = useState<string>('')
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [ errors, setErrors ] = useState<FormErros>({})

    const submit = () =>{

        const produto:Produto ={
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(obj=>{
            setErrors({})
            if(id){
                service.atualizar(produto)
                .then(response => {
                    setMessages([{
                        tipo:"success", texto:"Produto Atualizado"
                    }])
                })
            }else{
                service.salvar(produto)
                .then(produtoResposta => {
                    setId(produtoResposta.id)
                    setCadastro(produtoResposta.cadastro || '')
                    setMessages([{
                        tipo:"success", texto:"Produto Salvo"
                    }])
                })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;
            setErrors({
                [field]:message
            })
        })

    }

    return(
        <Layout titulo="Cadastro de Produtos" mensagens={messages} >
            {id && 
                <div className='columns'>
                <Input label='Codigo:' 
                columnClasses='is-half'
                value={id}
                id="inputId"
                disabled={true} 
                />

                <Input label='Data Cadastro:' 
                columnClasses='is-half'
                value={cadastro}
                id="inputDataCadastro" 
                disabled={true}
                />
                </div>
            }

            <div className='columns'>
                <Input label='SKU: *' 
                columnClasses='is-half'
                onChange={setSku}
                value={sku}
                id="inputSku" 
                placeholder='Digite o SKU do Produto'
                error={errors.sku}
                />

                <Input label='Preço: *' 
                columnClasses='is-half'
                onChange={setPreco}
                value={preco}
                id="inputPreco" 
                placeholder='Digite o Preço do Produto'
                currency
                maxLength={16}
                error={errors.preco}
                />
        
            </div>

            <div className='columns'>
            <Input label='Nome: *' 
                columnClasses='is-full'
                onChange={setNome}
                value={nome}
                id="inputNome" 
                placeholder='Digite o Nome do Produtoo'
                error={errors.nome}
                />
            </div>

            <div className='columns'>
            <div className="field column is-full">
                <label className='label' htmlFor='inputDesc'> Descrição: *</label>
                <div className='control'>
                    <textarea className='textarea'
                    id='inputDesc'
                    value={descricao}
                    onChange={e=> setDescricao(e.target.value)}  
                    placeholder='Digite a Descrição detalhada do Produto'/>
                    { errors.descricao &&
                    <p className='help is-danger'>{errors.descricao}</p>
                    }
                </div>
            </div>
            </div>

            <div className='field is-grouped'>
                <div className='control'>
                    <button onClick={submit} className='button'>
                        { id ? "Atualizar": "salvar" }
                    </button>
                </div>
                <div className='control'>
                    <Link href="/consultas/produtos">
                        <button className='button'>voltar</button>
                    </Link>

                </div>
            </div>

        </Layout>
    )
}
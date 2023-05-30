import { Layout } from "componentes/layout"
import { Input, InputCPF } from "componentes/common"
import { useFormik } from "formik"
import { useState } from "react";
import { Cliente } from "app/models/clientes";
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from "primereact/column";
import { Button } from 'primereact/button'
import {confirmDialog } from 'primereact/confirmdialog'
import { Page } from "app/models/common/page";
import { useClienteService } from "app/services";
import Router from "next/router";

interface ConsultaClientesForm{
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () =>{
    
    const service = useClienteService();
    const [ loading, setLoading] = useState<boolean>(false)
    const [clientes, setClientes] = useState<Page<Cliente>>({
        content: [],
        firts: 0,
        number: 0,
        size: 10,
        totalElements:0
    });

    const handleSubmit = (filtro: ConsultaClientesForm) =>{
            handlePage(null);
    }

    const { handleSubmit: formikSubmit, values: filtro, handleChange} = useFormik<ConsultaClientesForm>({
        onSubmit: handleSubmit,
        initialValues: { nome: '', cpf: '' }
    })

    const handlePage = (event: DataTablePageParams)=>{
        setLoading(true)
        service.find(filtro.nome, filtro.cpf, event?.page, event?.rows)
        .then(result =>{
            setClientes({... result, firts: event?.first})
        }).finally(()=> setLoading(false))
    }

    const deletar = ( cliente: Cliente) =>{
        service.deletar(cliente.id).then(result =>{
            handlePage(null)
        })
    }

    const actionTemplate = (registro: Cliente) =>{
        const url = `/cadastros/clientes?id=${registro.id}`
        return(
            <div>
                <Button 
                label="Editat" 
                className="p-button-rounded p-button-info" 
                onClick={e => Router.push(url)}/>
                <Button 
                label="Deletar"
                onClick={ event =>{
                    confirmDialog({
                        message: "Confirma a Exclusão deste Registro ?",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        accept: () => deletar(registro),
                        header: "Confirmação"
                    })
                }} 
                className="p-button-rounded p-button-danger" />
            </div>
        )
    }

    return(
        <Layout titulo="Clientes">

            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input label="nome" 
                    id="nome"
                    columnClasses="is-half"
                    autoComplete="off"
                    onChange={handleChange} 
                    name="nome" 
                    value={filtro.nome}/>

                    <InputCPF label="CPF" 
                    id="cpf"
                    columnClasses="is-half" 
                    name="cpf"
                    onChange={handleChange}  
                    value={filtro.cpf}/>

                </div>
                <div className="field is-grouped">
                    <div className="control is-link">
                        <button type="submit" className='button is-success'>
                        Consultar
                        </button>
                    </div>
                    <div className="control is-link">
                        <button type="submit" 
                        onClick={e => Router.push("/cadastros/clientes")} 
                        className='button is-warning'>
                        Novo
                        </button>
                    </div>
                </div>
            </form>
            <br/>
            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes.content} 
                    totalRecords={clientes.totalElements}
                    lazy
                    paginator
                    first={clientes.firts}
                    rows={clientes.size}
                    onPage={handlePage}
                    loading={loading}
                    emptyMessage="Nenhum Registro">
                        <Column field="id" header="Código" />
                        <Column field="nome" header="Nome" />
                        <Column field="cpf" header="CPF" />
                        <Column field="email" header="Email" />
                        <Column body={actionTemplate}/>
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}
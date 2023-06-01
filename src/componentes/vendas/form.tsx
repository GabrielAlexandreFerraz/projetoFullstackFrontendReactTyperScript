import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { Venda } from "app/models/vendas"
import { useClienteService, useProdutoService } from "app/services";
import { useFormik } from "formik"
import { AutoComplete, AutoCompleteChangeParams, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import { useState } from "react";
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Produto } from "app/models/produtos";
import { error } from "console";


interface VendasFormProps{
    onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
    cliente: null,
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit
}) => {

    const clienteService = useClienteService();
    const produtoService = useProdutoService();
    const [codigoProduto, setCodigoProduto] = useState<String>('')
    const [produto, setProduto] = useState<Produto>(null);
    const [listaClientes, setListaClientes ] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 0,
        totalElements:0
    })
    
    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formScheme
    })
    
    const HandleClienteAutoComplete = ( e: AutoCompleteCompleteMethodParams) => {
            const nome = e.query
            clienteService.find(nome, '', 0, 20)
            .then(clientes => setListaClientes(clientes))
    }
    
    const handleClienteChange = ( e: AutoCompleteChangeParams ) => {
        const clienteSelecionado: Cliente = e.value;
        formik.setFieldValue("cliente", clienteSelecionado)
    }
    
    const handleCodigoProdutoSelect = (event) =>{
            produtoService.carregarProdutos(codigoProduto)
            .then(produtoEncontrado => setProduto(produtoEncontrado))
            .catch(error => console.log(error))
    }

    const handleAddProduto = () => {
        const produtosJaAdicionados = formik.values.produtos;
        produtosJaAdicionados.push(produto);
        setProduto(null)
        setCodigoProduto('')
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                <label htmlFor="cliente"> Cliente: *</label>
                <AutoComplete
                suggestions={listaClientes.content}
                completeMethod={HandleClienteAutoComplete}
                value={formik.values.cliente}
                field="nome" 
                id="cliente" 
                name="cliente"
                onChange={handleClienteChange}
                />
                </div>

                <div className="p-grid">
                    <div className="p-col-2">
                        <span className="p-float-label">
                            <InputText 
                                id="codigoProduto" 
                                onBlur={handleCodigoProdutoSelect}
                                value={codigoProduto}
                                onChange={e => setCodigoProduto(e.target.value)}
                    />
                            <label htmlFor="codigoProduto">Código</label>
                        </span>
                    </div>

                    <div className="p-col-6">
                          <AutoComplete value={produto} field="nome"/> 
                    </div>

                        <div className="p-col-2">
                            <div className="p-float-label">
                                <InputText  id="qtdProduto"/>
                                <label htmlFor="qtdProduto">QTD</label>
                            </div>
                        </div>
                    <div className="p-col-2">
                            <Button label="Adicionar" onClick={handleAddProduto}/>
                    </div>

                </div>

                <Button type="submit" label="Finalizar"/>

            </div>

        </form>
    )
} 
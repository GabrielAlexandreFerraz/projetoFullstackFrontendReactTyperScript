import { Layout } from "componentes"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "app/models/produtos"

export const ListagemProdutos: React.FC = () => {

    const produtos: Produto[] = [{
        id: "1", sku: "TESTE1", nome:"TESTE1", preco:250.00
    },{
        id: "2", sku: "TESTE2", nome:"TESTE2", preco:250.00
    }]

    return(
        <Layout titulo="Produtos">
            <Link href="/cadastros/produtos">
                <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <TabelaProdutos produtos={produtos}/>

        </Layout>
    )
}
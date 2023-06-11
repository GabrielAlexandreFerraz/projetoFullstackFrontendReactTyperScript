import Head from 'next/head'
import { GetStaticProps } from 'next';
import { Layout, Dashboard } from 'componentes'
import { useDashboardService } from 'app/services';
import { DashboardData } from 'app/models/dashboard';
import { Footer } from 'componentes/footer';

interface HomeProps{
  dashboard: DashboardData;
}

const Home:React.FC<HomeProps> = (props: HomeProps) =>{
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo='DashBoard'>
        <Dashboard 
                  clientes={props.dashboard.clientes} 
                  produtos={props.dashboard.produtos}
                  vendas={props.dashboard.vendas}
                  vendasPorMes={props.dashboard.vendasPorMes}/>      

      
      </Layout>
      
    </div>
    
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const service = useDashboardService();
  const dashboard: DashboardData = await service.get();

  return {
    props: {
      dashboard
    }
  }
}


export default Home;
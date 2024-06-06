import { Link } from 'react-router-dom';
import Carrossel from '../../components/Carrossel';
import ListaFilmes from '../../components/ListaFilmes';

function Home (){
    return(
        <>
            <Carrossel/>
            <ListaFilmes/> 
        </>
    );
}

export default Home;
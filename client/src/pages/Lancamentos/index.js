import React from 'react';
import './style.css';
import ListaFilmes from '../../components/ListaFilmes';
import AddFilme from '../../components/AddFilme';


function Lancamentos() {
    return (
        <>

            <AddFilme/> 
            <ListaFilmes/> 
        </>
    );
}

export default Lancamentos;

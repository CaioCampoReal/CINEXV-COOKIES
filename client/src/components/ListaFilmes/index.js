import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import './style.css';

function ListaFilmes() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/");
                console.log('Response Data:', response.data);

                // Converte a dataExtreia para o formato dd/mm hh:mm em uma linha
                const filmesComDataFormatada = response.data.map(filme => ({
                    ...filme,
                    dataExtreia: new Date(filme.dataExtreia.seconds * 1000).toLocaleString("pt-BR", {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$1/$2 $4:$5')
                }));

                setFilmes(filmesComDataFormatada);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="novidade">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="main-title">Lançamentos em Cartaz</h3>
                    </div>
                    {filmes.map((filme) => (
                        <div className="col-md-6" key={filme.id}>
                            <div className="card">
                                <div style={{ padding: '15px'}}>
                                    <div className='card-img-box'>
                                        <img 
                                        src={filme.poster}
                                        className="card-img-filme" 
                                        alt={`Poster de ${filme.nome}`}
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{filme.nome}</h5>
                                    <p className="card-text">{filme.genero}</p>
                                    <p className="card-text">Extreia {filme.dataExtreia}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ListaFilmes;

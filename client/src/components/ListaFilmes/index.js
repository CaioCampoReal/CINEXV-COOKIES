import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importe useLocation
import api from "../../services/api";
import './style.css';

export default function ListaFilmes() {
    const [filmes, setFilmes] = useState([]);
    const [idEscolhido, setIdEscolhido] = useState("");
    const [nomeAuxiliar, setNomeAuxiliar] = useState("");
    const [generoAuxiliar, setGeneroAuxiliar] = useState("");
    const [dataExtreiaAuxiliar, setDataExtreiaAuxiliar] = useState("");
    const [posterAuxiliar, setPosterAuxiliar] = useState("");
    const location = useLocation(); // Obtenha a URL atual

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/");
                const filmesComDataFormatada = response.data.map(filme => ({
                    ...filme,
                    // Converte a dataExtreia para o formato dd/mm hh:mm em uma linha
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

    async function editaFilme() {
        try {
            await api.put(`/${idEscolhido}`, {
                nome: nomeAuxiliar,
                genero: generoAuxiliar,
                dataExtreia: dataExtreiaAuxiliar,
                poster: posterAuxiliar
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao editar filme:', error);
        }
    }

    async function deletaFilme(id) {
        try {
            await api.delete(`/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir filme:', error);
        }
    }

    // Verifica se a URL atual é diferente de "http://localhost:3000/lancamentos"
    const shouldHideButtons = location.pathname !== "/lancamentos";

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
                                    <p className="card-text">Estreia {filme.dataExtreia}</p>
                                    {/* Renderiza os botões apenas se shouldHideButtons for false */}
                                    {!shouldHideButtons && (
                                        <div className="d-flex justify-content-between">
                                            <button 
                                                className="btn btn-primary"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#editarFilmeModal"
                                                onClick={() => {
                                                    setIdEscolhido(filme.id);
                                                    setNomeAuxiliar(filme.nome);
                                                    setGeneroAuxiliar(filme.genero);
                                                    setDataExtreiaAuxiliar(filme.dataExtreia);
                                                    setPosterAuxiliar(filme.poster);
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" onClick={() => deletaFilme(filme.id)}>Excluir</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Edição de Filme */}
            <div className="modal fade" id="editarFilmeModal" tabIndex="-1" aria-labelledby="editarFilmeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editarFilmeModalLabel">Editar Filme</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="nome" value={nomeAuxiliar} onChange={(e) => setNomeAuxiliar(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genero" className="form-label">Gênero</label>
                                    <input type="text" className="form-control" id="genero" value={generoAuxiliar} onChange={(e) => setGeneroAuxiliar(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataExtreia" className="form-label">Data de Estreia</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="dataExtreia" 
                                        value={dataExtreiaAuxiliar} 
                                        onChange={(e) => setDataExtreiaAuxiliar(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="poster" className="form-label">Poster</label>
                                    <input type="text" className="form-control" id="poster" value={posterAuxiliar} onChange={(e) => setPosterAuxiliar(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => editaFilme()}>Salvar Alterações</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

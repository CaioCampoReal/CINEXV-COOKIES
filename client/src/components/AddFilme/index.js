import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FaPlus } from "react-icons/fa";
import { Timestamp } from "firebase/firestore"; // Importando Timestamp do Firebase

export default function AddFilme() {
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [dataExtreia, setDataExtreia] = useState("");
    const [poster, setPoster] = useState("");
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        api.get("/")
            .then((r) => setFilmes(r.data))
            .catch((error) => console.log(error));
    }, []);

    async function handleAdd(event) {
        event.preventDefault();

        // Converte a data de estreia para um timestamp do Firebase
        const dataExtreiaTimestamp = Timestamp.fromDate(new Date(dataExtreia));

        try {
            const response = await api.post("/add", {
                nome,
                genero,
                dataExtreia: dataExtreiaTimestamp,
                poster,
            });

            // Assuming the response contains the added filme
            const newFilme = response.data;
            setFilmes([...filmes, newFilme]);

            // Limpar os campos do formulário
            setNome("");
            setGenero("");
            setDataExtreia("");
            setPoster("");

            // Fechar o modal
            document.getElementById("adicionar").classList.remove("show");
            document.body.classList.remove("modal-open");
            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                modalBackdrop.remove();
            }

            // Redirecionar para a página de lançamentos
            window.location.href = "/lancamentos";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ paddingTop: '150px' }}>
            <div className="d-flex justify-content-center px-4">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adicionar">
                    Novo
                </button>
            </div>

            <div className="modal fade" id="adicionar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Adicionar Filme</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="adicionar1" className="align-items-center d-flex flex-column needs-validation" onSubmit={handleAdd}>
                                <div className="col-md-10">
                                    <label htmlFor="nome" className="form-label">Nome:</label>
                                    <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="genero" className="form-label">Gênero:</label>
                                    <input type="text" className="form-control" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="dataExtreia" className="form-label">Data de Estreia:</label>
                                    <input type="date" className="form-control" id="dataExtreia" value={dataExtreia} onChange={(e) => setDataExtreia(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="poster" className="form-label">Poster:</label>
                                    <input type="text" className="form-control" id="poster" value={poster} onChange={(e) => setPoster(e.target.value)} required />
                                </div>
                                <div className="col-12 my-2">
                                    <button className="btn btn-primary" type="submit">Adicionar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

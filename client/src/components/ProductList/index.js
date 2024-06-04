import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./style.css";


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [idEscolhido, setIdEscolhido] = useState()
    const [nomeAuxiliar, setNomeAuxiliar] = useState();
    const [precoAuxiliar, setPrecoAuxiliar] = useState();
    const [fornecedoreAuxiliar, setFornecedorAuxiliar] = useState();
    const [estoqueAuxiliar, setEstoqueAuxiliar] = useState();


    useEffect(() => {

        api.get("/")
            .then((r) => setProducts(r.data))
            .catch((error) => console.log(error));
    }, [])

    async function editaProduto() {
        await api.put(`/${idEscolhido}`, {
            name: nomeAuxiliar,
            price: precoAuxiliar,
            retailer: fornecedoreAuxiliar,
            amountInStock: estoqueAuxiliar
        }).then(() => window.location.reload()).catch((error) => console.log(error));
    }

    async function deletaProduto(id) {
        api.delete(`/${id}`).then(() => window.location.reload());
    }


    return (
        <div>
            <h1>Produtos</h1>      
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead >
                        <tr>
                            <th scope="col" className="p-3 fonte-lato">Produto</th>
                            <th scope="col" className="p-3 fonte-lato">Fornecedor</th>
                            <th scope="col" className="p-3 fonte-lato">Estoque</th>
                            <th scope="col" className="p-3 fonte-lato">Preço</th>
                            <th scope="col" className="p-3 fonte-lato">Opções</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider"></tbody>
                    {products.map((product) => (
                        <>
                            <tr>
                                <td className="fonte-lato bold">{product.name}</td>
                                <td>{product.retailer}</td>
                                <td>{product.amountInStock}</td>
                                <td className="text-success">R$ {product.price}</td>
                                <td>
                                    <div>
                                        <button className="btn" type="button" data-bs-toggle="modal" data-bs-target="#editar" onClick={() => {
                                            setIdEscolhido(product.id)
                                            setNomeAuxiliar(product.name);
                                            setPrecoAuxiliar(product.price);
                                            setFornecedorAuxiliar(product.retailer);
                                            setEstoqueAuxiliar(product.amountInStock)
                                        }}>Editar</button>

                                        <button className="btn" data-bs-toggle="modal" data-bs-target="#deletar">Deletar</button>
                                    </div>

                                </td>


                            </tr>
                            <div class="modal fade" id="deletar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deletar" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            Tem certeza que deseja excluir este produto?
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                            <button type="button" class="btn btn-outline-danger" onClick={() => deletaProduto(product.id)}>Excluir</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="editar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edite seu produto</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form className="column">
                                                <div className="col">
                                                    <label for="validationCustom01" className="form-label">Produto:</label>
                                                    <input type="text" className="form-control" id="validationCustom01" value={nomeAuxiliar} onChange={(e) => setNomeAuxiliar(e.target.value)} required />
                                                </div>
                                                <div className="col">
                                                    <label for="validationCustom02" className="form-label">Preço: </label>
                                                    <input type="text" className="form-control" id="validationCustom02" value={precoAuxiliar} onChange={(e) => setPrecoAuxiliar(e.target.value)} required />
                                                </div>
                                                <div className="col">
                                                    <label for="validationCustom03" className="form-label">Fornecedor: </label>
                                                    <input type="text" className="form-control" id="validationCustom03" value={fornecedoreAuxiliar} onChange={(e) => setFornecedorAuxiliar(e.target.value)} required />
                                                </div>
                                                <div className="col">
                                                    <label for="validationCustom04" className="form-label">Em estoque: </label>
                                                    <input type="text" className="form-control" id="validationCustom04" value={estoqueAuxiliar} onChange={(e) => setEstoqueAuxiliar(e.target.value)} required />
                                                </div>

                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => editaProduto()}>Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    ))}
                </table>
            </div>
        </div>
    );
}
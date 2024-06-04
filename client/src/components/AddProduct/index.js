import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FaPlus } from "react-icons/fa";

export default function AddProduct() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [estoque, setEstoque] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/")
            .then((r) => setProducts(r.data))
            .catch((error) => console.log(error));
    }, []);

    async function handleAdd(event) {
        event.preventDefault();

        try {
            const response = await api.post("/add", {
                name: nome,
                price: preco,
                retailer: fornecedor,
                amountInStock: estoque,
            });

            // Assuming the response contains the added product
            const newProduct = response.data;
            setProducts([...products, newProduct]);

            // Clear form inputs
            setNome("");
            setPreco("");
            setFornecedor("");
            setEstoque("");

            // Close the modal (Bootstrap specific way)
            window.$('#adicionar').modal('hide');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center px-4">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adicionar">
                    Novo
                </button>
            </div>

            <div className="modal fade" id="adicionar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Adicionar produto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="adicionar1" className="align-items-center d-flex flex-column needs-validation" onSubmit={handleAdd}>
                                <div className="col-md-10">
                                    <label htmlFor="validationCustom01" className="form-label">Nome produto:</label>
                                    <input type="text" className="form-control" id="validationCustom01" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="validationCustom02" className="form-label">Preço:</label>
                                    <input type="text" className="form-control" id="validationCustom02" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="validationCustom03" className="form-label">Fornecedor:</label>
                                    <input type="text" className="form-control" id="validationCustom03" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="validationCustom04" className="form-label">Em estoque:</label>
                                    <input type="text" className="form-control" id="validationCustom04" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
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

// import {
//     createProduct,
//     getProducts,
//     getProduct,
//     updateProduct,
//     deleteProduct,
// } from "../productController.js";
// const router = express.Router();
// // Rotas para os produtos
// router.post('/add', createProduct);
// router.get('/', getProducts);
// router.get('/:id', getProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);
// export default router;
import express from 'express';

import {
    createFilme,
    getFilmes,
    getFilme,
    updateFilme,
    deleteFilme,
} from "../filmeController.js";
const router = express.Router();
// Rotas para os produtos
router.post('/add', createFilme);
router.get('/', getFilmes);
// router.get('/*', getFilmes);
router.get('/filmes', getFilmes);
router.get('/:id', getFilme);
router.put('/:id', updateFilme);
router.delete('/:id', deleteFilme);
export default router;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from './pages/Home';
// import Sobre from './pages/Sobre';
// import Lancamentos from "./pages/Lancamentos";
// import Contato from "./pages/Contato";


// import Header from './components/Header';

// function RoutesApp(){
//     return(
//         <BrowserRouter>
//             <Header/>
//             <Routes>
//                 <Route path="/" element={<Home/>}/>
//                 <Route path="/sobre" element={<Sobre/>}/>
//                 <Route path="/Lancamentos" element={<Lancamentos/>}/>
//                 <Route path="/Contato" element={<Contato/>}/>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default RoutesApp;
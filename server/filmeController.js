import firebase from './firebase.js';
import Filme from './filmeModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
const db = getFirestore(firebase);
// Criar um produto
export const createFilme = async (req, res, next) => {
    try {
        console.log('cheguei')
        const data = req.body;
        await addDoc(collection(db, 'filmes'), data);
        res.status(200).send('Produto criado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Ler todos os produtos
export const getFilmes = async (req, res, next) => {
    try {

        const collectionRef = collection(db, 'filmes');
        const filmes = await getDocs(collectionRef);
    
        const filmeData = filmes.docs.map((doc) =>  new Filme(doc.id, doc.data().nome, doc.data().genero, doc.data().dataExtreia, doc.data().poster)
); // Extract data
        
        res.status(200).send(filmeData);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
// Ler um produto específico
export const getFilme = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filmeRef = doc(db, 'filmes', id)
        const filme = await getDoc(filmeRef);
        
        if (filme.exists()) {
            res.status(200).send(filme.data());
        } else {
            res.status(404).send('Produto não encontrado!');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
// Atualizar um produto
export const updateFilme = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const filme = doc(db, 'filmes', id);
        await updateDoc(filme, data);
        res.status(200).send('Produto atualizado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
// Deletar um produto
export const deleteFilme = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, 'filmes', id));
        res.status(200).send('Produto deletado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
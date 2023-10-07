import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req,res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar livros`})
        }        
    }

    static async listarLivroPorId (req,res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar livro`})
        }        
    }

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const LivroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(LivroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro`})
        }
    }

    static async atualizarLivro (req,res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar livro`})
        }        
    }

    static async excluirLivro (req,res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro excluído"});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir livro`})
        }        
    }
};

export default LivroController;
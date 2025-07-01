const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
require('dotenv').config();

// conexao e seed do banco de dados
require("./db/connection.js");
const Projeto = require("./db/models/model.js");
require("./db/seedProjects.js");

const app = express()
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json())
app.use(cors())


app.use(express.static(__dirname + "../../feira-ciencias/dist/"));

// venvs
const BACKEND_PORT = process.env.BACKEND_PORT || 8081;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8080;
const IP = process.env.IP || 8080;
const FRONTEND_LOCAL_URL = `https://localhost:${FRONTEND_PORT}`; // URL local do frontend
const FRONTEND_LOCAL_URL_http = `http://localhost:${FRONTEND_PORT}`;
const FRONTEND = `http://${IP}:${FRONTEND_PORT}`;
const FRONTEND_NGROK_URL = process.env.FRONTEND_NGROK_URL;

const allowedOrigins = [
  `http://localhost:${BACKEND_PORT }`,
    FRONTEND,
    FRONTEND_LOCAL_URL_http,
    FRONTEND_NGROK_URL,
    FRONTEND_LOCAL_URL, // Permite o acesso do localhost do seu PC (http)
    `http://127.0.0.1:${FRONTEND_PORT}`, // Para garantir acesso via IP local (http)
    `http://localhost:${FRONTEND_PORT}`, // Outra forma de localhost (http)
];

// cors
app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);
        console.log(allowedOrigins)
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `A política CORS para este site não permite acesso da origem especificada: ${origin}.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// serve o frontend 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'index.html'));
});

// retorna informacoes de um projeto
app.get('/projeto/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const project = await Projeto.findOne({ _id: id });

        if (project) {
            res.json(project);
        } else {
            console.log(`Projeto com ID '${id}' não encontrado.`);
            res.status(404).json({ message: `Projeto com ID '${id}' não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao buscar projeto '${id}':`, error);
        // Para qlqr outro erro de servidor
        res.status(500).json({ message: 'Erro interno do servidor ao buscar o projeto.' });
    }
});

// post avaliacao
// calcula a media de avaliacoes de um projeto
app.post('/avaliar/:id/:nota', async (req, res) => {
    const { id } = req.params[0]
    const { nota } = req.params[1]
    console.log(id, nota)

    try {
        const project = await Projeto.findOne({ _id: id });

        if (project) {
            project.num_de_avaliacoes += 1;
            project.avaliacao =  (project.avaliacao + int(nota)) / project.num_de_avaliacoes            
            res.status(200)
        } else {
            console.log(`Projeto com ID '${id}' não encontrado.`);
            res.status(404).json({ message: `Projeto com ID '${id}' não encontrado.` });
        }
    } catch (error) {
        console.error(`Erro ao buscar projeto '${id}':`, error);
        // Para qlqr outro erro de servidor
        res.status(500).json({ message: 'Erro interno do servidor ao buscar o projeto.' });
    }  
});

app.listen(BACKEND_PORT, () => {
    console.log("Server running on: ", BACKEND_PORT)
})
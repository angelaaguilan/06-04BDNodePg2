const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { agregarPost, consultarPosts, modificarPost, eliminarPost } = require('./consultas.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).send(error.message) ;
    }
})

app.get('/posts', async (req, res) => {
    try {
        const data = await consultarPosts();
        res.status(200).json(data);    
    } catch (error) {
        res.status(500).send(error);
    }
})

// inserta nuevo post
app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion }= req.body;
        const { rows, rowCount } = await agregarPost(titulo, img, descripcion);
        if (rowCount === 1) {
            res.status(201).json({success: true, msg: "Nuevo Post agregado"});
        } else {
            // 400 error de datos
            res.status(400).json({success: false, msg: "Error en la operación"});
        }
    } catch (error) {
        // 400 error de servidor
        res.status(500).send(error);
    }
})

// like
app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id }= req.params;
        const { rowCount } = await modificarPost(id);
        if (rowCount === 1) {
            res.status(201).json({success: true, msg: "Post modificado (Like)"});
        } else {
            res.status(400).json({success: false, msg: "Error en la operación"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

// borrar
app.delete('/posts/:id', async (req, res) => {
    try {
        const { id }= req.params;
        const { rowCount } = await eliminarPost(id);
        if (rowCount === 1) {
            res.status(201).json({success: true, msg: "Post eliminado"});
        } else {
            res.status(400).json({success: false, msg: "Error en la operación"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
})
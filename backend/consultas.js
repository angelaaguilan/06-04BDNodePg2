// ARCHIVO CONTROLLER POR QUE TIENE LÓGICA DE NEGOCIO
const pool = require("./bd/conexion.js");

const agregarPost = async(titulo, img, descripcion) => {
    const query = `INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, 0)`;
    const values = [titulo, img, descripcion];
    const insert = await pool.query(query, values);
    return (insert);
}

const consultarPosts = async() => {
    const query = `SELECT * FROM posts ORDER BY id;`;
    const {rows, rowCount} = await pool.query(query);
    return(rows);
}

const modificarPost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1;"
    const values = [id]
    const updatePost = await pool.query(consulta, values)
    return (updatePost);
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1;"
    const values = [id]
    const deletePost = await pool.query(consulta, values)
    return (deletePost);
}

module.exports = { agregarPost, consultarPosts, modificarPost, eliminarPost }

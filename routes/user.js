const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');


user.post("/login", async (req, res, next) =>{
    const {correo, contrasena} = req.body;
    const query = `SELECT * FROM empleados WHERE correo = '${correo}' AND contrasena = '${contrasena}';`
    const rows = await db.query(query);
    if(correo && contrasena){
    if (rows.length == 1) {
        if(rows[0].puesto=="admin")
        {
        const token = jwt.sign({
            correo: rows[0].correo,
            contrasena: rows[0].contrasena
        }, "debugkey");
        return res.status(200).json({code: 200, message: token});
        }
        return res.status(200).json({code: 400, message: "usuario no tiene permisos de administrador"});
    } else {
        return res.status(200).json({code: 400, message: "usuario y contraseña no encontrado"});
    }
}
    
});



module.exports = user;
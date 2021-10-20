const express = require('express');
const empleados = express.Router();
const db = require('../config/database');


empleados.post("/buscar", async (req,res, next)=>{
    const {id, nombre} = req.body;
    if(nombre){
        const empleados = await db.query("SELECT * FROM empleados WHERE nombre = '" + nombre +"'");
        return res.status(200).json({code:200, message: empleados});
    }
    if(id){
        const empleados = await db.query("SELECT * FROM empleados WHERE ID = " + (id) );

        return res.status(200).json({code:200, message: empleados});

    }
    return res.status(404).send({code:404, message: "id y nombre vacio"});
});

empleados.post("/", async (req, res, next)=>
{
    const { nombre, apellidos, correo, contrasena, telefono, direccion} = req.body;
    if (nombre && apellidos && correo && contrasena && telefono && direccion) {
        let query = "INSERT INTO empleados(nombre, apellidos, correo, contrasena, telefono, direccion)";
        query += `VALUES('${nombre}', '${apellidos}', '${correo}', '${contrasena}', ${telefono}, '${direccion}')`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message:"empleado insertado correctamente"}); 
        } 
        return res.status(500).json({code:500, message: "Ocurrio un error"});;
    }
    return res.status(500).json({code: 500, message: "campos incompletos"})
});




 empleados.delete("/", async (req, res, next)=>{
    const {id, nombre} = req.body;
     if (nombre) {
     const query = `DELETE FROM empleados WHERE nombre = '${nombre}'`;
     const rows = await db.query(query);
     if (rows.affectedRows == 1) {
        return res.status(200).json({code:200, message: `empleado  ${nombre} borrado correctamente`});
    }
    else
    {
        return res.status(404).json({code: 404, message: `empleado  ${nombre} no encontrado`});
    }
    }
    if  (id) {
        const query = `DELETE FROM empleados WHERE ID=${id}`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
           return res.status(200).json({code:200, message: `empleado ${id} borrado correctamente`});
       }
       else
    {
        return res.status(404).json({code: 404, message: `empleado ${id} no encontrado correctamente`});
    }
    }
   return res.status(404).json({code: 404, message: "id y nombre vacios"});
});




empleados.put("/:name([A-Za-z]+)", async (req, res, next)=>{
    const { nombre, apellidos, correo, contrasena, telefono, direccion} = req.body;
    let query = `UPDATE empleados SET apellidos='${apellidos}'`;
    query += `, correo='${correo}', contrasena= '${contrasena}', telefono = ${telefono}, direccion = '${direccion}' WHERE nombre = '${nombre}';`;
    console.log(query);
    if (nombre && apellidos && correo && contrasena && telefono && direccion) {
    const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({code:200, message: `empleado ${req.params.name} actualizado correctamente`});
        }
        return res.status(404).json({code: 404, message: "empleado no encontrado"});
    }
    return res.status(500).json({code: 500, message: "campos incompletos para actulizar"})
});



module.exports = empleados;
const mysql = require('./db');

const Profesor = function(profesor){
    this.clavep = profesor.clavep;
    this.nombre = profesor.nombre;
    this.apellidos = profesor.apellidos;
    this.direccion = profesor.direccion;
    this.telefono = profesor.telefono;
    this.correo = profesor.correo;
};

Profesor.create= (nuevoProfesor, result)=>{
    mysql.query("INSERT INTO profesor SET ?", nuevoProfesor, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Crear nuevo profesor: ", {idprofesor: res.idprofesor, ...nuevoProfesor});
        result(null, {idprofesor: res.idprofesor, ...nuevoProfesor});
    });
};

Profesor.getAll = result=>{
    mysql.query("SELECT * FROM profesor", (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Profesor: ", res);
        result(null, res);
    });
};

Profesor.remove=(idprofesor, result)=>{
    mysql.query("DELETE FROM profesor where idprofesor = ?", idprofesor, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result (null, err);
            return;
        }

        if(res.affectedRows==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Se ha eliminado correctamente: ", idprofesor);
        result(null, res);
    });
};

Profesor.findById=(idprofesor, result)=>{
    mysql.query(`SELECT * FROM profesor WHERE idprofesor = ${idprofesor} `, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("No hay profesor: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "No se ha encontrado"}, null);
    });
};

Profesor.updateById=(idprofesor,profesor,result)=>{
    mysql.query(
        "UPDATE profesor SET clavep= ?, nombre=?, apellidos=?, direccion=?, telefono=?, correo=? WHERE idprofesor=?",
        [profesor.clavep, profesor.nombre, profesor.apellidos, profesor.direccion, profesor.telefono, profesor.correo, idprofesor],
        (err, res)=>{
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({kind: "not_found"},null);
                return;
            }

            console.log("update profesor: ", {idprofesor: idprofesor, ...profesor});
            result(null, {idprofesor: idprofesor, ...profesor});
        }
    );
};

module.exports = Profesor;
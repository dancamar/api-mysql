const Profesor = require("../models/profesor.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No se ha realizado la conexion",
    });
  }

  const profesor = new Profesor({
    clavep: req.body.clavep,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
  });

  Profesor.create(profesor, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al guardar los datos",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Profesor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "No se ha establecido la conexion",
      });
    else res.send(data);
  });
};


exports.delete=(req, res)=>{
    Profesor.remove(req.params.idprofesor, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idprofesor}`
                });
            }else {
                res.status(500).send({
                    message: "Se ha eliminado con exito con el id solicitado" + req.params.idprofesor
                });
            }
        }else 
        res.send({message: 'El profesor se ha elminado con exito'})
    });
};

exports.findOne=(req,res)=>{
    Profesor.findById(req.params.idprofesor, (err, data)=>{
        if(err){
            if(err.kind === "Profesor no enncontrado"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idprofesor}`
                });
            } else{
                res.status(500).send({
                    message: "Error al buscar el profesor"
                });
            }
        }else res.send(data);
    });
};


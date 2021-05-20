module.exports = app => {
    const profesor = require ('../controllers/profesor.controller');


    app.post("/create",profesor.create);
    app.get("/buscar", profesor.findAll);
    app.delete("/eliminar/:idprofesor",profesor.delete);
    app.get("/BuscarOne/:idprofesor", profesor.findOne);
}
import URL_RUTA from  '../urls/index'; 

class Api {
   
/*CATEGORIAS */
    async GetCategorias(){
        const query = await fetch(`${URL_RUTA.GET_CATEGORIAS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return query;
    }
    /*ARTICULOS */
    async GetArticulos(){
        const query = await fetch(`${URL_RUTA.GET_ARTICULOS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return query;
    }
    //Agregar los articulos
    async PostArticulos(numeroRegistro,nombre,descripcion){
        let formdata = new URLSearchParams();
        formdata.append('numeroRegistro', numeroRegistro);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        const query = await fetch(`${URL_RUTA.POST_ARTICULOS}`, {
            method: 'POST',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            },
            body: formdata
        })
        return query;
    }
    //Editar los articulos
    async PutArticulos(numeroRegistro,nombre,descripcion,id){
        let formdata = new URLSearchParams();
        formdata.append('numeroRegistro', numeroRegistro);
        formdata.append('nombre', nombre);
        formdata.append('descripcion', descripcion);
        formdata.append('id', id);
        const query = await fetch(`${URL_RUTA.PUT_ARTICULOS}`, {
            method: 'PUT',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            },
            body: formdata
        })
        return query;
    }
    

}

export default new Api();
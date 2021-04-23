import URL_RUTA from  '../urls/index'; 

class Api {
   
    /*----------CATEGORIAS ------------------*/
    async GetCategorias(){
        const query = await fetch(`${URL_RUTA.GET_CATEGORIAS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return query;
    }
    //Agregar las categorias
    async PostCategorias(nombreCategoria){
        let formdata = new URLSearchParams();
        formdata.append('nombreCategoria', nombreCategoria);
        const query = await fetch(`${URL_RUTA.POST_CATEGORIAS}`, {
            method: 'POST',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            },
            body: formdata
        })
        return query;
    }
    //editar las categorias
    async PutCategorias(nombreCategoria,id){
        let formdata = new URLSearchParams();
        formdata.append('nombreCategoria', nombreCategoria);
        formdata.append('id', id);
        const query = await fetch(`${URL_RUTA.PUT_CATEGORIAS}`, {
            method: 'PUT',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            },
            body: formdata
        })
        return query;
    }
    //Eliminar las categorias
    async DeleteCategorias(id){
        const query = await fetch(`${URL_RUTA.DELETE_CATEGORIAS+id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            }
        })
        return query;
    }
    /*--------ARTICULOS----------- */
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
      //Eliminar los articulos
      async DeleteArticulos(id){
        const query = await fetch(`${URL_RUTA.DELETE_ARTICULOS+id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' 
            }
        })
        return query;
    }
    

}

export default new Api();
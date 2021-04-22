import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import API from '../Api/providers/index'
const Tabla = ()=>{
 
    //Variables
    const [arrayCategoria,setArrayCategoria] = useState([]);
    //HOOK 
    useEffect(() => {
        listadoCategorias();
      }, []);
   
    const listadoCategorias = () =>{
        API.GetCategorias()
        .then((data) => data.json())
        .then((dataJson) => {
            console.log("datos",dataJson)
            setArrayCategoria(dataJson.categorias)
        })
        .catch((error) => {
            console.log('Error ', error);
        });  
    }
    const alerta = ()=>{
        Swal.fire({
            title: 'Eliminado!',
            text: 'Dato eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
    }

    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th >#</th>
                    <th >Nombre categoria</th>
                    <th ><button className="btn btn-success">Agregar </button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrayCategoria.length === 0 ? <tr>No hay datos</tr>:
                        arrayCategoria.map((categoria,i) =>{
                            return (
                                <tr key={categoria.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{categoria.nombre_categoria}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-lg-auto">
                                                <button className="btn btn-warning">Editar </button>
                                            </div>
                                            <div className="col-lg-auto">
                                            <button className="btn btn-danger">Eliminar </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                   
                   
                </tbody>
            </table>
        </>
    )
}
export default Tabla;
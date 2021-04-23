import React, { useState,useEffect } from 'react';
import { Button, Modal} from 'react-bootstrap';
import {Input} from 'reactstrap';
import Swal from 'sweetalert2';
import API from '../Api/providers/index'
const Tabla = ()=>{
    //VARIABLES PARA EL MODAL AGREGAR
    const [nombreCategoria, setnombreCategoria] = useState('');
    //VARIABLES PARA EL MODAL EDITAR
    const [editIdCategoria, seteditIdCategoria] = useState('');
    const [editNombreCategoria, seteditNombreCategoria] = useState('');
    //VARIABLES PARA ABRIR Y CERRAR MODAL AGREGAR
    const [show, setShow] = useState(false);
    const cerrarModalAgregar = () => setShow(false);
    const abrirModal = () => setShow(true);
    //VARIABLES PARA ABRIR Y CERRAR MODAL EDITAR
    const [EditShow, setEditShow] = useState(false);
    const cerrarModalEdit = () => setEditShow(false);
    const abrirModalEdit = (id,nombrecat) =>{
        setEditShow(true);
        seteditIdCategoria(id);
        seteditNombreCategoria(nombrecat);
    } 
    //Variables
    const [arrayCategoria,setArrayCategoria] = useState([]);
    //HOOK 
    useEffect(() => {
        listadoCategorias();
      }, []);
    //ONCHANGE DE LOS INPUT DE MODAL AGREGAR ARTICULOS
    const inputChangeNombreCategoria=(e)=>{
        const { target: { value = '' } = {} } = { ...e };
        setnombreCategoria(value)
  
    }
       //ONCHANGE DE LOS INPUT DE MODAL EDITAR ARTICULOS
       const inputChangeEditNombreCategoria=(e)=>{
        const { target: { value = '' } = {} } = { ...e };
        seteditNombreCategoria(value);
      }
     //---------Funciones para accionar las api---------------
     //--Obtener el listado de categorias---------
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
// Funcion para agregar las categorias
const agregarCategoria = ()=>{
    if(nombreCategoria === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El nombre de la categoria no puede estar vacio',
            icon: 'info',
          })
    }else{
        API.PostCategorias(nombreCategoria)
        .then((data) => data.json())
        .then((dataJson) => {
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Guardado!',
                    text: 'Categoria agregada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoCategorias();
                  cerrarModalAgregar(true);
            }else{
                Swal.fire({
                    title: 'Atención!',
                    text: dataJson.message,
                    icon: 'info',
                  })
            }
        })
        .catch((error) => {
            console.log('Error ', error);
        });  
        
    }
}
// Funcion para editar las categorias
const editarCategoria = ()=>{
    if(editNombreCategoria === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El nombre de la categoria no puede estar vacio',
            icon: 'info',
          })
    }else{
        API.PutCategorias(editNombreCategoria,editIdCategoria)
        .then((data) => data.json())
        .then((dataJson) => {
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Actualizado!',
                    text: 'Categoria actualizada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoCategorias();
                  cerrarModalEdit(true);
            }else{
                Swal.fire({
                    title: 'Atención!',
                    text: dataJson.message,
                    icon: 'info',
                  })
            }
        })
        .catch((error) => {
            console.log('Error ', error);
        });  
        
    }
   
}
//Funcion para eliminar la categoria
const borrarCategoria = (id)=>{
    Swal.fire({
        title: '¿Estas seguro de eliminar la categoria?',
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            API.DeleteCategorias(id)
            .then((data) => data.json())
            .then((dataJson) => {
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'Categoria eliminada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoCategorias();
            }else{
                Swal.fire({
                    title: 'Atención!',
                    text: dataJson.message,
                    icon: 'info',
                  })
            }
        })
        .catch((error) => {
            console.log('Error ', error);
        });  
        }
      })
  
}

    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th >#</th>
                    <th >Nombre categoria</th>
                    <th ><Button color="info" onClick={abrirModal}>Agregar </Button></th>
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
                                                <Button className="btn btn-warning" onClick={() => abrirModalEdit(categoria.id,categoria.nombre_categoria)}>Editar </Button>
                                            </div>
                                            <div className="col-lg-auto">
                                                <Button className="btn btn-danger" onClick={() => borrarCategoria(categoria.id)}>Eliminar </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                   
                   
                </tbody>
            </table>
            {/*---------Modal para agregar categoria */}
            <Modal show={show} onHide={cerrarModalAgregar} centered>
                <Modal.Header >
                    <Modal.Title>Agregar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                       <div className="row">
                           <div className="col-lg-6">
                               <label>Nombre categoria</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={nombreCategoria}
                                    type="text"
                                    maxLength={50}
                                    onChange={inputChangeNombreCategoria}
                                />
                           </div>
                       </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModalAgregar}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={()=>agregarCategoria()}>
                   Guardar cambios
                </Button>
                </Modal.Footer>
            </Modal>
              {/**---------------Modal para editar categoria*/}
              <Modal show={EditShow} onHide={cerrarModalEdit} centered>
                <Modal.Header>
                    <Modal.Title>Editar categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                       <div className="row">
                           <div className="col-lg-6">
                               <label>Nombre categoria</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={editNombreCategoria}
                                    type="text"
                                    maxLength={10}
                                    onChange={inputChangeEditNombreCategoria}
                                />
                           </div>
                       </div>
                      
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModalEdit}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={()=>editarCategoria()}>
                   Guardar cambios
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Tabla;
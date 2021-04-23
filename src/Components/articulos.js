import React, { useState,useEffect } from 'react';
import { Button, Modal} from 'react-bootstrap';
import {Input} from 'reactstrap';
import Swal from 'sweetalert2';
import API from '../Api/providers/index'
const Articulos = ()=>{
    //VARIABLES PARA EL MODAL AGREGAR
    const [numeroRegistro, setNumeroRegistro] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    //VARIABLES PARA EL MODAL EDITAR
    const [editIdArticulo, seteditIdArticulo] = useState('');
    const [editNumeroRegistro, seteditNumeroRegistro] = useState('');
    const [editNombre, seteditNombre] = useState('');
    const [editDescripcion, seteditDescripcion] = useState('');
    //VARIABLES PARA ABRIR Y CERRAR MODAL AGREGAR
    const [show, setShow] = useState(false);
    const cerrarModalAgregar = () => setShow(false);
    const abrirModal = () => setShow(true);
    //VARIABLES PARA ABRIR Y CERRAR MODAL EDITAR
    const [EditShow, setEditShow] = useState(false);
    const cerrarModalEdit = () => setEditShow(false);
    const abrirModalEdit = (id,numero,nombre,descripcion) =>{
        setEditShow(true);
        seteditIdArticulo(id);
        seteditNumeroRegistro(numero);
        seteditNombre(nombre);
        seteditDescripcion(descripcion);
    } 
    //ARRAY PARA LISTAR LOS ARTICULOS
    const [arrayArticulos,setArrayArticulos] = useState([]);
    //HOOK 
    useEffect(() => {
        listadoArticulos();
      }, []);
   //ONCHANGE DE LOS INPUT DE MODAL AGREGAR ARTICULOS
   const inputChangeNumeroRegistro=(e)=>{
    let regex = new RegExp("^[a-zA-Z ]+$");
    const { target: { value = '' } = {} } = { ...e };
    if (regex.test(value)) {
        setNumeroRegistro('')
      } else {
        setNumeroRegistro(value);
      }
  }
   const inputChangeNombre=(e)=>{
    const { target: { value = '' } = {} } = { ...e };
    setNombre(value)
  }
   const inputChangeDescripcion=(e)=>{
 
    const { target: { value = '' } = {} } = { ...e };
    setDescripcion(value)
  }
   //ONCHANGE DE LOS INPUT DE MODAL EDITAR ARTICULOS
   const inputChangeEditNumeroRegistro=(e)=>{
    let regex = new RegExp("^[a-zA-Z ]+$");
    const { target: { value = '' } = {} } = { ...e };
    if (regex.test(value)) {
        seteditNumeroRegistro('')
      } else {
        seteditNumeroRegistro(value);
      }
  }
   const inputChangeEditNombre=(e)=>{
    const { target: { value = '' } = {} } = { ...e };
    seteditNombre(value)
  }
   const inputChangeEditDescripcion=(e)=>{
 
    const { target: { value = '' } = {} } = { ...e };
    seteditDescripcion(value)
  }
  //------------FUNCIONES PARA ACCIONAR LAS API----------------
    const listadoArticulos = () =>{
        API.GetArticulos()
        .then((data) => data.json())
        .then((dataJson) => {
            console.log("datos",dataJson)
            setArrayArticulos(dataJson.articulos)
        })
        .catch((error) => {
            console.log('Error ', error);
        });  
    }
// Funcion para agregar los articulos
const agregarArticulo = ()=>{
    if(numeroRegistro === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El numero de registro no puede estar vacio',
            icon: 'info',
          })
    }else if(nombre === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El nombre del articulo no puede estar vacio',
            icon: 'info',
          })
    }else if(descripcion === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'La descripcion del articulo no puede estar vacia',
            icon: 'info',
          })
    }else{
        API.PostArticulos(numeroRegistro,nombre,descripcion)
        .then((data) => data.json())
        .then((dataJson) => {
            console.log("datos",dataJson)
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Guardado!',
                    text: 'Articulo agregado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoArticulos();
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

// Funcion para editar los articulos
const editarArticulo = ()=>{
    if(editNumeroRegistro === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El numero de registro no puede estar vacio',
            icon: 'info',
          })
    }else if(editNombre === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'El nombre del articulo no puede estar vacio',
            icon: 'info',
          })
    }else if(editDescripcion === ''){
        Swal.fire({
            title: 'Atención!',
            text: 'La descripcion del articulo no puede estar vacia',
            icon: 'info',
          })
    }else{
        API.PutArticulos(editNumeroRegistro,editNombre,editDescripcion,editIdArticulo)
        .then((data) => data.json())
        .then((dataJson) => {
            console.log("datos",dataJson)
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Actualizado!',
                    text: 'Articulo actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoArticulos();
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

//Funcion para eliminar el articulo
const borrarArticulo = (id)=>{
    Swal.fire({
        title: '¿Estas seguro de eliminar el articulo?',
        text: "Este proceso no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
              API.DeleteArticulos(id)
    .then((data) => data.json())
        .then((dataJson) => {
            if(dataJson.success === true){
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'Articulo eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                  listadoArticulos();
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
                        <th >Numero registro</th>
                        <th >Nombre</th>
                        <th >Descripcion</th>
                        <th ><Button color="info" onClick={abrirModal}>Agregar </Button></th>
                    </tr>
                </thead>
                <tbody>
                    {  
                    arrayArticulos.length === 0 ? <tr>No hay datos</tr>:
                        arrayArticulos.map((articulo,i) =>{
                            return (
                                <tr key={articulo.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{articulo.numero_registro}</td>
                                    <td>{articulo.nombre}</td>
                                    <td>{articulo.descripcion}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-lg-auto">
                                                <Button className="btn btn-warning" onClick={() => abrirModalEdit(articulo.id,articulo.numero_registro,articulo.nombre,articulo.descripcion)}>Editar </Button>
                                            </div>
                                            <div className="col-lg-auto">
                                                <Button className="btn btn-danger" onClick={() => borrarArticulo(articulo.id)}>Eliminar </Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Modal show={show} onHide={cerrarModalAgregar} centered>
                <Modal.Header >
                    <Modal.Title>Agregar articulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                       <div className="row">
                           <div className="col-lg-6">
                               <label>Numero registro</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={numeroRegistro}
                                    type="text"
                                    maxLength={10}
                                    onChange={inputChangeNumeroRegistro}
                                />
                           </div>
                       </div>
                       <div className="row mt-3">
                           <div className="col-lg-6">
                               <label>Nombre</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={nombre}
                                    type="text"
                                    maxLength={50}
                                    onChange={inputChangeNombre}
                                />
                           </div>
                       </div>
                       <div className="row mt-3">
                           <div className="col-lg-6">
                               <label>Descripción</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={descripcion}
                                    type="text"
                                    maxLength={200}
                                    onChange={inputChangeDescripcion}
                                />
                           </div>
                       </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModalAgregar}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={()=>agregarArticulo()}>
                   Guardar cambios
                </Button>
                </Modal.Footer>
            </Modal>

            {/**---------------Modal para editar articulo */}
            <Modal show={EditShow} onHide={cerrarModalEdit} centered>
                <Modal.Header>
                    <Modal.Title>Editar articulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                       <div className="row">
                           <div className="col-lg-6">
                               <label>Numero registro</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={editNumeroRegistro}
                                    type="text"
                                    maxLength={10}
                                    onChange={inputChangeEditNumeroRegistro}
                                />
                           </div>
                       </div>
                       <div className="row mt-3">
                           <div className="col-lg-6">
                               <label>Nombre</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={editNombre}
                                    type="text"
                                    maxLength={50}
                                    onChange={inputChangeEditNombre}
                                />
                           </div>
                       </div>
                       <div className="row mt-3">
                           <div className="col-lg-6">
                               <label>Descripción</label>
                           </div>
                           <div className="col-lg-6">
                                <Input
                                    value={editDescripcion}
                                    type="text"
                                    maxLength={200}
                                    onChange={inputChangeEditDescripcion}
                                />
                           </div>
                       </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={cerrarModalEdit}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={()=>editarArticulo()}>
                   Guardar cambios
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    
}
export default Articulos;
import React from 'react';
import {Button} from 'reactstrap';
import Swal from 'sweetalert2';
const tabla = ()=>{
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
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <button className="btn btn-danger">Eliminar </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>
                            <button className="btn btn-danger">Eliminar </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td>
                            <Button className="btn btn-danger" onClick={()=>alerta()}>Eliminar </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default tabla;
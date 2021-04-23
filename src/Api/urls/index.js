/* Archivo de urls de la api */

// const DEV_URL = 'http://127.0.0.1:8000/';
const PRODUCTION_URL = 'http://localhost:19500/';
// const API_VERSION = 1;
const API_URL = 'api/v1/';

const APP_URLS = {
  /**RUTAS PARA LAS CATEGORIAS*/
  GET_CATEGORIAS: `${PRODUCTION_URL}${API_URL}admin/categorias/getCategorias`,
  POST_CATEGORIAS: `${PRODUCTION_URL}${API_URL}admin/categorias/addCategorias`,
  PUT_CATEGORIAS: `${PRODUCTION_URL}${API_URL}admin/categorias/editCategorias`,
  DELETE_CATEGORIAS: `${PRODUCTION_URL}${API_URL}admin/categorias/deleteCategorias/`,
/**RUTAS PARA LOS ARTICULOS*/
    GET_ARTICULOS: `${PRODUCTION_URL}${API_URL}admin/articulos/getArticulos`,
    POST_ARTICULOS: `${PRODUCTION_URL}${API_URL}admin/articulos/addArticulos`,
    PUT_ARTICULOS: `${PRODUCTION_URL}${API_URL}admin/articulos/editArticulos`,
    DELETE_ARTICULOS: `${PRODUCTION_URL}${API_URL}admin/articulos/deleteArticulo/`,

};

export default APP_URLS;

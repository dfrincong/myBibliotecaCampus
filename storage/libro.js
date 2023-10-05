import env from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type":"application/json"}};

// validación de datos
const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        autorId=null, 
        categoriaId=null, 
        editorialId=null, 
        titulo=null, 
        fechaLanzamiento=null, 
        isbn=null, 
        numPaginacion=null, 
        estadoId=null
    } = data;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `La fechaLanzamiento '${fechaLanzamiento}' no cumple con el formato`};
    if(typeof autorId !== 'number') return {status: 400, message: `El autorId '${autorId}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El categoriaId '${categoriaId}' no cumple con el formato`};
    if(typeof editorialId !== 'number') return {status: 400, message: `El editorialId '${editorialId}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El titulo '${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El isbn '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El numPaginacion '${numPaginacion}' no cumple con el formato`};
    if(typeof estadoId !== 'number') return {status: 400, message: `El estadoId '${estadoId}' no cumple con el formato`};
    return data;
};

//traer libros
export const getAll = async()=>{
    config.method = "GET";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    // console.log(res);
    return res
};
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    return res;
};
// console.log(await getAll());

//enviar libros
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`, config)).json();
    // console.log(res);
    return res
};
// console.log(await post({
//     titulo:"El olor del miedo", 
//     fechaLanzamiento: "2023-08-30", 
//     autorId:1,
//     categoriaId:1, 
//     editorialId:1, 
//     isbn:"380554", 
//     numPaginacion: 552, 
//     estadoId:1
// }));

// eliminar uno
export const deleteOne = async(id)=>{
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await deleteOne(1));

// actualizar uno
export const putOne = async(obj={})=>{
    let all = undefined;
    const {id} = obj;
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    const {...objUpdate} = obj;
    obj = {...all, ...objUpdate};
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await putOne({
//     titulo:"Prometeo encadenado 34", 
//     fechaLanzamiento: "2022-08-01", 
//     autorId:1, 
//     categoriaId:1, 
//     editorialId:1, 
//     isbn:"1675814", 
//     numPaginacion: 296, 
//     estadoId:1,
//     id: 1
// }));
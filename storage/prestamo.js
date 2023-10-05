import env from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type":"application/json"}};

// validación de datos
const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        usuarioId=null, 
        libroId=null,
        fechaPrestamo=null, 
        fechaDevolucion=null, 
        estado=null
    } = data;
    let dateStart = new Date(fechaPrestamo);
    if(!(dateStart && dateStart.getFullYear()<=2040)) return {status: 400, message: `La fechaPrestamo '${fechaPrestamo}' no cumple con el formato`};
    let dateEnd = new Date(fechaDevolucion);
    if(!(dateEnd && dateEnd.getFullYear()<=2040)) return {status: 400, message: `La fechaDevolucion '${fechaDevolucion}' no cumple con el formato`};
    if(typeof usuarioId !== 'number') return {status: 400, message: `El usuarioId '${usuarioId}' no cumple con el formato`};
    if(typeof libroId !== 'number') return {status: 400, message: `El libroId '${libroId}' no cumple con el formato`};
    if(typeof estado !== 'string') return {status: 400, message: `El estado '${estado}' no cumple con el formato`};
    return data;
};

//traer prestamo
export const getAll = async()=>{
    config.method = "GET";
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    // console.log(res);
    return res
};
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    return res;
};
// console.log(await getAll());

//enviar prestamo
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo`, config)).json();
    // console.log(res);
    return res
};
// console.log(await post({
//     usuarioId:1, 
//     libroId:1, 
//     fechaPrestamo:"2023-10-05",
//     fechaDevolucion:"2023-11-05", 
//     estado:"en curso"
// }));

// eliminar uno
export const deleteOne = async(id)=>{
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await deleteOne(1));

// actualizar uno
export const putOne = async(obj={})=>{
    const {id} = obj;
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    const {...objUpdate} = obj;
    obj = {...objUpdate};
    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/prestamo/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await putOne({
//     usuarioId:1, 
//     libroId:1, 
//     fechaPrestamo:"2023-10-05",
//     fechaDevolucion:"2023-10-20", 
//     estado:"en curso",
//     id:1
// }));
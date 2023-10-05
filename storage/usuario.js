import env from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type":"application/json"}};

// validación de datos
const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {
        nombre=null, 
        apellido=null, 
        direccion=null, 
        telefono=null, 
        email=null
    } = data;
    if(typeof nombre !== 'string') return {status: 400, message: `El nombre '${nombre}' no cumple con el formato`};
    if(typeof apellido !== 'string') return {status: 400, message: `El apellido '${apellido}' no cumple con el formato`};
    if(typeof direccion !== 'string') return {status: 400, message: `El direccion '${direccion}' no cumple con el formato`};
    if(typeof telefono !== 'string') return {status: 400, message: `El telefono '${telefono}' no cumple con el formato`};
    if(typeof email !== 'string') return {status: 400, message: `El email '${email}' no cumple con el formato`};
    return data;
};

//traer usuario
export const getAll = async()=>{
    config.method = "GET";
    let res = await (await fetch(`${uri}/usuario`, config)).json();
    // console.log(res);
    return res
};
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/usuario/${id}`, config)).json();
    return res;
};
// console.log(await getAll());

//enviar usuario
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/usuario`, config)).json();
    // console.log(res);
    return res
};
// console.log(await post({
//     nombre:"Juan", 
//     apellido: "Riquelme", 
//     direccion:"Avenida Guayacanes",
//     telefono:"3201456897", 
//     email:"jr@gmail.com"
// }));

// eliminar uno
export const deleteOne = async(id)=>{
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/usuario/${id}`, config)).json();
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
    let res = await (await fetch(`${uri}/usuario/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await putOne({
//     nombre:"Juan", 
//     apellido: "Castro", 
//     direccion:"Avenida Guayacanes",
//     telefono:"3201456897", 
//     email:"jr@gmail.com",
//     id:1
// }));
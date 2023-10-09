import { getOne as getOneCategoria  }  from "./categoria.js";
import { getOne as getOneAutor  }  from "./autor.js";
import env from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type":"application/json"}};

// validación de datos
const validarExtructura = (data={})=>{
    if(data.constructor.name !== "Object" || Object.keys(data).length==0) return {status: 400, message: `Usuario envie los datos`};
    const {nombre=null} = data;
    if(typeof nombre !== 'string') return {status: 400, message: `El nombre '${nombre}' no cumple con el formato`};
    return data;
};

//traer categoria
export const getAll = async()=>{
    config.method = "GET";
    let res = await (await fetch(`${uri}/categoria`, config)).json();
    // console.log(res);
    return res
};
export const getOne = async(id)=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/categoria/${id}`, config)).json();
    return res;
};
// console.log(await getAll());

//enviar categoria
export const post = async(obj={})=>{
    obj = validarExtructura(obj);
    if(obj.status) return obj;
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/categoria`, config)).json();
    // console.log(res);
    return res
};
// console.log(await post({nombre:"comedia"}));

// eliminar uno
export const deleteOne = async(id)=>{
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    config.method = "DELETE";
    // config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/categoria/${id}`, config)).json();
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
    let res = await (await fetch(`${uri}/categoria/${id}`, config)).json();
    // console.log(res);
    return res;
}
// console.log(await putOne({nombre:"drama", id:1}));

export const getRelationships = async()=>{
    config.method = "GET";
    // config.body = "";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    res = await Promise.all(res.map(async(data,id)=>{
        let {categoriaId:catId, autorId:autId} = data;
        let cat = await getOneCategoria(catId);
        let aut = await getOneAutor(autId);
        data.categoriaId = cat;
        data.autorId = aut;
        return data;
    }))
   
    return res;
}
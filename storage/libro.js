import env from "../config.js";
const uri = `${env.ssl + env.hostName}:${env.port}`;
const config = {method: undefined, headers: {"Content-Type":"application/json"}};

//traer todos los libros
export const getAll = async()=>{
    config.method = "GET";
    let res = await (await fetch(`${uri}/libro`, config)).json();
    // console.log(res);
    return res
}


//enviar
export const post = async(obj)=>{
    config.method = "POST";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`, config)).json();
    // console.log(res);
    return res
}

// console.log(await post({titulo: "Pepito", fecha: "2023-08-10"}));
// console.log(await getAll());


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
    if (!obj.id) return {status: 400,  message: `usuario mande los datos`}
    const {id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId} = obj;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400,  message: `el dato '${fechaLanzamiento}' no coincide`};
    if(typeof id !== "number") return {status: 400,  message: `el dato '${id}' no coincide`};
    if(typeof autorId !== "number") return {status: 400,  message: `el dato '${autorId}' no coincide`};
    if(typeof categoriaId !== "number") return {status: 400,  message: `el dato '${categoriaId}' no coincide`};
    if(typeof editorialId !== "number") return {status: 400,  message: `el dato '${editorialId}' no coincide`};
    if(typeof titulo !== "string") return {status: 400,  message: `el dato '${titulo}' no coincide`};
    if(typeof isbn !== "string") return {status: 400,  message: `el dato '${isbn}' no coincide`};
    if(typeof numPaginacion !== "number") return {status: 400,  message: `el dato '${numPaginacion}' no coincide`};
    if(typeof estadoId !== "number") return {status: 400,  message: `el dato '${estadoId}' no coincide`};

    config.method = "PUT";
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`, config)).json();
    // console.log(res);
    return res;
}

console.log(await putOne());




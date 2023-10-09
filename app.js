// import {post as guardarLibro} from './storage/libro.js';
// import {getAll as getAllCat} from './storage/categoria.js';
// import {getAll as getAllAut} from './storage/autor.js';

// let myLibro = document.querySelector("#myLibro");
// let myCategoria = document.querySelector("#myCategoria");
// let myAutor = document.querySelector("#myAutor");
// addEventListener("DOMContentLoaded", async(e)=>{
//     let cat = await getAllCat();
//     cat = cat.map(res=> `<option value="${res.id}">${res.nombre}</option>`);
//     myCategoria.insertAdjacentHTML("beforeend", `${cat.join("")}`);

//     let aut = await getAllAut();
//     aut = aut.map(res=> `<option value="${res.id}">${res.nombre} ${res.apellido}</option>`);
//     myAutor.insertAdjacentHTML("beforeend", `${aut.join("")}`);
// })
// myLibro.addEventListener("submit", async(e)=>{
//     e.preventDefault();
//     let data = Object.fromEntries(new FormData(e.target));
//     const { autorId:aut, categoriaId:cat, editorialId:edi, numPaginacion:num, estadoId:est} = data;
//     data.autorId = Number(aut);
//     data.categoriaId = Number(cat);
//     data.editorialId = Number(edi);  
//     data.numPaginacion = Number(num);
//     data.estadoId = Number(est);
//     alert(JSON.stringify(await guardarLibro(data)));
// })
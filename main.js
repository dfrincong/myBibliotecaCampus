// const enviar= async()=>{
//     let config = {
//         method: "POST",
//         headers: {"content-type":"application/json"},
//         body: JSON.stringify({titulo:"como hacer programación", fecha:"2020", autor:"pachon"})
//     }
//     let res = await (await fetch ("http://127.0.0.7:5013/libros", config)).json();
//     console.log(res);    
// }

// enviar();

// const actualizar= async(id)=>{
//     let config = {
//         method: "PUT",
//         headers: {"content-type":"application/json"},
//         body: JSON.stringify({titulo:"como actualizar", fecha:"2023", autor:"yo"})
//     }
//     let res = await (await fetch ("http://127.0.0.7:5013/libros/" + id, config)).json();
//     console.log(res);    
// }

// actualizar(1);

// const eliminar = async(id)=>{
//     let config = {
//       method: "DELETE",
//       headers: {"content-type":"application/json"}
//     };
//     let res = await (await fetch("http://127.0.0.7:5013/libros/" + id, config)).json();
//     console.log(res);
//   };

// eliminar(2);
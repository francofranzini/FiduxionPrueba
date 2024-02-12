'use client'
import React from 'react'
function Card({tarea}) {
    const borrarCarta = () =>{
        console.log("Borrar")
        //metodo para borrar en la db
      }
      const editarCarta = () =>{
        console.log("Editar")
        //metodo para editar en la db
      } 
      const finalizarCarta = () => {
        //metodo para cambiarlo en la db

      }

  return (
    <div className="mx-4 h-[200px] max-w-sm overflow-hidden rounded-lg bg-gray-600 shadow-lg my-2" key={tarea.id}>
        <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">{tarea.name}</div>
            <p className="text-base text-gray-100">
            Tarea creada en {tarea.createdAt ? tarea.createdAt.toDateString() : "NA" } <br></br>
            </p>
            Estado: {tarea.finalizada == 0 ? "Pendiente" : "Finalizada"}
        </div>
        <button className="mx-2 my-2 rounded-lg bg-red-500 p-2" onClick={borrarCarta}>
            {" "}
            Borrar{" "}
        </button>
        <button className="mx-2 my-2 rounded-lg bg-blue-500 p-2" onClick={editarCarta}>
            {" "}
            Editar{" "}
        </button>
        <button className="mx-2 my-2 rounded-lg bg-green-500 p-2" onClick={finalizarCarta}>
            {tarea.finalizada == 1 ? "Reabrir" : "Finalizada"}
        </button>
    </div>
  )
}


export default Card
'use client'

import { useState } from "react"; 
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
interface Tarea{
  id: number;
  name: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: string;
  finalizada: number;
}

function Card({ tarea }: { tarea: Tarea }) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(tarea.name)
  const [errors, setErrors] = useState("")


  const deletePost = api.post.delete.useMutation({
    onSuccess: () =>{
      router.refresh();
    }
  })
  const editPost = api.post.edit.useMutation({
    onSuccess: () =>{
      setIsEditing(false)
      router.refresh();
    },
    onError: (error) =>{
      //Aqui la idea seria usar "errors" para mostrarlo en la tarjeta, pero el formato 
      //no me deja acceder al mensaje, queda pendiente.
      alert(error)
    }
  })
  const finalizarPost = api.post.finalizar.useMutation({
    onSuccess: () =>{
      setIsEditing(false)
      router.refresh();
    },
    onError: (error) =>{
      //Aqui la idea seria usar "errors" para mostrarlo en la tarjeta, pero el formato 
      //no me deja acceder al mensaje, queda pendiente.
      alert(error)
    }
  })
  const reabrirPost = api.post.reabrir.useMutation({
    onSuccess: () =>{
      setIsEditing(false)
      router.refresh();
    },
    onError: (error) =>{
      //Aqui la idea seria usar "errors" para mostrarlo en la tarjeta, pero el formato 
      //no me deja acceder al mensaje, queda pendiente.
      alert(error)
    }
  })

  const handleEditClick = () =>{
    setIsEditing(true)
    setTitulo(tarea.name)
  }
  const handleEstadoClick = () =>{
    const exe = tarea.finalizada ? reabrirCarta : finalizarCarta
    exe()
  }
  

  const borrarCarta = async () =>{
      const tareaId:number = tarea.id
      deletePost.mutate(tareaId)  
    }
  const editarCarta = () =>{
    const tareaId:number = tarea.id
    //metodo para editar en la db
    editPost.mutate({titulo, tareaId})
  } 
  const finalizarCarta = () => {
    //metodo para cambiarlo en la db
    const tareaId:number = tarea.id
    finalizarPost.mutate(tareaId)
  }
  const reabrirCarta = () => {
    //metodo para cambiarlo en la db
    const tareaId:number = tarea.id
    reabrirPost.mutate(tareaId)
  }

  return (
    <div className="mx-4 h-[200px] max-w-sm overflow-hidden rounded-lg bg-gray-600 shadow-lg my-2" key={tarea.id}>
        <div className="px-6 py-4">
            <p>{errors ? errors : <></>}</p>
            {isEditing ? <input className="px-2 mx-2 my-2 rounded-lg text-black items-center" type="text-black" value={titulo} onChange={(e) => setTitulo(e.target.value)} /> : <div className="mb-2 text-xl font-bold">{tarea.name}</div>}
            <p className="text-base text-gray-100">
            Tarea creada en {tarea.createdAt ? tarea.createdAt.toDateString() : "NA" } <br></br>
            </p>
            Estado:<span style={{ color: tarea.finalizada === 0 ? "orange" : "green" }}>{tarea.finalizada === 0 ? " Pendiente" : " Finalizada"}</span>
        </div>
        <button className="mx-2 my-2 rounded-lg bg-red-500 p-2" onClick={borrarCarta}>
            {" "}
            Borrar{" "}
        </button>
        {isEditing ? <button className="mx-2 my-2 rounded-lg bg-blue-500 p-2" onClick={editarCarta}>Guardar</button>:<button className="mx-2 my-2 rounded-lg bg-blue-500 p-2" onClick={handleEditClick}>{" "}Editar{" "} </button>}
        {isEditing ? <button className="mx-2 my-2 rounded-lg bg-red-500 p-2" onClick={() => setIsEditing(false)}>Cancelar</button> : <button className="mx-2 my-2 rounded-lg bg-green-500 p-2" onClick={handleEstadoClick}>{tarea.finalizada == 1 ? "Reabrir" : "Finalizada"}</button>}
    </div>
  )
}


export default Card
'use client'


import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
interface Tarea{
  id: number;
  name: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: string;
  finalizada: number;
}

function Card({ tarea }: { tarea: Tarea }) {
  const router = useRouter()
  const deletePost = api.post.delete.useMutation({
    onSuccess: () =>{
      router.refresh();
    }
  })

    const borrarCarta = async () =>{
        console.log("Borrar")
        const tareaId:number = tarea.id
        deletePost.mutate(tareaId)
        
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
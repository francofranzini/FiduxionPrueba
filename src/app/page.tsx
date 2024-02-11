import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const tareas = await api.post.getLatest.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Prueba <span className="text-[hsl(280,100%,70%)]">Tecnica</span>{" "}
          Fiduxion
        </h1>
        <div className="gap-4 sm:grid-cols-2 md:gap-8">
          <h3 className="text-2xl font-bold">
            {session ? "Tareas de " + `${session.user.name}` : "Inicie Sesion"}
          </h3>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Bienvenido {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <CrudShowcase />
        <h2 className="">Lista de Tareas</h2>
        {tareas.length > 0 ? (
            tareas.map(tarea =>(
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-600 " key={tarea.id}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{tarea.name}</div>
                <p className="text-gray-100 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
              </div>
            </div>
            ))

        ) : (
          <p>Nada por aqui...</p>
        )}
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();
  console.log(latestPost);

  return (
    <div className="w-full max-w-xs">
      {/* {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )} */}
      <h3>Cree aqui su siguiente Tarea</h3>

      <CreatePost />
    </div>
  );
}

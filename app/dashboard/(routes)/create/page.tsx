"use client";

import { trpc } from "@/app/_trpc/client";
import { CreateCoinForm } from "@/components/create-coin-form";

const CreatePage = () => {
  const { data } = trpc.createTodo.useQuery();

  console.log(data);

  return (
    <div className="h-full w-full p-6 flex items-center justify-center">
      {JSON.stringify(data)}
      <CreateCoinForm />
    </div>
  );
};

export default CreatePage;

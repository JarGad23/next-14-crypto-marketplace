"use client";

import { trpc } from "@/app/_trpc/client";

const BrowsePage = () => {
  const getTodos = trpc.getTodos.useQuery();
  return <div>Browse Page {JSON.stringify(getTodos)}</div>;
};

export default BrowsePage;

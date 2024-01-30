"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Sale = {
  name: string;
  quantity: number;
  total: number;
};

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Amount",
  },
  {
    accessorKey: "total",
    header: () => <div>Total Price</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return <div className="font-medium">{formatted}</div>;
    },
  },
];

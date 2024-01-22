"use client";

import { trpc } from "@/app/_trpc/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface DeleteTokenSaleModalProps {
  children: React.ReactNode;
  saleId: string;
}

export const DeleteTokenSaleModal = ({
  children,
  saleId,
}: DeleteTokenSaleModalProps) => {
  const {
    mutate: deleteSale,
    isError,
    isLoading,
  } = trpc.deleteSellToken.useMutation({
    onSuccess: (data) => {
      toast.success("Token deleted successfully");
      window.location.reload();
    },
    onError: ({ message }: any) => {
      toast.error(message);
    },
  });

  const onClick = () => {
    deleteSale({ saleId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      <AlertDialogContent className="space-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Sale</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete sale, you can&apos;t retract this action
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-x-2 justify-end">
          <Button variant="destructive" asChild>
            <AlertDialogAction onClick={onClick}>Delete</AlertDialogAction>
          </Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

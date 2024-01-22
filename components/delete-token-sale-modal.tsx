interface DeleteTokenSaleModalProps {
  children: React.ReactNode;
  saleId: string;
}

export const DeleteTokenSaleModal = ({
  children,
  saleId,
}: DeleteTokenSaleModalProps) => {
  return <div className="w-full">{children}</div>;
};

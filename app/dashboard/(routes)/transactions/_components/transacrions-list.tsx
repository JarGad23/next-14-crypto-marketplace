import { Token, Transaction } from "@prisma/client";

interface TransactionsListProps {
  data: ({
    token: Token;
  } & Transaction)[];
}

export const TransactionsList = ({ data }: TransactionsListProps) => {
  return <div></div>;
};

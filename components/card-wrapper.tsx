import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  titleLabel: string;
}

export const CardWrapper = ({ children, titleLabel }: CardWrapperProps) => {
  return (
    <Card className="shadow-md w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-center mb-4">{titleLabel}</CardTitle>
        <CardContent>{children}</CardContent>
      </CardHeader>
    </Card>
  );
};

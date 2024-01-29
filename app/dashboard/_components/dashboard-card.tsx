import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: LucideIcon;
}

export const DashboardCard = ({
  title,
  description,
  label,
  href,
  icon: Icon,
}: DashboardCardProps) => {
  return (
    <Card className="space-y-4">
      <CardHeader className="w-full flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Icon className="w-10 h-10" />
      </CardHeader>
      <CardContent className="h-20">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={href} className="w-full">
            {label}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface CardPorps {
  title: string;
  icon: LucideIcon;
  description: string;
  label: string;
  href: string;
}

export const Card = ({
  title,
  icon: Icon,
  description,
  label,
  href,
}: CardPorps) => {
  return (
    <div className="w-full h-[400px] border-4 border-primary rounded-xl p-4">
      <div className="h-full w-full flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <Icon className="h-10 w-10" />
        </div>
        <p className="text-justify">{description}</p>
        <Button asChild className="mt-auto">
          <Link href={href}>
            {label} <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

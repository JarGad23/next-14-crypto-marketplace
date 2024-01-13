import { Navbar } from "@/components/navbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <Navbar showLogo={true} />
      <main className="pt-12">{children}</main>
    </div>
  );
};

export default HomeLayout;

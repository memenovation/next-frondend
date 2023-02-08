import { Header } from "./header";

export const Layout = ({ children }) => {

  return (
    <div className="flex flex-col items-center  min-h-screen w-full">
      <Header />
      <main className="flex flex-col items-center pt-16">{children}</main>
    </div>
  );
};

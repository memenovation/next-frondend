export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-6 ">
        {children}
      </main>
    </div>
  );
};

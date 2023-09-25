import Footer from "./footer";
import Header from "./header";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
};

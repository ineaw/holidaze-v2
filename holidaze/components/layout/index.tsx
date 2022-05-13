import Container from "./Container";
import Navbar from "../Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;

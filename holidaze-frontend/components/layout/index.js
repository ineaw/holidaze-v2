import Container from "./Container";
import Footer from "./Footer";
import Hero from "./Hero";
import NavBar from "./NavBar";
import SubHero from "./SubHero";
import { UserProvider } from "../../context/authContext";

import { useRouter } from "next/router";

const Layout = ({ user, loading = false, children }) => {
  const router = useRouter();

  return (
    <>
      <UserProvider value={{ user, loading }}>
        <NavBar />
        {router.pathname === "/" && <Hero />}
        {router.pathname === "/contact" && <SubHero />}
        <Container>{children}</Container>
        <Footer />
      </UserProvider>
    </>
  );
};

Layout.defaultProps = {
  title: "",
  description: "",
  keywords: "",
};
export default Layout;

import Footer from "./footer/Footer";
import Header from "./header/Header";
import '../../index.css'

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        {children}
      </main>
      <Footer className='layout-footer' />
    </div>
  );
};

export default Layout;

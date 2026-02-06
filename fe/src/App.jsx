import { ConfigProvider } from "antd";
import Header from "./layout/header/Header";
import defaultTheme from "../styles/theme";


function App() {
  return (
    <>
      <ConfigProvider theme={defaultTheme}>
        <div className="container">
     <Header />
        </div>
   
      </ConfigProvider>
    </>
  );
}

export default App;

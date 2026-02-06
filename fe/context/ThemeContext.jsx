/*import { createContext, useState } from "react";
import { defaultTheme, darkTheme } from "../styles/theme";
import { ConfigProvider } from "antd";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const theme = isDark ? darkTheme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>

        {children}
     
    </ThemeContext.Provider>
  );
};*/

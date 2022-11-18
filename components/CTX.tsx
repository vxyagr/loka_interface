import React, { useContext, useState } from "react";

export const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee",
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222",
    },
};

export const LokaContext = React.createContext({
    theme: undefined,
    setTheme: async (theme) => null,
});

export const useLokaContext = () => useContext(LokaContext);

export const LokaProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.light);

    return <LokaContext.Provider value={{ theme, setTheme }}>{children}</LokaContext.Provider>;
};

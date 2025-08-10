import * as React from "react";

const initialState: ThemeProviderState = {
  theme: "system",
  toggleTheme: () => {},
};

const ThemeProviderContext =
  React.createContext<ThemeProviderState>(initialState);

/**
 * Theme Provider
 * @name ThemeProvider
 * @param param0
 * @returns {React.Provider}
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sm-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme
  );

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  // Handle theme change
  React.useEffect(() => {
    const t = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(t);
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem(storageKey, theme);
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Update theme value
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

type ThemeType = "dark" | "light" | "system";
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: ThemeType;
  toggleTheme: () => void;
};

import * as React from "react";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => {},
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
  // Handle theme change
  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Update theme value
  const value = {
    theme,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
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
  setTheme: (theme: ThemeType) => void;
};

import Routes from "./Routes";
import { ThemeProvider } from "./hooks/UseTheme";

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;

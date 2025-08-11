import Routes from "./Routes";
import { ThemeProvider } from "./hooks/UseTheme";
import { AuthProvider } from "./hooks/UseAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/RequestLibrary";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

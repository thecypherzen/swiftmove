import Routes from "./Routes";
import { ThemeProvider } from "./hooks/UseTheme";
import { AuthProvider } from "./hooks/UseAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/RequestLibrary";
import { ModalProvider } from "./hooks/UseModal";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ModalProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

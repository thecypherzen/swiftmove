import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./hooks/UseTheme";
import { AuthProvider } from "./hooks/UseAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/RequestLibrary";
import { ModalProvider } from "./hooks/UseModal";
import { BreadCrumbProvider } from "./hooks/Breadcrumbs";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <BreadCrumbProvider>
            <ModalProvider>
              <AuthProvider>
                <Routes />
              </AuthProvider>
            </ModalProvider>
          </BreadCrumbProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import { AppRoutes } from "./routes/router";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="quod-rules-theme">
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  );
}

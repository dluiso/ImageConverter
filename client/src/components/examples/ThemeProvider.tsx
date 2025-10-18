import { ThemeProvider, useTheme } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="p-8 space-y-4">
      <p className="text-foreground">Current theme: {theme}</p>
      <Button onClick={toggleTheme} data-testid="button-toggle-theme">
        Toggle Theme
      </Button>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
}

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage or system preference on mount
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      // Default to dark mode for cyber theme
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 z-50 p-3 bg-card border border-border rounded-lg shadow-lg hover:border-primary transition-all duration-300 group"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDark ? (
        <Sun size={20} className="text-primary group-hover:text-secondary transition-colors" />
      ) : (
        <Moon size={20} className="text-primary group-hover:text-secondary transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">{">"}</span> © {currentYear} Portfolio RT
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              Fait avec passion pour les réseaux
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* <a
              href="#"
              className="p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors group"
              aria-label="GitHub"
            >
              <Github size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a> */}
            <a
              href="#"
              className="p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors group"
              aria-label="Email"
            >
              <Mail size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-mono text-xs text-muted-foreground">
            <span className="text-primary">admin@portfolio:~$</span> uptime -p
            <br />
            <span className="text-secondary">{">"}</span> up and running, ready to connect
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

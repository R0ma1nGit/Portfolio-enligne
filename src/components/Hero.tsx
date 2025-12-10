import { useEffect, useState } from "react";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Je construis, configure et sécurise des réseaux.";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("apropos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden network-grid"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-mono mb-8">
            <span className="text-primary text-glow">Romain</span> -{" "}
            <span className="text-secondary text-glow">LEON</span>
          </h1>

          <div className="bg-terminal-bg border border-border border-glow rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
              </div>
              <span className="font-mono text-xs text-muted-foreground ml-2">
                terminal.sh
              </span>
            </div>
            <p className="font-mono text-lg md:text-xl text-left">
              <span className="text-primary">{">"}</span>{" "}
              <span className="text-foreground">{displayText}</span>
              <span className="inline-block w-2 h-5 bg-primary ml-1 animate-blink"></span>
            </p>
          </div>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Étudiant en BUT Réseaux & Télécommunications | Spécialisation Réseau
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-lg hover:scale-105 transition-transform border-glow group"
            >
              <span className="flex items-center justify-center gap-2">
                En savoir plus
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
            <a
  href="/LEON_Romain-Curriculum_Vitae.pdf"
  download="LEON_Romain-Curriculum_Vitae.pdf"
  className="px-8 py-3 bg-secondary text-secondary-foreground font-mono font-semibold rounded-lg hover:scale-105 transition-transform border-glow group"
>
  <span className="flex items-center justify-center gap-2">
    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
    Télécharger mon CV
  </span>
</a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center items-center">
            {/* <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-terminal-bg border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:scale-110 border-glow"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a> */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-terminal-bg border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:scale-110 border-glow"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:r.leon@rt-iut.re"
              className="p-3 bg-terminal-bg border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:scale-110 border-glow"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;



import { GraduationCap, MapPin, Target } from "lucide-react";

const About = () => {
  return (
    <section id="apropos" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
            <span className="text-primary text-glow">{">"}</span> À propos
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12 rounded-full border-glow"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-xl font-semibold mb-2 text-primary">
                    Formation
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    BUT Réseaux & Télécommunications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (2023-2026) IUT de Saint-Pierre - Spécialisation Réseau Opérateur et Multimédia
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bac STI2D option SIN
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                  <Target className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-xl font-semibold mb-2 text-secondary">
                    Objectif
                  </h3>
                  <p className="text-muted-foreground">
                    Devenir technicien ou administrateur réseau & système
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Passionné par les infrastructures IT et la supervision réseau
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-terminal-bg border border-border border-glow rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-primary">admin@portfolio:~$</span>
              <span className="font-mono text-muted-foreground">cat about.txt</span>
            </div>
            <p className="text-foreground leading-relaxed">
              Passionné par l'univers des réseaux et actuellement en <strong>dernière année de BUT R&T</strong>, 
              je me spécialise dans la supervision d'infrastructures IT et la métrologie (Grafana). 
              Je conserve une base technique solide en configuration réseau complexe (MPLS, OSPF) et en administration Linux, 
              car je suis convaincu qu'on ne surveille bien que ce que l'on comprend.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              Je recherche activement des opportunités pour approfondir mes compétences en 
              administration réseau et système, dans un environnement technique stimulant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

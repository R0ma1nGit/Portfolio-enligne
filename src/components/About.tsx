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
                    DUT Réseaux & Télécommunications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IUT de Saint-Pierre - Spécialisation Réseau
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
              Passionné par l'univers des réseaux et des télécommunications, je me spécialise 
              dans la configuration d'infrastructures réseau complexes (MPLS, OSPF, EIGRP), 
              l'administration de systèmes Linux, et la supervision d'infrastructures IT. 
              Mon parcours académique et mes expériences pratiques m'ont permis de développer 
              une expertise technique solide, alliant théorie et mise en pratique sur des 
              projets concrets.
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

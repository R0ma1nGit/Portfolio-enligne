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
          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-5 gap-4">
            {/* Colonne gauche - Objectif + Terminal */}
            <div className="md:col-span-3 flex flex-col gap-4">
              {/* Objectif */}
              <div className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                    <Target className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-mono text-xl font-semibold mb-2 text-secondary">
                      Objectif
                    </h3>
                    <p className="text-foreground font-medium">
                      Devenir technicien ou administrateur réseau & système
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Passionné par les infrastructures IT et la supervision réseau
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div className="bg-terminal-bg border border-border border-glow rounded-lg p-6 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground ml-2">about.txt</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-primary">admin@portfolio:~$</span>
                  <span className="font-mono text-muted-foreground">cat about.txt</span>
                </div>
                <p className="text-foreground leading-relaxed text-sm">
                  Passionné par l’univers des réseaux informatiques, je m’intéresse particulièrement à la conception et à la configuration d’infrastructures réseau complexes (MPLS, OSPF, EIGRP), ainsi qu’à la supervision et au bon fonctionnement des infrastructures IT.
                </p>
                <p className="text-foreground leading-relaxed mt-3 text-sm">
                  Je développe également des compétences en systèmes, à travers des projets et des mises en pratique. Je recherche activement des opportunités pour approfondir mes compétences en administration réseau et système, dans un environnement technique stimulant.
                </p>
              </div>
            </div>

            {/* Colonne droite - Formation (pleine hauteur) */}
            <div className="md:col-span-2 bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <h3 className="font-mono text-xl font-semibold text-primary">
                  Formation
                </h3>
              </div>
              
              {/* Timeline */}
              <div className="ml-4 relative">
                {/* Ligne verticale */}
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-primary/30"></div>
                
                {/* BUT */}
                <div className="relative pl-8 pb-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-[0_0_10px_hsl(var(--secondary)/0.5)]"></div>
                  <div className="font-mono text-sm text-secondary mb-1">2025 - 2026</div>
                  <div className="text-foreground font-semibold">BUT Réseaux & Télécommunications</div>
                  <div className="text-sm text-muted-foreground">IUT de Saint-Pierre</div>
                </div>

                {/* DUT */}
                <div className="relative pl-8 pb-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_10px_hsl(var(--primary)/0.5)]"></div>
                  <div className="font-mono text-sm text-primary mb-1">2023 - 2025</div>
                  <div className="text-foreground font-semibold">DUT Réseaux & Télécommunications</div>
                  <div className="text-sm text-muted-foreground">IUT de Saint-Pierre</div>
                </div>
                
                {/* Bac */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_10px_hsl(var(--primary)/0.5)]"></div>
                  <div className="font-mono text-sm text-primary mb-1">2023</div>
                  <div className="text-foreground font-semibold">Bac STI2D option SIN</div>
                  <div className="text-sm text-muted-foreground">Systèmes d'Information et Numérique</div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
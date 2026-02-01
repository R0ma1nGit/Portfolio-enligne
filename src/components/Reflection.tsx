import { Lightbulb, TrendingUp, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Reflection = () => {
  return (
    <section id="reflexion" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
            <span className="text-primary text-glow">{">"}</span> Ma Réflexion
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12 rounded-full border-glow"></div>
          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Ce que mon portfolio dit de moi */}
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/30">
                    <Lightbulb className="text-primary" size={20} />
                  </div>
                  <CardTitle className="font-mono text-lg text-primary">
                    Ce que mon portfolio dit de moi
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground text-sm leading-relaxed">
                  Mon portfolio reflète ma <span className="text-primary font-semibold">passion pour les infrastructures réseau</span> et 
                  ma volonté de maîtriser l'ensemble de la chaîne technique, de la conception à la supervision.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Il montre que je suis quelqu'un de <span className="text-secondary font-medium">méthodique</span>, 
                  <span className="text-secondary font-medium"> curieux</span>, et capable de mener des projets techniques 
                  de bout en bout. Je prends le temps de documenter mes réalisations et d'expliquer mon raisonnement.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  En tant que futur professionnel des Réseaux et Télécommunications, je m'efforce de développer une 
                  vision globale : architecture, sécurité, automatisation et monitoring forment un ensemble cohérent 
                  dans mes projets.
                </p>
              </CardContent>
            </Card>
            {/* Ma Progression BUT 1 → BUT 2 */}
            <Card className="bg-card border-border hover:border-secondary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg border border-secondary/30">
                    <TrendingUp className="text-secondary" size={20} />
                  </div>
                  <CardTitle className="font-mono text-lg text-secondary">
                    Ma Progression BUT 1 → BUT 3
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline visuelle */}
                <div className="relative ml-2">
                  <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 via-primary to-secondary"></div>
                  
                  {/* BUT 1 */}
                  <div className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-background shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <div className="font-mono text-xs text-blue-500 mb-1 font-semibold">BUT 1 — Les fondations</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-blue-500 mt-1 flex-shrink-0" />
                        Bases du réseau (modèle OSI, IP, sous-réseaux)
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-blue-500 mt-1 flex-shrink-0" />
                        Premiers pas avec Packet Tracer et GNS3
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-blue-500 mt-1 flex-shrink-0" />
                        Supervision basique (Cacti/SNMP)
                      </li>
                    </ul>
                  </div>
                   {/* BUT 2 */}
                  <div className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_10px_hsl(var(--secondary)/0.5)]"></div>
                    <div className="font-mono text-xs text-primary mb-1 font-semibold">BUT 2 — Approfondissement technique</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-primary mt-1 flex-shrink-0" />
                        Sécurité périmétrique (Stormshield, iptables)
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-primary mt-1 flex-shrink-0" />
                        Architectures avancées (MPLS L3VPN, BGP)
                      </li>
                    </ul>
                  </div>
                  {/* BUT 2 */}
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-[0_0_10px_hsl(var(--secondary)/0.5)]"></div>
                    <div className="font-mono text-xs text-secondary mb-1 font-semibold">BUT 3 — Montée en compétence</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-secondary mt-1 flex-shrink-0" />
                        Automatisation avec Ansible et Docker
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="text-secondary mt-1 flex-shrink-0" />
                        Supervision complète (TIG Stack, IoT)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Axes d'amélioration - Pleine largeur */}
          <Card className="bg-terminal-bg border-border border-glow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/30">
                  <Target className="text-primary" size={20} />
                </div>
                <CardTitle className="font-mono text-lg text-primary">
                  Mes Axes d'Amélioration
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Axe 1: Sécurité */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <h4 className="font-mono font-semibold text-foreground">Infrastructures Cloud & Edge</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Approfondir la gestion des infrastructures Cloud (AWS, Azure) et des services Edge pour optimiser la diffusion de contenus multimédias et la latence des applications.
                  </p>
                  <div className="flex gap-2 pl-4">
                    <span className="px-2 py-0.5 bg-secondary/10 border border-secondary/30 rounded text-xs font-mono text-secondary">
                      Cloud Networking
                    </span>
                    <span className="px-2 py-0.5 bg-secondary/10 border border-secondary/30 rounded text-xs font-mono text-secondary">
                      Edge Computing
                    </span>
                  </div>
                </div>
                {/* Axe 2: Automatisation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <h4 className="font-mono font-semibold text-foreground">Scripting & Automatisation</h4>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Développer mes compétences en Python pour le Network Automation et approfondir Ansible 
                    avec des rôles complexes et du CI/CD.
                  </p>
                  <div className="flex gap-2 pl-4">
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-xs font-mono text-primary">
                      Python
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-xs font-mono text-primary">
                      Ansible Avancé
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Reflection;
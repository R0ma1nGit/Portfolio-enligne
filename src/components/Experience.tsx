import { Briefcase, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const tasks = [
    "Préparation et configuration de postes de travail",
    "Sauvegardes et restauration de données EBP",
    "Clonage de disques HDD vers SSD pour optimisation",
    "Support informatique à distance",
    "Installation et configuration de logiciels métiers",
    "Maintenance préventive et curative du parc informatique",
  ];

  return (
    <section id="experiences" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
          <span className="text-primary text-glow">{">"}</span> Expériences
        </h2>
        <div className="h-1 w-24 bg-primary mx-auto mb-12 rounded-full border-glow"></div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border border-glow rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border bg-terminal-bg">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <Briefcase className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="font-mono text-2xl font-semibold mb-2">
                      Technicien Support Informatique
                    </h3>
                    <p className="text-lg text-primary mb-2">AFI</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Stage - 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>La Réunion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-mono text-lg font-semibold mb-4 text-secondary">
                Missions principales :
              </h4>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary font-mono flex-shrink-0 mt-1">
                      {">"} [✓]
                    </span>
                    <p className="text-muted-foreground">{task}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-mono text-lg font-semibold mb-3 text-secondary">
                  Compétences développées :
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Maintenance PC",
                    "Sauvegarde de données",
                    "Support technique",
                    "Clonage de disques",
                    "Windows",
                    "Logiciels métiers",
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-sm font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;

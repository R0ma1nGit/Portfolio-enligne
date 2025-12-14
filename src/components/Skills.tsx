import { Server, Network, Shield, Database, HardDrive, Code } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Réseaux",
      icon: Network,
      skills: ["MPLS", "OSPF", "EIGRP", "RIP", "SD-WAN", "Routage & Commutation"],
      color: "primary",
    },
    {
      title: "Systèmes",
      icon: Server,
      skills: ["Linux", "Windows Server", "Administration Système", "Virtualisation"],
      color: "secondary",
    },
    {
      title: "Services",
      icon: Database,
      skills: ["DNS (BIND9)", "DHCP", "Active Directory", "Serveurs Web"],
      color: "primary",
    },
    {
      title: "Supervision",
      icon: Shield,
      skills: ["Cacti", "Monitoring", "SNMP", "Gestion d'incidents"],
      color: "secondary",
    },
    {
      title: "Virtualisation",
      icon: HardDrive,
      skills: ["VMware", "VirtualBox", "Containers", "Environnements virtuels"],
      color: "primary",
    },
    {
      title: "Outils",
      icon: Code,
      skills: ["Cisco IOS", "Wireshark", "Packet Tracer", "Scripts Bash"],
      color: "secondary",
    },
  ];

  return (
    <section id="competences" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
          <span className="text-primary text-glow">{">"}</span> Compétences
        </h2>
        <div className="h-1 w-24 bg-primary mx-auto mb-12 rounded-full border-glow"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:scale-105 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 bg-${category.color}/10 rounded-lg border border-${category.color}/30 group-hover:border-glow transition-all`}
                >
                  <category.icon
                    className={`text-${category.color}`}
                    size={24}
                  />
                </div>
                <h3 className="font-mono text-xl font-semibold">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className={`text-${category.color}`}>{">"}</span>
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-terminal-bg border border-border border-glow rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-primary">admin@skills:~$</span>
            <span className="font-mono text-muted-foreground">
              ./display_expertise.sh
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Linux", "Cisco", "MPLS", "Supervision / SNMP", "Docker", "Windows", "Virtualisation", "", ""].map(
              (tech, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-muted/50 border border-border rounded text-center font-mono text-sm hover:border-primary/50 transition-colors"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;



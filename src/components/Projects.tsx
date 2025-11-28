import { Network, Server, Globe, ArrowRight, Monitor, Database, Shield, Cloud, Layers, Activity, HardDrive, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import topologyMpls from "@/assets/topology-mpls.png";
import topologyCacti from "@/assets/topology-cacti.png";
import topologyDns from "@/assets/topology-dns.png";
import topologyVmware from "@/assets/topology-vmware.png";
import topologyPfsense from "@/assets/topology-pfsense.png";
import topologyDatacenter from "@/assets/topology-datacenter.png";

type ProjectCategory = "réseau" | "supervision" | "serveur" | "virtualisation" | "sécurité";

interface Project {
  title: string;
  description: string;
  icon: any;
  skills: string[];
  color: string;
  category: ProjectCategory;
  topology?: string;
  detailedDescription: {
    contexte: string;
    objectif: string;
    realisation: string[];
    resultats: string;
    technologies: string[];
  };
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "tous">("tous");

  const projects: Project[] = [
    {
      title: "Implémentation MPLS avec OSPF/EIGRP/RIP",
      description:
        "Conception et déploiement d'un réseau MPLS complet avec comparaison des protocoles de routage.",
      icon: Network,
      skills: ["MPLS", "OSPF", "EIGRP", "RIP", "SD-WAN", "Cisco"],
      color: "primary",
      category: "réseau",
      topology: topologyMpls,
      detailedDescription: {
        contexte: "Dans le cadre de la modernisation de l'infrastructure réseau d'une entreprise multi-sites, il était nécessaire d'évaluer et de mettre en œuvre une solution de routage performante pour interconnecter les différents sites tout en optimisant la bande passante et les temps de convergence.",
        objectif: "Concevoir et déployer une architecture MPLS multi-sites avec analyse comparative des différents protocoles de routage dynamique (OSPF, EIGRP, RIP) et étude des solutions SD-WAN.",
        realisation: [
          "Configuration de 6 routeurs Cisco en topologie MPLS avec Label Distribution Protocol (LDP)",
          "Implémentation et tests comparatifs des protocoles OSPF (zones multi-areas), EIGRP (métriques composites) et RIP v2",
          "Configuration des VRF (Virtual Routing and Forwarding) pour la séparation du trafic client",
          "Mise en place de QoS (Quality of Service) pour prioriser le trafic voix/vidéo",
          "Analyse des performances : temps de convergence, utilisation bande passante, overhead protocolaire",
          "Documentation complète de l'architecture et comparaison avec solutions SD-WAN (VeloCloud, Cisco SD-WAN)"
        ],
        resultats: "Réseau MPLS opérationnel avec amélioration de 40% du temps de convergence avec OSPF vs RIP. Documentation technique détaillée avec recommandations pour migration SD-WAN.",
        technologies: ["Cisco IOS", "GNS3", "MPLS", "VRF", "BGP", "QoS", "Wireshark"]
      }
    },
    {
      title: "Supervision Réseau avec Cacti & SNMP",
      description:
        "Déploiement d'une plateforme de monitoring complète avec Cacti pour supervision temps réel des équipements réseau.",
      icon: Activity,
      skills: ["Cacti", "SNMP", "Monitoring", "RRDtool", "Linux"],
      color: "secondary",
      category: "supervision",
      topology: topologyCacti,
      detailedDescription: {
        contexte: "L'entreprise ne disposait pas de visibilité sur l'état de santé de son infrastructure réseau. Les pannes étaient détectées tardivement par les utilisateurs, causant des interruptions de service prolongées et impactant la productivité.",
        objectif: "Mettre en place une solution de supervision réseau centralisée permettant le monitoring en temps réel de l'ensemble de l'infrastructure (switches, routeurs, serveurs).",
        realisation: [
          "Installation et configuration de Cacti sur serveur Debian 11 avec Apache, MySQL et PHP",
          "Configuration SNMP v2c et v3 sur l'ensemble des équipements réseau (Cisco, HP)",
          "Création de templates personnalisés pour monitoring spécifique (température switches, utilisation mémoire routeurs)",
          "Configuration des graphiques RRDtool pour visualisation bande passante, CPU, mémoire, uptime",
          "Mise en place d'alertes email via plugin Thold pour seuils critiques (> 80% CPU, perte de connectivité)",
          "Documentation des OID SNMP utilisés et procédures d'ajout de nouveaux équipements"
        ],
        resultats: "Plateforme de supervision opérationnelle surveillant 25 équipements avec génération automatique de 150+ graphiques. Réduction du temps de détection des incidents de 60%.",
        technologies: ["Cacti", "SNMP v2c/v3", "RRDtool", "MySQL", "Apache", "Plugin Thold", "MIB Browser"]
      }
    },
    {
      title: "Serveur DNS Autoritaire BIND9",
      description:
        "Installation et configuration d'un serveur DNS autoritaire avec BIND9, gestion des zones et sécurisation DNSSEC.",
      icon: Globe,
      skills: ["DNS", "BIND9", "DNSSEC", "Linux", "Sécurité"],
      color: "primary",
      category: "serveur",
      topology: topologyDns,
      detailedDescription: {
        contexte: "L'entreprise utilisait un serveur DNS vieillissant non sécurisé et sans redondance. Les risques de DNS spoofing et l'absence de haute disponibilité représentaient une vulnérabilité critique pour l'infrastructure.",
        objectif: "Déployer un serveur DNS autoritaire sécurisé pour gérer la résolution de noms de domaine interne de l'entreprise avec haute disponibilité et sécurisation DNSSEC.",
        realisation: [
          "Installation de BIND9 sur Ubuntu Server 22.04 avec configuration maître/esclave",
          "Création et configuration des zones directes et inverses (exemple.local, 192.168.1.0/24)",
          "Configuration des enregistrements A, AAAA, CNAME, MX, PTR, SRV pour infrastructure complète",
          "Implémentation DNSSEC avec génération de clés ZSK/KSK et signature des zones",
          "Configuration des vues (views) pour résolution DNS différenciée selon origine de la requête",
          "Mise en place de logging détaillé et analyse avec rndc pour troubleshooting",
          "Tests de performance avec dnsperf et validation DNSSEC avec dig +dnssec"
        ],
        resultats: "Serveur DNS opérationnel gérant 200+ enregistrements avec temps de réponse moyen < 10ms. Infrastructure hautement disponible avec basculement automatique maître/esclave.",
        technologies: ["BIND9", "DNSSEC", "Ubuntu Server", "rndc", "dig", "named-checkzone", "dnsperf"]
      }
    },
    {
      title: "Infrastructure Virtualisée VMware vSphere",
      description:
        "Déploiement d'une infrastructure de virtualisation complète avec VMware ESXi et vCenter pour environnement de production.",
      icon: Cloud,
      skills: ["VMware", "ESXi", "vCenter", "vMotion", "HA"],
      color: "secondary",
      category: "virtualisation",
      topology: topologyVmware,
      detailedDescription: {
        contexte: "L'infrastructure physique de l'entreprise était vieillissante avec des serveurs sous-utilisés. La nécessité de réduire les coûts, d'améliorer la flexibilité et d'assurer la continuité de service a conduit à un projet de virtualisation.",
        objectif: "Concevoir et déployer une infrastructure de virtualisation enterprise-grade avec VMware vSphere pour héberger 30+ machines virtuelles de production.",
        realisation: [
          "Installation de 3 hyperviseurs ESXi 7.0 sur serveurs Dell PowerEdge avec stockage partagé iSCSI",
          "Déploiement et configuration de vCenter Server Appliance 7.0 pour gestion centralisée",
          "Configuration du cluster HA (High Availability) avec 3 hôtes pour tolérance de panne",
          "Mise en place de vMotion pour migration à chaud des VM sans interruption de service",
          "Configuration du DRS (Distributed Resource Scheduler) pour load balancing automatique",
          "Création de templates VM (Windows Server, Linux) et déploiement automatisé",
          "Configuration des vSwitches distribués et VLANs pour segmentation réseau",
          "Mise en place de snapshots automatisés et politiques de backup avec Veeam"
        ],
        resultats: "Infrastructure virtualisée opérationnelle hébergeant 35 VM avec taux de disponibilité 99.9%. Réduction des coûts matériels de 65% et temps de provisionnement VM < 10 minutes.",
        technologies: ["VMware ESXi 7.0", "vCenter", "vMotion", "HA/DRS", "vSAN", "iSCSI", "Veeam Backup"]
      }
    },
    {
      title: "Serveur Web LAMP Sécurisé",
      description:
        "Configuration d'un serveur web Linux Apache MySQL PHP avec SSL/TLS, hardening et monitoring.",
      icon: Server,
      skills: ["Linux", "Apache", "MySQL", "PHP", "SSL", "Sécurité"],
      color: "primary",
      category: "serveur",
      detailedDescription: {
        contexte: "L'entreprise souhaitait héberger en interne plusieurs applications web métier tout en garantissant un niveau de sécurité élevé face aux menaces web modernes (injections SQL, XSS, brute-force).",
        objectif: "Déployer un serveur web LAMP sécurisé pour hébergement d'applications web avec certificat SSL/TLS et configuration hardening selon les best practices.",
        realisation: [
          "Installation et configuration de la stack LAMP (Linux Ubuntu 22.04, Apache 2.4, MySQL 8.0, PHP 8.1)",
          "Configuration de Virtual Hosts Apache pour hébergement multi-sites",
          "Installation et configuration de certificats SSL/TLS Let's Encrypt avec renouvellement automatique",
          "Hardening du serveur : désactivation de modules inutiles, configuration mod_security (WAF)",
          "Configuration MySQL : utilisateurs avec privilèges limités, bind-address, chiffrement connexions",
          "Mise en place de PHP-FPM avec pools dédiés par site pour isolation",
          "Configuration fail2ban pour protection contre brute-force SSH et Apache",
          "Monitoring avec Netdata pour surveillance en temps réel (CPU, RAM, I/O, requêtes Apache)"
        ],
        resultats: "Serveur web sécurisé opérationnel hébergeant 5 sites avec score A+ SSL Labs. 0 vulnérabilité critique détectée lors des audits de sécurité.",
        technologies: ["Ubuntu Server", "Apache 2.4", "MySQL 8.0", "PHP 8.1", "Let's Encrypt", "ModSecurity", "Fail2ban", "Netdata"]
      }
    },
    {
      title: "Firewall pfSense & Segmentation Réseau",
      description:
        "Déploiement d'un firewall pfSense avec règles de filtrage avancées, VPN et segmentation VLAN.",
      icon: Shield,
      skills: ["pfSense", "Firewall", "VPN", "VLAN", "Sécurité"],
      color: "secondary",
      category: "sécurité",
      topology: topologyPfsense,
      detailedDescription: {
        contexte: "Suite à plusieurs incidents de sécurité et à l'augmentation du télétravail, l'entreprise avait besoin d'une solution de sécurité périmétrique robuste permettant de protéger le réseau et d'offrir un accès distant sécurisé aux collaborateurs.",
        objectif: "Mettre en place une solution de sécurité périmétrique complète avec pfSense pour protéger le réseau interne, segmenter les flux et permettre l'accès distant sécurisé.",
        realisation: [
          "Installation de pfSense 2.7 sur serveur dédié avec interfaces WAN/LAN/DMZ/GUEST",
          "Configuration de règles de filtrage par zones avec principe du moindre privilège",
          "Segmentation réseau avec VLANs (VLAN 10: Admin, VLAN 20: Users, VLAN 30: DMZ, VLAN 99: Guest)",
          "Mise en place de pfBlockerNG pour blocage géo-IP et listes noires malware/phishing",
          "Configuration VPN IPsec site-to-site pour interconnexion avec site distant",
          "Déploiement OpenVPN pour accès distant des utilisateurs (authentification certificat)",
          "Configuration Snort/Suricata pour détection d'intrusions (IDS/IPS)",
          "Mise en place de QoS avec traffic shaping pour priorisation flux métier"
        ],
        resultats: "Firewall opérationnel filtrant 50K+ sessions simultanées avec détection/blocage automatique de 200+ menaces par jour. VPN avec 30 utilisateurs distants actifs.",
        technologies: ["pfSense 2.7", "IPsec", "OpenVPN", "Snort/Suricata", "pfBlockerNG", "VLAN", "HAProxy"]
      }
    },
    {
      title: "Architecture Réseau Datacenter",
      description:
        "Conception et déploiement d'une architecture réseau datacenter avec switches L2/L3, redondance et haute disponibilité.",
      icon: Layers,
      skills: ["Switching", "Routing", "STP", "HSRP", "Agrégation"],
      color: "primary",
      category: "réseau",
      topology: topologyDatacenter,
      detailedDescription: {
        contexte: "La construction d'un nouveau datacenter nécessitait la conception d'une architecture réseau moderne, évolutive et hautement disponible pour supporter les charges de production critiques de l'entreprise.",
        objectif: "Concevoir une architecture réseau datacenter redondante et hautement disponible selon le modèle hiérarchique Cisco (Core/Distribution/Access).",
        realisation: [
          "Conception de l'architecture réseau 3-tiers avec switches Cisco Catalyst série 9000",
          "Configuration du cœur de réseau (Core) avec 2 switches L3 en full-mesh 10 Gbps",
          "Déploiement de la couche Distribution avec switches L3 et routage inter-VLAN",
          "Configuration de la couche Access avec switches L2 PoE pour téléphonie IP",
          "Mise en place de la redondance avec STP (Rapid PVST+) et PortFast sur ports access",
          "Configuration HSRP (Hot Standby Router Protocol) pour passerelle par défaut redondée",
          "Agrégation de liens avec LACP (802.3ad) pour bande passante et résilience",
          "Configuration de VLANs (Voice, Data, Management, Storage) et 802.1Q trunking",
          "Mise en place de Port-Security et DHCP Snooping pour sécurité L2"
        ],
        resultats: "Architecture réseau datacenter opérationnelle supportant 200+ serveurs avec bande passante agrégée 40 Gbps. Basculement automatique < 3 secondes en cas de panne.",
        technologies: ["Cisco Catalyst 9300/9500", "HSRP", "STP", "LACP", "VTP", "802.1Q", "Port-Security"]
      }
    },
    {
      title: "Sauvegarde Centralisée avec Bacula",
      description:
        "Déploiement d'une solution de sauvegarde centralisée avec Bacula pour protection des données serveurs Linux/Windows.",
      icon: HardDrive,
      skills: ["Bacula", "Backup", "Recovery", "Stockage", "Linux"],
      color: "secondary",
      category: "serveur",
      detailedDescription: {
        contexte: "Après une perte de données critique due à une panne serveur, l'entreprise a pris conscience de l'absence d'une stratégie de sauvegarde structurée. Un projet de mise en place d'une solution de backup centralisée est devenu prioritaire.",
        objectif: "Mettre en place une infrastructure de sauvegarde centralisée automatisée pour protéger les données critiques de 20+ serveurs de production.",
        realisation: [
          "Installation de Bacula sur serveur Debian 11 (Director, Storage Daemon, Catalog MySQL)",
          "Déploiement des agents Bacula File Daemon sur serveurs Linux (Ubuntu, CentOS) et Windows Server",
          "Configuration de jobdefs pour sauvegardes Full/Differential/Incremental automatiques",
          "Création de pools de stockage avec rétention différenciée (30j/90j/1an) selon criticité",
          "Configuration de schedules automatisés : Full hebdomadaire, Differential quotidienne, Incremental toutes les 4h",
          "Mise en place de la compression et du chiffrement AES-256 pour sauvegardes sensibles",
          "Configuration d'alertes email pour succès/échec des jobs et monitoring espace disque",
          "Tests de restauration réguliers et documentation des procédures de recovery",
          "Intégration avec stockage NAS Synology pour archivage long terme"
        ],
        resultats: "Solution de backup opérationnelle sauvegardant 2 To de données par jour avec taux de succès 98%. RPO < 4h et RTO < 2h pour serveurs critiques.",
        technologies: ["Bacula 9.6", "MySQL", "rsync", "NFS", "Btrfs", "Bash scripting", "Webmin-Bacula"]
      }
    },
    {
      title: "Conteneurisation avec Docker",
      description:
        "Déploiement d'applications en conteneurs Docker avec Docker Compose pour environnements dev/test/prod.",
      icon: Layers,
      skills: ["Docker", "Conteneurs", "Docker Compose", "Registry"],
      color: "primary",
      category: "virtualisation",
      detailedDescription: {
        contexte: "Les équipes de développement faisaient face à des problèmes récurrents de différences entre environnements (dev/test/prod) causant des bugs en production. La conteneurisation est apparue comme la solution pour standardiser les déploiements.",
        objectif: "Containeriser les applications de l'entreprise avec Docker pour améliorer la portabilité, le déploiement et l'isolation des environnements.",
        realisation: [
          "Installation de Docker Engine sur serveurs Ubuntu 22.04 avec configuration production-ready",
          "Création de Dockerfiles optimisés multi-stage pour applications PHP/Node.js/Python",
          "Déploiement de stack complète avec Docker Compose (Nginx, PHP-FPM, MySQL, Redis)",
          "Configuration de volumes persistants et networks Docker pour isolation",
          "Mise en place d'un Docker Registry privé avec Harbor pour stockage des images",
          "Configuration de health checks et restart policies pour haute disponibilité",
          "Implémentation de logs centralisés avec ELK stack (Elasticsearch, Logstash, Kibana)",
          "Optimisation des images Docker : layers caching, .dockerignore, images Alpine",
          "Mise en place de pipelines CI/CD avec GitLab pour build/push automatique des images"
        ],
        resultats: "Infrastructure conteneurisée hébergeant 15 applications avec temps de déploiement réduit de 80% (< 5 min vs 40 min). Consommation ressources optimisée de 60%.",
        technologies: ["Docker 24.0", "Docker Compose", "Harbor", "Nginx", "GitLab CI/CD", "ELK Stack"]
      }
    },
    {
      title: "Active Directory & GPO",
      description:
        "Administration d'un domaine Active Directory avec gestion des utilisateurs, GPO et stratégies de sécurité.",
      icon: Lock,
      skills: ["Active Directory", "GPO", "Windows Server", "LDAP"],
      color: "secondary",
      category: "serveur",
      detailedDescription: {
        contexte: "La gestion décentralisée des utilisateurs et des postes de travail (comptes locaux, pas de politique de sécurité uniforme) créait des failles de sécurité et une charge administrative importante pour l'équipe IT.",
        objectif: "Administrer un domaine Active Directory pour centraliser la gestion des utilisateurs, ordinateurs et politiques de sécurité de l'entreprise (150 utilisateurs).",
        realisation: [
          "Installation et configuration de Windows Server 2022 en tant que contrôleur de domaine",
          "Promotion du serveur en DC avec rôle AD DS (Active Directory Domain Services)",
          "Création de l'arborescence OU (Organizational Units) par département/fonction",
          "Gestion des comptes utilisateurs et groupes de sécurité avec délégation d'administration",
          "Configuration des GPO (Group Policy Objects) pour sécurité et paramétrage postes",
          "Déploiement GPO : politique de mots de passe (12+ caractères, expiration 90j, historique)",
          "Configuration GPO : verrouillage session auto, déploiement logiciels, mapping lecteurs réseau",
          "Mise en place de WSUS pour gestion centralisée des mises à jour Windows",
          "Configuration de la réplication AD avec second DC pour haute disponibilité",
          "Intégration RADIUS pour authentification réseau sans-fil (802.1X)"
        ],
        resultats: "Domaine AD opérationnel gérant 150 utilisateurs et 120 postes. Déploiement de 25 GPO avec conformité sécurité accrue et administration simplifiée.",
        technologies: ["Windows Server 2022", "Active Directory", "GPO", "WSUS", "DNS", "DHCP", "NPS/RADIUS"]
      }
    }
  ];

  const categories: { name: ProjectCategory | "tous"; label: string; color: string }[] = [
    { name: "tous", label: "Tous les projets", color: "text-primary" },
    { name: "réseau", label: "Réseau", color: "text-cyan-400" },
    { name: "supervision", label: "Supervision", color: "text-green-400" },
    { name: "serveur", label: "Serveur", color: "text-blue-400" },
    { name: "virtualisation", label: "Virtualisation", color: "text-purple-400" },
    { name: "sécurité", label: "Sécurité", color: "text-red-400" }
  ];

  const filteredProjects = activeCategory === "tous" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projets" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 network-grid opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">
          <span className="text-primary text-glow">{">"}</span> Projets Techniques
        </h2>
        <div className="h-1 w-24 bg-primary mx-auto mb-8 rounded-full border-glow"></div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-2 font-mono text-sm rounded-full border transition-all duration-300 ${
                activeCategory === category.name
                  ? `bg-primary/20 border-primary ${category.color} border-glow font-semibold scale-105`
                  : "bg-terminal-bg border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projets groupés par catégorie ou tous */}
        <div className="max-w-6xl mx-auto space-y-12">
          {activeCategory === "tous" ? (
            // Afficher tous les projets groupés par catégorie
            categories.filter(cat => cat.name !== "tous").map((category) => {
              const categoryProjects = projects.filter(p => p.category === category.name);
              if (categoryProjects.length === 0) return null;

              return (
                <div key={category.name} className="space-y-4">
                  <h3 className={`text-2xl font-mono font-bold ${category.color} mb-6`}>
                    <span className="text-primary">{">"}</span> {category.label}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryProjects.map((project, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedProject(project)}
                        className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer hover:scale-[1.02]"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 group-hover:border-glow transition-all flex-shrink-0">
                              <project.icon className="text-primary" size={28} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-mono text-lg font-semibold mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                                {project.title}
                                <ArrowRight
                                  size={16}
                                  className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                />
                              </h4>
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-1.5">
                                {project.skills.slice(0, 4).map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-xs font-mono"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {project.skills.length > 4 && (
                                  <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground">
                                    +{project.skills.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-terminal-bg border-t border-border px-4 py-2">
                          <p className="font-mono text-xs text-muted-foreground">
                            <span className="text-primary">{">"}</span> Cliquez pour voir les détails
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Afficher uniquement les projets de la catégorie sélectionnée
            <div className="space-y-4">
              <h3 className={`text-2xl font-mono font-bold ${categories.find(c => c.name === activeCategory)?.color} mb-6`}>
                <span className="text-primary">{">"}</span> {categories.find(c => c.name === activeCategory)?.label}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedProject(project)}
                      className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group cursor-pointer hover:scale-[1.02]"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg border border-primary/30 group-hover:border-glow transition-all flex-shrink-0">
                            <project.icon className="text-primary" size={28} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-mono text-lg font-semibold mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                              {project.title}
                              <ArrowRight
                                size={16}
                                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              />
                            </h4>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                              {project.skills.slice(0, 4).map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-xs font-mono"
                                >
                                  {skill}
                                </span>
                              ))}
                              {project.skills.length > 4 && (
                                <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground">
                                  +{project.skills.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-terminal-bg border-t border-border px-4 py-2">
                        <p className="font-mono text-xs text-muted-foreground">
                          <span className="text-primary">{">"}</span> Cliquez pour voir les détails
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Dialog pour les détails du projet */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-card border-primary/30">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <selectedProject.icon className="text-primary" size={36} />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-mono mb-2">
                      {selectedProject.title}
                    </DialogTitle>
                    <Badge variant="outline" className={`${categories.find(c => c.name === selectedProject.category)?.color} border-current`}>
                      {categories.find(c => c.name === selectedProject.category)?.label}
                    </Badge>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Contexte */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Contexte
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedProject.detailedDescription.contexte}
                  </p>
                </div>

                {/* Objectif */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Objectif
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedProject.detailedDescription.objectif}
                  </p>
                </div>

                {/* Réalisation */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Réalisation
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.detailedDescription.realisation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground">
                        <span className="text-primary font-mono text-sm mt-1 flex-shrink-0">▸</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Résultats */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Résultats
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {selectedProject.detailedDescription.resultats}
                  </p>
                </div>

                {/* Topologie Réseau */}
                {selectedProject.topology && (
                  <div className="bg-terminal-bg border border-border rounded-lg p-5">
                    <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                      <span className="text-primary">{">"}</span> Topologie Réseau
                    </h4>
                    <div className="rounded-lg overflow-hidden border border-primary/30">
                      <img 
                        src={selectedProject.topology} 
                        alt={`Topologie - ${selectedProject.title}`}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Technologies & Outils
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.detailedDescription.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Toutes les compétences */}
                <div className="bg-terminal-bg border border-border rounded-lg p-5">
                  <h4 className="font-mono text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                    <span className="text-primary">{">"}</span> Compétences développées
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-secondary/20 border border-secondary/40 rounded-full text-sm font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
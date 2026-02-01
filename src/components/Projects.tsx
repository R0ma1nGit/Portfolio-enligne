import { Network, Server, Globe, ArrowRight, Activity, Shield, Cloud, Layers, HardDrive, Lock, FileText, AlertTriangle, Loader2, X, CheckCircle2, ClipboardCheck, Monitor, Wifi, Workflow, Database, Users, Book } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import topologyMpls from "@/assets/topology-mpls.png";
import topologyCacti from "@/assets/Cacti.png";
import topologyDns from "@/assets/topology-dns.png";
import topologyVmware from "@/assets/topology-vmware.png";
import topologyPfsense from "@/assets/topology-pfsense.png";
import topologyDatacenter from "@/assets/topology-datacenter.png";
import topologyAnsible from "@/assets/Ansible.png";
import topologyAD from "@/assets/ActiveDirectory.png";
import topologyMQTT from "@/assets/MQTT.png";
import topologyMPLS from "@/assets/MPLS.png";

type ProjectCategory = "réseau" | "supervision" | "serveur" |"sécurité";

interface Project {
  title: string;
  description: string;
  icon: any;
  skills: string[];
  color: string;
  category: ProjectCategory;
  topology?: string;
  rapport?: string;
  status?: "en_cours" | "termine";
  detailedDescription: {
    contexte: string;
    objectif: string;
    realisation: string[];
    resultats: string;
    technologies: string[];
  };
}

const Projects = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "tous">("tous");
  const [pdfOpen, setPdfOpen] = useState(false);

  // Fonction de journalisation simulée
  const logPdfAccess = (projectTitle: string) => {
    const timestamp = new Date().toISOString();
    console.info(`[AUDIT] Ouverture du rapport pour "${projectTitle}" à ${timestamp}`);
    toast({
      title: "Document Sécurisé",
      description: "Mode lecture seule activé. Téléchargement désactivé.",
    });
  };

  const handleOpenPdf = () => {
    if (selectedProject?.rapport) {
      logPdfAccess(selectedProject.title);
      setPdfOpen(true);
    } else {
        toast({
            variant: "destructive",
            title: "Document indisponible",
            description: "Le rapport n'est pas encore disponible pour ce projet.",
        });
    }
  };

  const projects: Project[] = [
    
    {
      title: "Supervision Réseau avec Cacti & SNMP",
      status: "termine",
      description:
        "Déploiement d'une architecture de supervision sur un réseau virtualisé segmenté (LAN/NAT).",
      icon: Activity,
      skills: ["Cacti", "SNMP", "Linux (Debian/Ubuntu)", "Routing/NAT", "VirtualBox"],
      color: "secondary",
      category: "supervision",
      topology: topologyCacti,
      rapport: "/Rapport_Cacti.pdf",
      detailedDescription: {
        contexte: "Dans le cadre d'un projet académique (SAE), l'objectif était de simuler un réseau d'entreprise cloisonné pour en assurer la surveillance, sans accès direct des clients à Internet.",
        objectif: "Mettre en œuvre une chaîne de supervision complète (Manager/Agent) via le protocole SNMP pour monitorer la disponibilité et les ressources d'un parc hétérogène.",
        realisation: [
          "Conception d'une topologie virtualisée (3 VMs) : Création d'un LAN isolé derrière une passerelle Ubuntu configurée en NAT (iptables, ip_forward)",
          "Installation et configuration de la stack LAMP (Linux, Apache, MariaDB, PHP) nécessaire au fonctionnement de Cacti",
          "Déploiement des agents SNMP (snmpd) sur les machines clientes Debian et configuration des communautés",
          "Intégration des hôtes dans la console Cacti et création des graphiques de performance (Trafic interface, Charge CPU, Ping)",
          "Tests de coupure : Validation de la détection d'incident (Passage des hôtes à l'état 'Down' dans la console)"
        ],
        resultats: "Infrastructure fonctionnelle permettant de visualiser en temps réel l'état de santé du parc (UP/DOWN) et l'historique d'utilisation des ressources via les graphiques RRDtool.",
        technologies: ["Cacti 1.2", "SNMP", "VirtualBox", "Debian/Ubuntu", "Apache/MariaDB", "IPTables"]
      }
    },
    {
      title: "Monitoring Multi-Sites TIG (Telegraf-InfluxDB-Grafana)",
      description:
        "Supervision temps réel d'un parc serveurs distribué (Paris/NY/Londres) avec cartographie et alerting.",
      icon: Monitor, // Utilisez l'icône Monitor importée de lucide-react
      skills: ["Docker", "Grafana", "InfluxDB", "Debian 12", "Troubleshooting"],
      color: "primary",
      category: "supervision",
      // topology: topologyTIG, // À décommenter si vous ajoutez l'image plus tard
      rapport: "/Rapport_Meteo.pdf", // À ajouter si vous créez le PDF
      status: "termine",
      detailedDescription: {
        contexte: "Besoin de surveiller en temps réel la santé système (CPU) et la qualité réseau (Latence) d'un parc de serveurs Linux répartis géographiquement (Paris, New York, Londres) sur une interface unique.",
        objectif: "Concevoir et déployer une stack de monitoring complète TIG (Telegraf, InfluxDB, Grafana) conteneurisée pour visualiser les métriques et la géolocalisation des actifs.",
        realisation: [
          "Architecture Distribuée : Serveur Maître (Docker/InfluxDB/Grafana) et Agents Telegraf (Nodes) sur 3 VMs Debian 12",
          "Visualisation Avancée : Création d'un Dashboard 'Météo' avec Worldmap (injection tags GPS) et Jauges CPU (alerting visuel > 80%)",
          "Métrologie Réseau : Surveillance de la connectivité et latence inter-sites via sondes Ping actives",
          "Troubleshooting Système : Contournement des restrictions GPG Debian 12 (Bookworm) et correction des permissions d'exécution pour le plugin Ping",
          "Data Engineering : Utilisation des Transformations Grafana pour convertir les coordonnées GPS (String) en nombres à la volée"
        ],
        resultats: "Infrastructure de monitoring opérationnelle offrant une vue géographique instantanée. Validation des compétences sur la chaîne complète de la donnée (Collecte > Stockage > Visualisation) et le dépannage en environnement conteneurisé.",
        technologies: ["Docker & Compose", "Grafana", "InfluxDB", "Telegraf", "Debian 12 Bookworm", "TOML"]
      }
    },
    {
      title: "Chaîne IoT & Supervision de bout en bout", // Titre aligné sur le CV
      description:
        "Acquisition de données Température/Humidité (MQTT, InfluxDB) et mise en place d'alertes de dépassement (Grafana).",
      icon: Wifi,
      // Stack alignée sur l'image : Docker • Python • MQTT • Grafana • InfluxDB
      skills: ["Docker", "Python", "MQTT", "Grafana", "InfluxDB"], 
      color: "secondary",
      category: "supervision",
      topology: topologyMQTT,
      rapport: "/Rapport_MQTT.pdf",
      status: "termine",
      detailedDescription: {
        contexte: "L'objectif était de concevoir un système de télémesure environnementale autonome capable non seulement de remonter des données (Température/Humidité) mais aussi d'être piloté à distance.",
        objectif: "Mettre en œuvre une architecture IoT complète (Edge to Cloud) utilisant des protocoles standards (MQTT) et une stack de visualisation conteneurisée.",
        realisation: [
          "Programmation sur microcontrôleur Pycom (MicroPython) : Lecture des capteurs Pysense et gestion de la connectivité WiFi/MQTT",
          "Déploiement d'une infrastructure Docker sur Debian 12 hébergeant : InfluxDB (Base de données), Grafana (Visu) et Mosquitto (Broker)",
          "Développement d'un script 'Bridge' en Python pour intercepter les topics MQTT et injecter les métriques dans InfluxDB",
          "Mise en place d'un Dashboard de contrôle Node-RED permettant d'envoyer des ordres (Pause/Reprise) aux capteurs en temps réel",
          "Recettes de test : Configuration des seuils d'alerte (Alerting) pour détecter les dépassements de température critiques" // Ajouté pour coller au CV
        ],
        resultats: "Système opérationnel permettant la visualisation temps réel des courbes environnementales et le déclenchement d'alertes automatiques.",
        technologies: ["Pycom (MicroPython)", "MQTT (Mosquitto)", "Python Scripting", "Docker Compose", "InfluxDB", "Grafana"]
      }
    },
    {
      title: "Automatisation de Parc Serveurs (Ansible)",
      description:
        "Pilotage automatique d'une flotte de serveurs Linux : configuration, installation et mises à jour centralisées.",
      icon: Workflow, // Ou 'Workflow' si vous l'avez importé
      skills: ["Ansible", "Automatisation", "Linux Debian", "SSH", "YAML"],
      color: "primary",
      category: "serveur", // ou "réseau" selon votre préférence
      status: "termine",
      topology: topologyAnsible,  
      rapport: "/Rapport_Ansible.pdf",
      detailedDescription: {
        contexte: "Gérer des serveurs un par un est répétitif et source d'erreurs. J'avais besoin d'une méthode pour administrer plusieurs machines simultanément sans me connecter à chacune d'elles.",
        objectif: "Mettre en place un 'centre de contrôle' (Nœud de gestion) capable d'envoyer des configurations et des mises à jour à distance sur tout un parc de machines, de manière automatique et sécurisée.",
        realisation: [
          "Création d'un laboratoire virtuel avec 3 serveurs Debian connectés en réseau privé pour simuler une entreprise.",
          "Mise en place d'une 'télécommande' sécurisée : configuration de clés SSH pour permettre au serveur maître de piloter les autres sans mot de passe.",
          "Création de scripts (Playbooks) simples pour automatiser les tâches courantes : installer des logiciels (Nmap, NTP), lancer les mises à jour système (apt update) et copier des fichiers.",
          "Utilisation de l'inventaire pour cibler précisément quelles machines doivent recevoir quelle configuration."
        ],
        resultats: "Je peux désormais configurer ou mettre à jour l'ensemble de mes serveurs en lançant une seule commande. Ce qui prenait 1 heure manuellement se fait maintenant en 2 minutes, sans risque d'oubli.",
        technologies: ["Ansible", "Linux Debian", "SSH", "Playbooks YAML", "Bash"]
      }
    },
    {
      title: "Routeur Linux & Architecture Sécurisée (DMZ/VLAN)",
      description:
        "Transformation d'un serveur Debian en routeur/firewall : Segmentation, NAT/PAT et VLANs 802.1Q.",
      icon: Shield, // ou 'Route' si importé
      skills: ["Linux Networking", "iptables", "VLAN 802.1Q", "DMZ", "Troubleshooting"],
      color: "secondary",
      category: "réseau",
      status: "termine",
      rapport: "/Rapport_Reseau_Linux.pdf",
      // topology: topologyLinuxRouter, // Si vous avez l'image du schéma
      detailedDescription: {
        contexte: "Dans les environnements où les équipements dédiés (Cisco/Fortinet) ne sont pas disponibles, il est essentiel de savoir déployer des fonctions réseaux avancées directement via le système d'exploitation Linux.",
        objectif: "Concevoir une passerelle de sécurité logicielle robuste assurant le routage, le filtrage et la segmentation entre un LAN privé, une DMZ publique et l'accès Internet.",
        realisation: [
          "Configuration du routage (IP Forwarding) et de l'adressage statique sur Debian 12",
          "Mise en place de la sécurité périmétrique : Règles iptables pour le PAT (Sortant) et le DNAT (Redirection de port Web vers la DMZ)",
          "Segmentation logique : Création d'interfaces virtuelles pour le trunking VLAN (802.1Q) vers les clients",
          "Déploiement de services : Serveur Web Apache en zone isolée (DMZ) accessible depuis l'extérieur",
          "Validation technique : Analyse de trames avec Tcpdump pour vérifier le tagging des paquets VLAN"
        ],
        resultats: "Infrastructure fonctionnelle et sécurisée. Validation de l'isolation des zones (LAN vs DMZ) et de l'accessibilité des services web via la redirection de port.",
        technologies: ["Debian Linux", "iptables (Netfilter)", "Apache2", "Tcpdump", "VLAN", "VirtualBox"]
      }
    },
{
      title: "Architecture MPLS & Virtualisation", // Titre aligné sur le CV
      description:
        "Conception d'un réseau opérateur L3VPN complet : Isolation clients (VRF), Routage (OSPF/BGP) et Analyse protocolaire.",
      icon: Globe,
      // Stack mise à jour : Wireshark est plus pertinent que Cacti ici
      skills: ["Cisco IOS", "GNS3", "MPLS", "Wireshark"], 
      color: "primary",
      category: "réseau",
      topology: topologyMPLS,
      // rapport: "/Rapport_MPLS_L3VPN.pdf",
      status: "termine",
      detailedDescription: {
        contexte: "Simulation d'un cœur de réseau Opérateur (ISP) devant interconnecter les sites distants d'un client ('Carrefour') tout en garantissant une étanchéité totale du trafic vis-à-vis des autres clients.",
        objectif: "Mettre en œuvre une architecture MPLS L3VPN complète : Routage interne (OSPF), Commutation de labels (LDP), Isolation (VRF) et propagation des routes VPNv4 (MP-BGP).",
        realisation: [
          "Configuration du Backbone IGP (OSPF Area 0) et activation du protocole LDP sur les interfaces de cœur",
          "Création des instances de routage virtuel (VRF) sur les routeurs PE pour isoler le client 'Carrefour'",
          "Configuration des sessions MP-BGP pour l'échange de routes VPNv4 entre les routeurs de bordure (PE)",
          "Mise en place de la redistribution bidirectionnelle entre le routage client (OSPF) et le BGP opérateur",
          "Analyse Wireshark : Décorticage de la pile de labels MPLS (Label de transport vs Label VPN) et des messages BGP Update"
        ],
        resultats: "Interconnexion des sites clients opérationnelle (Ping validé). Maîtrise des mécanismes de forwarding MPLS (Swap/Pop) et de la signalisation BGP VPNv4.",
        technologies: ["Cisco IOS", "GNS3", "MPLS L3VPN", "MP-BGP", "Wireshark"]
      }
    },
    {
      title: "Cluster SQL Haute Disponibilité (MariaDB)",
      description:
        "Mise en œuvre d'une architecture de base de données distribuée avec réplication bidirectionnelle et sécurité.",
      icon: Database, // Nécessite l'import de 'Database'
      skills: ["MariaDB/MySQL", "Réplication SQL", "Triggers", "Sécurité (RBAC)", "Linux"],
      color: "primary",
      category: "serveur", // ou "système"
      status: "termine",
      rapport: "/Rapport_MySQL.pdf", 
      detailedDescription: {
        contexte: "Pour garantir la continuité de service d'une application critique (type E-commerce), une base de données isolée représente un point unique de défaillance (SPOF). Il était nécessaire d'assurer la redondance des données.",
        objectif: "Concevoir une base de données relationnelle complexe (Procédures stockées, Triggers) et déployer une réplication Maître-Esclave (puis bidirectionnelle) pour assurer la haute disponibilité.",
        realisation: [
          "Modélisation et création de la base 'Amazon' : Tables relationnelles (Clés étrangères), insertion de jeux de données de test",
          "Automatisation SQL : Développement de procédures stockées (ajout client simplifié) et de Triggers (alerte stock critique) pour l'intégrité des données",
          "Sécurité et RBAC : Création d'utilisateurs à moindres privilèges (Gestionnaire vs Consultant) et restriction des accès réseau",
          "Mise en place de la Réplication : Configuration des fichiers 'my.cnf' (server-id, log-bin), gestion des utilisateurs de réplication et synchronisation initiale (Dump SQL)",
          "Troubleshooting : Résolution des problèmes de connectivité inter-nœuds (Configuration Pare-feu UFW port 3306) et diagnostic des threads de réplication (Slave_IO/SQL_Running)"
        ],
        resultats: "Cluster de base de données opérationnel. La réplication bidirectionnelle assure que toute écriture sur le Maître est instantanément propagée sur l'Esclave, garantissant la résilience des données.",
        technologies: ["MariaDB", "SQL", "Bash", "UFW (Firewall)", "Replication Binlog"]
      }
    },
    // {
    //   title: "Sécurisation Périmétrique Stormshield (SN310)",
    //   description:
    //     "Déploiement d'un pare-feu certifié ANSSI : Segmentation (DMZ), Filtrage et Supervision SNMPv3.",
    //   icon: Shield, // Importez 'Shield' de lucide-react
    //   skills: ["Stormshield (SNS)", "Firewalling", "IPS/IDS", "SNMPv3", "Matrice de Flux"],
    //   color: "secondary", // Rouge pour la sécurité (ou gardez votre code couleur)
    //   category: "sécurité",
    //   // rapport: "/Rapport_Stormshield_SN310.pdf", // À générer
    //   status: "en_cours",
    //   detailedDescription: {
    //     contexte: "Dans un contexte d'exigence de souveraineté numérique (similaire aux contraintes des OIV/Hôpitaux), l'objectif était de sécuriser l'interconnexion d'un réseau d'entreprise via une solution certifiée ANSSI.",
    //     objectif: "Intégrer un pare-feu physique Stormshield SN310 pour segmenter les zones de confiance (LAN, DMZ, WAN) et appliquer une politique de sécurité stricte.",
    //     realisation: [
    //       "Architecture : Définition des zones et adressage (LAN Interne, DMZ Web, WAN)",
    //       "Configuration Système : Mise à jour du firmware SNS, configuration des interfaces et du routage statique",
    //       "Politique de Sécurité : Rédaction et implémentation de la matrice de flux (Filtrage applicatif, NAT)",
    //       "Gouvernance : Mise en place d'une politique d'authentification forte (Complexité MDP, rotation 90 jours) pour les administrateurs",
    //       "Supervision : Configuration de l'agent SNMPv3 (chiffré) pour la remontée d'alertes vers le serveur de monitoring centralisé"
    //     ],
    //     resultats: "Infrastructure cloisonnée et opérationnelle. Accès aux ressources Web DMZ sécurisé depuis l'extérieur. Conformité aux exigences de traçabilité et d'authentification.",
    //     technologies: ["Stormshield SN310", "SNS 4.x", "SNMPv3", "Syslog", "HTTPS/SSH"]
    //   }
    // },
    {
      title: "Administration Active Directory (Windows Server 2016)",
      description:
        "Déploiement d'une infrastructure de domaine : Contrôleur de domaine, Gestion des utilisateurs et Jonction de postes.",
      icon: Users, // Nécessite l'import de 'Users'
      skills: ["Active Directory DS", "Windows Server", "DNS", "Gestion IAM", "Virtualisation"],
      color: "secondary",
      category: "serveur", // ou "système"
      topology: topologyAD,
      status: "termine",
      rapport: "/Rapport_Active_Directory.pdf", 
      detailedDescription: {
        contexte: "Pour centraliser l'administration d'un parc informatique (simulé pour un IUT), il était nécessaire de passer d'une gestion en Workgroup (poste à poste) à une architecture de Domaine centralisée.",
        objectif: "Installer et configurer un Contrôleur de Domaine (DC) sous Windows Server 2016, structurer l'annuaire et valider l'authentification des clients.",
        realisation: [
          "Installation de l'OS Windows Server 2016 et configuration réseau (IP statique, DNS local)",
          "Promotion du serveur en Contrôleur de Domaine et création de la forêt 'rtdomtest.com'",
          "Architecture de l'annuaire : Création d'Unités d'Organisation (OU) pour refléter la structure de l'IUT",
          "Gestion des Identités (IAM) : Création des utilisateurs et des groupes de sécurité (Direction, Enseignant, Étudiant)",
          "Intégration Client : Configuration DNS des postes de travail et jonction au domaine pour permettre l'ouverture de session unifiée"
        ],
        resultats: "Domaine opérationnel avec une base d'utilisateurs structurée. Les postes clients peuvent s'authentifier sur le réseau via le Contrôleur de Domaine.",
        technologies: ["Windows Server 2016", "AD DS", "DNS", "VirtualBox", "Clonage VM"]
      }
    },
    // {
    //   title: "Administration d'Annuaire Centralisé (OpenLDAP/Linux)", // Nouveau titre
    //   description:
    //     "Mise en œuvre d'un service d'annuaire sous Linux (équivalent AD) : Installation, Peuplement (LDIF) et Sauvegarde.",
    //   icon: Book,
    //   skills: ["OpenLDAP", "Linux Debian", "LDIF", "Backup/Restore", "SSH"],
    //   color: "secondary",
    //   category: "serveur",
    //   status: "en_cours",
    //   // topology: topologyLDAP, 
    //   // rapport: "/Rapport_OpenLDAP.pdf", 
    //   detailedDescription: {
    //     contexte: "Dans le cadre de la gestion des identités d'une entreprise multisites (Simulation 'Yourtaf'), il était nécessaire de mettre en place une alternative open-source à Active Directory pour centraliser les comptes utilisateurs et les ressources.",
    //     objectif: "Installer, configurer et peupler un serveur OpenLDAP sous Debian pour gérer une hiérarchie complexe (Unités d'Organisation, Groupes, Utilisateurs) et assurer la persistance des données.",
    //     realisation: [
    //       "Préparation de l'environnement : Configuration d'une VM Debian et sécurisation des accès (SSH, Sudoers)",
    //       "Installation et Configuration : Déploiement du service 'slapd', configuration du domaine (dc=yourtaf,dc=com) et des fichiers de conf",
    //       "Structuration de l'Annuaire : Conception de l'arborescence (DIT) et création des fichiers LDIF pour les OUs (Commerciaux, Employés)",
    //       "Gestion des Entrées : Peuplement en masse via 'ldapadd', requêtes de filtrage complexes avec 'ldapsearch' et modification d'attributs",
    //       "Maintenance & Sécurité : Mise en place de procédures de sauvegarde (slapcat) et de restauration complète (slapadd) de la base de données"
    //     ],
    //     resultats: "Serveur d'annuaire opérationnel permettant l'authentification centralisée. Maîtrise des commandes de manipulation LDAP (CRUD) et validation des procédures de reprise après sinistre (Backup/Restore).",
    //     technologies: ["OpenLDAP", "Debian 11", "LDIF", "Slapcat", "SSH", "VirtualBox"]
    //   }
    // },
     // {
    //   title: "Active Directory & GPO",
    //   status: "en_cours",
    //   description:
    //     "Administration d'un domaine Active Directory avec gestion des utilisateurs, GPO et stratégies de sécurité.",
    //   icon: Lock,
    //   skills: ["Active Directory", "GPO", "Windows Server", "LDAP"],
    //   color: "secondary",
    //   category: "serveur",
    //   rapport: "/Rapport_Active_Directory.pdf",
    //   detailedDescription: {
    //     contexte: "La gestion décentralisée des utilisateurs et des postes de travail (comptes locaux, pas de politique de sécurité uniforme) créait des failles de sécurité et une charge administrative importante pour l'équipe IT.",
    //     objectif: "Administrer un domaine Active Directory pour centraliser la gestion des utilisateurs, ordinateurs et politiques de sécurité de l'entreprise (150 utilisateurs).",
    //     realisation: [
    //       "Installation et configuration de Windows Server 2022 en tant que contrôleur de domaine",
    //       "Promotion du serveur en DC avec rôle AD DS (Active Directory Domain Services)",
    //       "Création de l'arborescence OU (Organizational Units) par département/fonction",
    //       "Gestion des comptes utilisateurs et groupes de sécurité avec délégation d'administration",
    //       "Configuration des GPO (Group Policy Objects) pour sécurité et paramétrage postes",
    //       "Déploiement GPO : politique de mots de passe (12+ caractères, expiration 90j, historique)",
    //       "Configuration GPO : verrouillage session auto, déploiement logiciels, mapping lecteurs réseau",
    //       "Mise en place de WSUS pour gestion centralisée des mises à jour Windows",
    //       "Configuration de la réplication AD avec second DC pour haute disponibilité",
    //       "Intégration RADIUS pour authentification réseau sans-fil (802.1X)"
    //     ],
    //     resultats: "Domaine AD opérationnel gérant 150 utilisateurs et 120 postes. Déploiement de 25 GPO avec conformité sécurité accrue et administration simplifiée.",
    //     technologies: ["Windows Server 2022", "Active Directory", "GPO", "WSUS", "DNS", "DHCP", "NPS/RADIUS"]
    //   }
    // },
    // {
    //   title: "Serveur DNS Autoritaire BIND9",
    //   status: "en_cours",
    //   description:
    //     "Installation et configuration d'un serveur DNS autoritaire avec BIND9, gestion des zones et sécurisation DNSSEC.",
    //   icon: Globe,
    //   skills: ["DNS", "BIND9", "DNSSEC", "Linux", "Sécurité"],
    //   color: "primary",
    //   category: "serveur",
    //   topology: topologyDns,
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "L'entreprise utilisait un serveur DNS vieillissant non sécurisé et sans redondance. Les risques de DNS spoofing et l'absence de haute disponibilité représentaient une vulnérabilité critique pour l'infrastructure.",
    //     objectif: "Déployer un serveur DNS autoritaire sécurisé pour gérer la résolution de noms de domaine interne de l'entreprise avec haute disponibilité et sécurisation DNSSEC.",
    //     realisation: [
    //       "Installation de BIND9 sur Ubuntu Server 22.04 avec configuration maître/esclave",
    //       "Création et configuration des zones directes et inverses (exemple.local, 192.168.1.0/24)",
    //       "Configuration des enregistrements A, AAAA, CNAME, MX, PTR, SRV pour infrastructure complète",
    //       "Implémentation DNSSEC avec génération de clés ZSK/KSK et signature des zones",
    //       "Configuration des vues (views) pour résolution DNS différenciée selon origine de la requête",
    //       "Mise en place de logging détaillé et analyse avec rndc pour troubleshooting",
    //       "Tests de performance avec dnsperf et validation DNSSEC avec dig +dnssec"
    //     ],
    //     resultats: "Serveur DNS opérationnel gérant 200+ enregistrements avec temps de réponse moyen < 10ms. Infrastructure hautement disponible avec basculement automatique maître/esclave.",
    //     technologies: ["BIND9", "DNSSEC", "Ubuntu Server", "rndc", "dig", "named-checkzone", "dnsperf"]
    //   }
    // },
    // {
    //   title: "Infrastructure Virtualisée VMware vSphere",
    //   status: "en_cours",
    //   description:
    //     "Déploiement d'une infrastructure de virtualisation complète avec VMware ESXi et vCenter pour environnement de production.",
    //   icon: Cloud,
    //   skills: ["VMware", "ESXi", "vCenter", "vMotion", "HA"],
    //   color: "secondary",
    //   category: "virtualisation",
    //   topology: topologyVmware,
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "L'infrastructure physique de l'entreprise était vieillissante avec des serveurs sous-utilisés. La nécessité de réduire les coûts, d'améliorer la flexibilité et d'assurer la continuité de service a conduit à un projet de virtualisation.",
    //     objectif: "Concevoir et déployer une infrastructure de virtualisation enterprise-grade avec VMware vSphere pour héberger 30+ machines virtuelles de production.",
    //     realisation: [
    //       "Installation de 3 hyperviseurs ESXi 7.0 sur serveurs Dell PowerEdge avec stockage partagé iSCSI",
    //       "Déploiement et configuration de vCenter Server Appliance 7.0 pour gestion centralisée",
    //       "Configuration du cluster HA (High Availability) avec 3 hôtes pour tolérance de panne",
    //       "Mise en place de vMotion pour migration à chaud des VM sans interruption de service",
    //       "Configuration du DRS (Distributed Resource Scheduler) pour load balancing automatique",
    //       "Création de templates VM (Windows Server, Linux) et déploiement automatisé",
    //       "Configuration des vSwitches distribués et VLANs pour segmentation réseau",
    //       "Mise en place de snapshots automatisés et politiques de backup avec Veeam"
    //     ],
    //     resultats: "Infrastructure virtualisée opérationnelle hébergeant 35 VM avec taux de disponibilité 99.9%. Réduction des coûts matériels de 65% et temps de provisionnement VM < 10 minutes.",
    //     technologies: ["VMware ESXi 7.0", "vCenter", "vMotion", "HA/DRS", "vSAN", "iSCSI", "Veeam Backup"]
    //   }
    // },
    // {
    //   title: "Serveur Web LAMP Sécurisé",
    //   status: "en_cours",
    //   description:
    //     "Configuration d'un serveur web Linux Apache MySQL PHP avec SSL/TLS, hardening et monitoring.",
    //   icon: Server,
    //   skills: ["Linux", "Apache", "MySQL", "PHP", "SSL", "Sécurité"],
    //   color: "primary",
    //   category: "serveur",
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "L'entreprise souhaitait héberger en interne plusieurs applications web métier tout en garantissant un niveau de sécurité élevé face aux menaces web modernes (injections SQL, XSS, brute-force).",
    //     objectif: "Déployer un serveur web LAMP sécurisé pour hébergement d'applications web avec certificat SSL/TLS et configuration hardening selon les best practices.",
    //     realisation: [
    //       "Installation et configuration de la stack LAMP (Linux Ubuntu 22.04, Apache 2.4, MySQL 8.0, PHP 8.1)",
    //       "Configuration de Virtual Hosts Apache pour hébergement multi-sites",
    //       "Installation et configuration de certificats SSL/TLS Let's Encrypt avec renouvellement automatique",
    //       "Hardening du serveur : désactivation de modules inutiles, configuration mod_security (WAF)",
    //       "Configuration MySQL : utilisateurs avec privilèges limités, bind-address, chiffrement connexions",
    //       "Mise en place de PHP-FPM avec pools dédiés par site pour isolation",
    //       "Configuration fail2ban pour protection contre brute-force SSH et Apache",
    //       "Monitoring avec Netdata pour surveillance en temps réel (CPU, RAM, I/O, requêtes Apache)"
    //     ],
    //     resultats: "Serveur web sécurisé opérationnel hébergeant 5 sites avec score A+ SSL Labs. 0 vulnérabilité critique détectée lors des audits de sécurité.",
    //     technologies: ["Ubuntu Server", "Apache 2.4", "MySQL 8.0", "PHP 8.1", "Let's Encrypt", "ModSecurity", "Fail2ban", "Netdata"]
    //   }
    // },
    // {
    //   title: "Firewall pfSense & Segmentation Réseau",
    //   status: "en_cours",
    //   description:
    //     "Déploiement d'un firewall pfSense avec règles de filtrage avancées, VPN et segmentation VLAN.",
    //   icon: Shield,
    //   skills: ["pfSense", "Firewall", "VPN", "VLAN", "Sécurité"],
    //   color: "secondary",
    //   category: "sécurité",
    //   topology: topologyPfsense,
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "Suite à plusieurs incidents de sécurité et à l'augmentation du télétravail, l'entreprise avait besoin d'une solution de sécurité périmétrique robuste permettant de protéger le réseau et d'offrir un accès distant sécurisé aux collaborateurs.",
    //     objectif: "Mettre en place une solution de sécurité périmétrique complète avec pfSense pour protéger le réseau interne, segmenter les flux et permettre l'accès distant sécurisé.",
    //     realisation: [
    //       "Installation de pfSense 2.7 sur serveur dédié avec interfaces WAN/LAN/DMZ/GUEST",
    //       "Configuration de règles de filtrage par zones avec principe du moindre privilège",
    //       "Segmentation réseau avec VLANs (VLAN 10: Admin, VLAN 20: Users, VLAN 30: DMZ, VLAN 99: Guest)",
    //       "Mise en place de pfBlockerNG pour blocage géo-IP et listes noires malware/phishing",
    //       "Configuration VPN IPsec site-to-site pour interconnexion avec site distant",
    //       "Déploiement OpenVPN pour accès distant des utilisateurs (authentification certificat)",
    //       "Configuration Snort/Suricata pour détection d'intrusions (IDS/IPS)",
    //       "Mise en place de QoS avec traffic shaping pour priorisation flux métier"
    //     ],
    //     resultats: "Firewall opérationnel filtrant 50K+ sessions simultanées avec détection/blocage automatique de 200+ menaces par jour. VPN avec 30 utilisateurs distants actifs.",
    //     technologies: ["pfSense 2.7", "IPsec", "OpenVPN", "Snort/Suricata", "pfBlockerNG", "VLAN", "HAProxy"]
    //   }
    // },
    // {
    //   title: "Architecture Réseau Datacenter",
    //   status: "en_cours",
    //   description:
    //     "Conception et déploiement d'une architecture réseau datacenter avec switches L2/L3, redondance et haute disponibilité.",
    //   icon: Layers,
    //   skills: ["Switching", "Routing", "STP", "HSRP", "Agrégation"],
    //   color: "primary",
    //   category: "réseau",
    //   topology: topologyDatacenter,
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "La construction d'un nouveau datacenter nécessitait la conception d'une architecture réseau moderne, évolutive et hautement disponible pour supporter les charges de production critiques de l'entreprise.",
    //     objectif: "Concevoir une architecture réseau datacenter redondante et hautement disponible selon le modèle hiérarchique Cisco (Core/Distribution/Access).",
    //     realisation: [
    //       "Conception de l'architecture réseau 3-tiers avec switches Cisco Catalyst série 9000",
    //       "Configuration du cœur de réseau (Core) avec 2 switches L3 en full-mesh 10 Gbps",
    //       "Déploiement de la couche Distribution avec switches L3 et routage inter-VLAN",
    //       "Configuration de la couche Access avec switches L2 PoE pour téléphonie IP",
    //       "Mise en place de la redondance avec STP (Rapid PVST+) et PortFast sur ports access",
    //       "Configuration HSRP (Hot Standby Router Protocol) pour passerelle par défaut redondée",
    //       "Agrégation de liens avec LACP (802.3ad) pour bande passante et résilience",
    //       "Configuration de VLANs (Voice, Data, Management, Storage) et 802.1Q trunking",
    //       "Mise en place de Port-Security et DHCP Snooping pour sécurité L2"
    //     ],
    //     resultats: "Architecture réseau datacenter opérationnelle supportant 200+ serveurs avec bande passante agrégée 40 Gbps. Basculement automatique < 3 secondes en cas de panne.",
    //     technologies: ["Cisco Catalyst 9300/9500", "HSRP", "STP", "LACP", "VTP", "802.1Q", "Port-Security"]
    //   }
    // },
    // {
    //   title: "Sauvegarde Centralisée avec Bacula",
    //   status: "en_cours",
    //   description:
    //     "Déploiement d'une solution de sauvegarde centralisée avec Bacula pour protection des données serveurs Linux/Windows.",
    //   icon: HardDrive,
    //   skills: ["Bacula", "Backup", "Recovery", "Stockage", "Linux"],
    //   color: "secondary",
    //   category: "serveur",
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "Après une perte de données critique due à une panne serveur, l'entreprise a pris conscience de l'absence d'une stratégie de sauvegarde structurée. Un projet de mise en place d'une solution de backup centralisée est devenu prioritaire.",
    //     objectif: "Mettre en place une infrastructure de sauvegarde centralisée automatisée pour protéger les données critiques de 20+ serveurs de production.",
    //     realisation: [
    //       "Installation de Bacula sur serveur Debian 11 (Director, Storage Daemon, Catalog MySQL)",
    //       "Déploiement des agents Bacula File Daemon sur serveurs Linux (Ubuntu, CentOS) et Windows Server",
    //       "Configuration de jobdefs pour sauvegardes Full/Differential/Incremental automatiques",
    //       "Création de pools de stockage avec rétention différenciée (30j/90j/1an) selon criticité",
    //       "Configuration de schedules automatisés : Full hebdomadaire, Differential quotidienne, Incremental toutes les 4h",
    //       "Mise en place de la compression et du chiffrement AES-256 pour sauvegardes sensibles",
    //       "Configuration d'alertes email pour succès/échec des jobs et monitoring espace disque",
    //       "Tests de restauration réguliers et documentation des procédures de recovery",
    //       "Intégration avec stockage NAS Synology pour archivage long terme"
    //     ],
    //     resultats: "Solution de backup opérationnelle sauvegardant 2 To de données par jour avec taux de succès 98%. RPO < 4h et RTO < 2h pour serveurs critiques.",
    //     technologies: ["Bacula 9.6", "MySQL", "rsync", "NFS", "Btrfs", "Bash scripting", "Webmin-Bacula"]
    //   }
    // },
    // {
    //   title: "Conteneurisation avec Docker",
    //   status: "en_cours",
    //   description:
    //     "Déploiement d'applications en conteneurs Docker avec Docker Compose pour environnements dev/test/prod.",
    //   icon: Layers,
    //   skills: ["Docker", "Conteneurs", "Docker Compose", "Registry"],
    //   color: "primary",
    //   category: "virtualisation",
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "Les équipes de développement faisaient face à des problèmes récurrents de différences entre environnements (dev/test/prod) causant des bugs en production. La conteneurisation est apparue comme la solution pour standardiser les déploiements.",
    //     objectif: "Containeriser les applications de l'entreprise avec Docker pour améliorer la portabilité, le déploiement et l'isolation des environnements.",
    //     realisation: [
    //       "Installation de Docker Engine sur serveurs Ubuntu 22.04 avec configuration production-ready",
    //       "Création de Dockerfiles optimisés multi-stage pour applications PHP/Node.js/Python",
    //       "Déploiement de stack complète avec Docker Compose (Nginx, PHP-FPM, MySQL, Redis)",
    //       "Configuration de volumes persistants et networks Docker pour isolation",
    //       "Mise en place d'un Docker Registry privé avec Harbor pour stockage des images",
    //       "Configuration de health checks et restart policies pour haute disponibilité",
    //       "Implémentation de logs centralisés avec ELK stack (Elasticsearch, Logstash, Kibana)",
    //       "Optimisation des images Docker : layers caching, .dockerignore, images Alpine",
    //       "Mise en place de pipelines CI/CD avec GitLab pour build/push automatique des images"
    //     ],
    //     resultats: "Infrastructure conteneurisée hébergeant 15 applications avec temps de déploiement réduit de 80% (< 5 min vs 40 min). Consommation ressources optimisée de 60%.",
    //     technologies: ["Docker 24.0", "Docker Compose", "Harbor", "Nginx", "GitLab CI/CD", "ELK Stack"]
    //   }
    // },
    // {
    //   title: "Implémentation MPLS avec OSPF/EIGRP/RIP",
    //   status: "termine",
    //   description:
    //     "Conception et déploiement d'un réseau MPLS complet avec comparaison des protocoles de routage.",
    //   icon: Network,
    //   skills: ["MPLS", "OSPF", "EIGRP", "RIP", "SD-WAN", "Cisco"],
    //   color: "primary",
    //   category: "réseau",
    //   topology: topologyMpls,
    //   rapport: "/LEON-ETIENNE_SAE105_Cacti.pdf",
    //   detailedDescription: {
    //     contexte: "Dans le cadre de la modernisation de l'infrastructure réseau d'une entreprise multi-sites, il était nécessaire d'évaluer et de mettre en œuvre une solution de routage performante pour interconnecter les différents sites tout en optimisant la bande passante et les temps de convergence.",
    //     objectif: "Concevoir et déployer une architecture MPLS multi-sites avec analyse comparative des différents protocoles de routage dynamique (OSPF, EIGRP, RIP) et étude des solutions SD-WAN.",
    //     realisation: [
    //       "Configuration de 6 routeurs Cisco en topologie MPLS avec Label Distribution Protocol (LDP)",
    //       "Implémentation et tests comparatifs des protocoles OSPF (zones multi-areas), EIGRP (métriques composites) et RIP v2",
    //       "Configuration des VRF (Virtual Routing and Forwarding) pour la séparation du trafic client",
    //       "Mise en place de QoS (Quality of Service) pour prioriser le trafic voix/vidéo",
    //       "Analyse des performances : temps de convergence, utilisation bande passante, overhead protocolaire",
    //       "Documentation complète de l'architecture et comparaison avec solutions SD-WAN (VeloCloud, Cisco SD-WAN)"
    //     ],
    //     resultats: "Réseau MPLS opérationnel avec amélioration de 40% du temps de convergence avec OSPF vs RIP. Documentation technique détaillée avec recommandations pour migration SD-WAN.",
    //     technologies: ["Cisco IOS", "GNS3", "MPLS", "VRF", "BGP", "QoS", "Wireshark"]
    //   }
    // },
    
    // {
    //   title: "Audit Automatisé de Conformité (OpenSCAP)",
    //   status: "en_cours",
    //   description:
    //     "Mise en place d'un contrôle automatisé de l'état de sécurité des serveurs (POC pour contexte hospitalier).",
    //   icon: ClipboardCheck, // Ou FileText si vous préférez
    //   skills: ["OpenSCAP", "Audit Système", "Bash", "Reporting", "Linux"],
    //   color: "secondary", // Couleur "Admin" plutôt que "Rouge Cyber"
    //   category: "sécurité",
    //   rapport: "/LEON-ETIENNE_Projet_OpenSCAP.pdf", // Nom de votre futur fichier
    //   detailedDescription: {
    //     contexte: "Dans le cadre d'une réponse à un besoin de sécurisation d'un Système d'Information (type GHT), il est nécessaire de vérifier que les serveurs respectent les bonnes pratiques de configuration (PSSI) de manière industrielle.",
    //     objectif: "Réaliser un Proof of Concept (POC) d'un outil de vérification de conformité open-source (OpenSCAP) capable de scanner un serveur et de générer un rapport d'écarts sans intervention humaine.",
    //     realisation: [
    //       "Installation des outils OpenSCAP (oscap) sur une machine virtuelle Debian",
    //       "Téléchargement et analyse des guides de sécurité officiels (SCAP Security Guide)",
    //       "Exécution d'un scan de conformité automatisé basé sur le profil 'Standard' (ANSSI/CIS)",
    //       "Analyse du rapport HTML généré : identification des mauvaises configurations (ex: permissions fichiers, SSH root)",
    //       "Application de correctifs (Remédiation) sur le système et validation par un second scan"
    //     ],
    //     resultats: "Mise en évidence automatisée de 40+ points de non-conformité. Correction immédiate des failles critiques. Preuve de la capacité à intégrer la sécurité dans la gestion courante du parc.",
    //     technologies: ["OpenSCAP", "SCAP Security Guide", "Linux Debian", "Bash", "XML/HTML Reporting"]
    //   }
    // },
    
  ];

  const categories: { name: ProjectCategory | "tous"; label: string; color: string }[] = [
    { name: "tous", label: "Tous les projets", color: "text-primary" },
    { name: "réseau", label: "Réseau", color: "text-cyan-400" },
    { name: "supervision", label: "Supervision", color: "text-green-400" },
    { name: "serveur", label: "Serveur", color: "text-blue-400" },
    // { name: "sécurité", label: "Sécurité", color: "text-red-400" }
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
                              {/* --- DÉBUT DE L'AJOUT --- */}
                              {project.status === "en_cours" && (
                                <div className="flex items-center gap-2 mb-2">
                                 <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/10 text-[10px] px-2 py-0.5 h-5 font-mono">
                                     <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                       EN COURS
                                  </Badge>
                                </div>
                              )}
                              {project.status === "termine" && (
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10 text-[10px] px-2 py-0.5 h-5 font-mono">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                        TERMINÉ
                                  </Badge>
                                </div>
                              )}
                              {/* --- FIN DE L'AJOUT --- */}
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

                        <div className="bg-terminal-bg border-t border-border px-4 py-2 flex justify-between items-center">
                          <p className="font-mono text-xs text-muted-foreground">
                            <span className="text-primary">{">"}</span> Cliquez pour voir les détails
                          </p>
                          {project.rapport && (
                            <span className="flex items-center gap-1 text-secondary text-xs" title="Compte rendu disponible">
                              <FileText size={12} /> <span className="hidden sm:inline">PDF</span>
                            </span>
                          )}
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

                      <div className="bg-terminal-bg border-t border-border px-4 py-2 flex justify-between items-center">
                        <p className="font-mono text-xs text-muted-foreground">
                          <span className="text-primary">{">"}</span> Cliquez pour voir les détails
                        </p>
                        {project.rapport && (
                          <span className="flex items-center gap-1 text-secondary text-xs" title="Compte rendu disponible">
                            <FileText size={12} /> <span className="hidden sm:inline">PDF</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Dialog pour les détails du projet */}
      <Dialog open={!!selectedProject && !pdfOpen} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-card border-primary/30">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4 flex-col md:flex-row">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 w-fit">
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
                  
                  {/* Bouton pour ouvrir le PDF */}
                  {/* AJOUT DE 'mr-10' ICI POUR DÉCALER VERS LA GAUCHE */}
                  <div className="mt-4 md:mt-0 mr-10"> 
                    <Button 
                        onClick={handleOpenPdf}
                        variant={selectedProject.rapport ? "outline" : "secondary"}
                        className={`font-mono gap-2 ${selectedProject.rapport ? 'border-primary/50 text-primary hover:bg-primary/10' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!selectedProject.rapport}
                    >
                        {selectedProject.rapport ? (
                            <>
                                <FileText size={16} />
                                Compte rendu PDF
                            </>
                        ) : (
                            <>
                                <AlertTriangle size={16} />
                                PDF Indisponible
                            </>
                        )}
                    </Button>
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

      {/* Dialog Viewer PDF Sécurisé */}
      <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
        {/* [&>button]:hidden cache la croix par défaut de shadcn pour utiliser la nôtre */}
        <DialogContent className="max-w-6xl w-[95vw] h-[95vh] md:h-[90vh] p-0 flex flex-col [&>button]:hidden">
          
          {/* HEADER PERSONNALISÉ */}
          <DialogHeader className="p-4 border-b border-border shrink-0 flex flex-row items-center justify-between bg-card space-y-0">
            
            {/* Partie Gauche : Titre */}
            <div className="flex flex-col">
              <DialogTitle className="font-mono text-primary text-base md:text-lg">
                Compte Rendu - {selectedProject?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground hidden md:block">
                Document en lecture seule • Téléchargement désactivé
              </DialogDescription>
            </div>

            {/* Partie Droite : Badges + CROIX DE FERMETURE */}
            <div className="flex items-center gap-3">
              {/* Badges existants */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-mono">
                <Lock size={12} />
                LECTURE SEULE
              </div>
              <Badge variant="outline" className="font-mono text-xs border-secondary/50 text-secondary hidden sm:flex">
                CONFIDENTIEL
              </Badge>

              {/* --- NOUVEAU BOUTON FERMER (CROIX) --- */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPdfOpen(false)}
                className="h-8 w-8 ml-1 rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
              >
                <X size={20} />
              </Button>
              {/* ------------------------------------- */}
            </div>
          </DialogHeader>
          
          {/* ZONE CONTENU PDF (Reste inchangée) */}
          {selectedProject?.rapport ? (
            <div 
              className="relative flex-1 overflow-hidden select-none bg-zinc-900"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Filigrane */}
              <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-10">
                <div className="rotate-[-30deg] text-primary text-4xl md:text-6xl font-bold whitespace-nowrap">
                  CONFIDENTIEL • LECTURE SEULE
                </div>
              </div>
              
              {/* Overlay transparent */}
              <div className="absolute inset-0 z-20 bg-transparent pointer-events-none" />
              
              {/* Iframe */}
              <iframe 
                src={`${selectedProject.rapport}#toolbar=0&navpanes=0&scrollbar=1&view=Fit`}
                className="w-full h-full border-0"
                title={`Compte rendu - ${selectedProject.title}`}
                style={{ pointerEvents: 'auto' }}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-zinc-900">
              <div className="text-center p-8">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-mono">
                  Aucun compte rendu PDF n'est encore attaché à ce projet.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;

// Animation douce du scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation de la barre de navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = 'Merci pour votre message ! Je vous répondrai dès que possible.';
    formMessage.style.display = 'block';
    formMessage.style.padding = '1rem';
    formMessage.style.backgroundColor = 'var(--accent-color)';
    formMessage.style.color = 'white';
    formMessage.style.borderRadius = '5px';
    contactForm.reset();
    setTimeout(() => formMessage.style.display = 'none', 5000);
});

// Animation des compétences au scroll
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Animation du texte de la section hero
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const ctaButton = document.querySelector('.cta-button');

    if (heroTitle) heroTitle.style.opacity = 0;
    if (heroSubtitle) heroSubtitle.style.opacity = 0;
    if (ctaButton) ctaButton.style.opacity = 0;

    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease-out';
        heroTitle.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        heroSubtitle.style.transition = 'opacity 1s ease-out';
        heroSubtitle.style.opacity = 1;
    }, 1000);

    setTimeout(() => {
        ctaButton.style.transition = 'opacity 1s ease-out';
        ctaButton.style.opacity = 1;
    }, 1500);
});

// Gestion des modales de projet
const projectButtons = document.querySelectorAll('.project-link');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Fonction pour ouvrir une modale
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement du body
    }
}

// Fonction pour fermer une modale
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactive le défilement du body
    }
}

// Ajouter les événements pour les boutons de projet
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        openModal(`${projectId}Modal`);
    });
});

// Ajouter les événements pour les boutons de fermeture
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Fermer la modale en cliquant en dehors
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Fermer la modale avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

// Gestion des boutons de projets
document.addEventListener('DOMContentLoaded', function() {
    const showAllButton = document.getElementById('show-all-projects');
    const hideProjectsButton = document.getElementById('hide-projects');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (showAllButton && hideProjectsButton && projectsGrid) {
        // Afficher tous les projets
        showAllButton.addEventListener('click', function() {
            projectsGrid.classList.add('show-all');
            showAllButton.classList.add('hidden');
            hideProjectsButton.classList.remove('hidden');
            // Réinitialiser les modales après avoir affiché tous les projets
            setTimeout(() => {
                projectButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const projectId = button.getAttribute('data-project');
                        openModal(`${projectId}Modal`);
                    });
                });

                closeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const modal = button.closest('.modal');
                        closeModal(modal);
                    });
                });

                modals.forEach(modal => {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            closeModal(modal);
                        }
                    });
                });
            }, 100);
        });

        // Cacher les projets supplémentaires
        hideProjectsButton.addEventListener('click', function() {
            projectsGrid.classList.remove('show-all');
            hideProjectsButton.classList.add('hidden');
            showAllButton.classList.remove('hidden');
            // Faire défiler jusqu'au début de la section projets
            const projectsSection = document.getElementById('projets');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Initialiser les modales au chargement de la page
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            openModal(`${projectId}Modal`);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});

// Gestion de l'affichage des projets
document.addEventListener('DOMContentLoaded', function() {
    const showAllProjectsBtn = document.getElementById('show-all-projects');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let allProjectsVisible = false;

    // Vérifier si le bouton existe
    if (!showAllProjectsBtn) return;

    // Réinitialiser l'état au chargement
    hiddenProjects.forEach(project => {
        project.style.display = 'none';
    });
    showAllProjectsBtn.textContent = 'Voir tous les projets';

    showAllProjectsBtn.addEventListener('click', function() {
        if (!allProjectsVisible) {
            // Afficher tous les projets
            hiddenProjects.forEach(project => {
                project.style.display = 'flex';
            });
            showAllProjectsBtn.textContent = 'Voir moins de projets';
            allProjectsVisible = true;

            // Scroll vers le premier projet caché
            const firstHiddenProject = document.querySelector('.hidden-project');
            if (firstHiddenProject) {
                firstHiddenProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Cacher les projets supplémentaires
            hiddenProjects.forEach(project => {
                project.style.display = 'none';
            });
            showAllProjectsBtn.textContent = 'Voir tous les projets';
            allProjectsVisible = false;
            
            // Scroll vers le haut de la section projets
            document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Gestion du menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
}

menuToggle.addEventListener('click', toggleMenu);

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Fermer le menu si on redimensionne l'écran au-dessus de 768px
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// Gestion de la navigation active
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset pour une meilleure détection

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Écouter le défilement pour mettre à jour le lien actif
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Gestion du thème
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Vérifier si un thème est déjà enregistré
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Création du loader
function createLoader() {
    const loader = document.createElement('div');
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.backgroundColor = 'var(--background)';
    loader.style.display = 'flex';
    loader.style.flexDirection = 'column';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = '9999';
    loader.style.transition = 'opacity 0.5s ease-in-out';

    const network = document.createElement('div');
    network.style.position = 'relative';
    network.style.width = '60px';
    network.style.height = '60px';
    network.style.marginBottom = '20px';

    // Création des points du réseau
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.backgroundColor = 'var(--accent-color)';
        dot.style.borderRadius = '50%';
        dot.style.animation = 'networkDot 1.5s infinite';
        dot.style.animationDelay = `${i * 0.3}s`;

        // Position des points en triangle
        switch(i) {
            case 0:
                dot.style.top = '0';
                dot.style.left = '50%';
                dot.style.transform = 'translateX(-50%)';
                break;
            case 1:
                dot.style.bottom = '0';
                dot.style.left = '0';
                break;
            case 2:
                dot.style.bottom = '0';
                dot.style.right = '0';
                break;
        }

        network.appendChild(dot);
    }

    // Création du texte de chargement
    const loadingText = document.createElement('div');
    loadingText.style.color = 'var(--accent-color)';
    loadingText.style.fontSize = '18px';
    loadingText.style.fontFamily = 'inherit';
    loadingText.style.marginTop = '10px';
    
    // Animation des points du texte
    let dots = 0;
    const updateLoadingText = () => {
        dots = (dots + 1) % 4;
        loadingText.textContent = 'Connexion au réseau' + '.'.repeat(dots);
    };
    updateLoadingText();
    const textInterval = setInterval(updateLoadingText, 500);

    // Ajout des styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes networkDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
        }
    `;

    document.head.appendChild(style);
    loader.appendChild(network);
    loader.appendChild(loadingText);
    document.body.appendChild(loader);

    // Faire disparaître le loader après 2 secondes
    setTimeout(() => {
        clearInterval(textInterval);
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
            document.head.removeChild(style);
        }, 500);
    }, 3000);
}

// Exécuter le loader au chargement de la page
window.addEventListener('load', createLoader);

// Gestion du modal pour les images
const thumbnails = document.querySelectorAll('.gallery-thumbnail');
const imageModal = document.getElementById('imageModal');
const enlargedImage = document.getElementById('enlargedImage');
const closeImageModal = document.querySelector('.close-image-modal');

// Ouvrir le modal avec l'image cliquée
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        enlargedImage.src = thumbnail.src;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement du fond
    });
});

// Fermer le modal
closeImageModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = ''; // Restaure le défilement
});

// Fermer le modal en cliquant en dehors de l'image
window.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaure le défilement
    }
});

// Gérer la touche Echap pour fermer le modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
        imageModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaure le défilement
    }
});

// Filtrage des projets
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    const categories = project.getAttribute('data-category').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        project.style.display = 'flex';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Redirection vers les projets filtrés depuis les compétences
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card[data-filter]');
    
    skillCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Activer le bouton de filtre correspondant
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === filter) {
                    btn.classList.add('active');
                }
            });
            
            // Filtrer les projets
            const projects = document.querySelectorAll('.project-card');
            projects.forEach(project => {
                const categories = project.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
            
            // Faire défiler jusqu'à la section projets
            document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Bouton "Retour en haut"
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
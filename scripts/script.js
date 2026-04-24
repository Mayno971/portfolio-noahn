
    document.addEventListener('DOMContentLoaded', function() {

    /* ----------------------------------------------------
       NAVBAR + MENU MOBILE
    ---------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');
    
    // 1️⃣ Ajout de '.nav-mobile-sublink' pour inclure tes nouveaux sous-menus
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link, .nav-mobile-sublink');
    
    // Effet d'ombre et de flou sur la navbar au défilement
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Initialisation Accessibilité (A11y) du bouton menu
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // 2️⃣ Fonction centralisée pour fermer proprement le menu mobile
    function closeMobileMenu() {
        if (navMobile.classList.contains('active')) {
            navMobile.classList.remove('active');
            
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }

            // Réinitialiser l'icône hamburger
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }

    // Ouverture/fermeture du menu mobile via le bouton Hamburger
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');

            const hamburgers = navToggle.querySelectorAll('.hamburger');
            const menuOpen = navMobile.classList.contains('active');

            navToggle.setAttribute('aria-expanded', menuOpen);

            // Animation de transformation du Hamburger en croix "X"
            hamburgers.forEach((bar, i) => {
                if (menuOpen) {
                    if (i === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (i === 1) bar.style.opacity = '0';
                    if (i === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Fermer le menu mobile au clic sur N'IMPORTE QUEL lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 3️⃣ Scroll fluide avec calcul de position ultra-précis
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // On ignore si ce n'est pas une ancre interne (ex: lien externe)
            if (!targetId || !targetId.startsWith("#") || targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault(); // Annule le saut brutal natif de la page

                // getBoundingClientRect().top est plus fiable que offsetTop pour les grilles CSS
                // On retire 90px pour compenser la hauteur de la barre de navigation collante
                const offset = 90; 
                const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    /* ----------------------------------------------------
       INTRO SCREEN (disparition au scroll)
    ---------------------------------------------------- */
    
    const intro = document.getElementById('intro-screen');

    if (intro) {
        window.addEventListener('scroll', () => {
            const shouldHide = window.scrollY > 0;            
            intro.classList.toggle('hidden', shouldHide);

        }, { passive: true });
    }


    /* ----------------------------------------------------
       ANIMATION – RÉVÉLATIONS AU SCROLL
    ---------------------------------------------------- */
    /* ----------------------------------------------------
       ANIMATION – RÉVÉLATIONS AU SCROLL (Cartes individuelles)
    ---------------------------------------------------- */
    const elementsToReveal = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si la carte (ou la section) entre dans le champ de vision
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } 
            // Si tu veux que l'animation se rejoue quand tu remontes, garde cette ligne :
            else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        // L'animation se déclenche quand 15% de la carte est visible à l'écran
        threshold: 0.15, 
        // Décale la ligne de détection de 50px vers le haut pour un effet plus naturel
        rootMargin: "0px 0px -50px 0px" 
    });

    // On observe chaque élément qui possède la classe .reveal
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });


    /* ----------------------------------------------------
       NOM FLOTTANT À GAUCHE
    ---------------------------------------------------- */
    const floatingName = document.getElementById("floating-name");

    if (floatingName) {

        window.addEventListener("scroll", function () {
            floatingName.classList.toggle("visible", window.scrollY > 100);
        });

        floatingName.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => location.reload(), 300);
        });
    }


    /* ----------------------------------------------------
       MODE JOUR / NUIT
    ---------------------------------------------------- */
    const toggleButton = document.getElementById("toggle-button");
    const body = document.body;

    function updateToggleIcon() {
        if (toggleButton){
            toggleButton.textContent = body.classList.contains("night-mode") ? "nuit" : "jour";
        }
        
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "night"){
        body.classList.add("night-mode");
    } else if (storedTheme === "day"){
         body.classList.remove("night-mode");
    } else if (systemPrefersDark) {
        body.classList.add("night-mode");
    }

    updateToggleIcon();
    
    if (toggleButton){
        toggleButton.addEventListener("click", () => { 
            body.classList.toggle("night-mode");
            
            const isNight = body.classList.contains("night-mode");
            localStorage.setItem("theme", isNight ? "night" : "day");
            
            updateToggleIcon();
        });
    }

    // Sélectionnez l'élément
    const logo = document.querySelector('.nav-logo');

    logo.addEventListener('click', (e) => {
        // Si c'est un lien vers "#", on empêche le comportement par défaut pour gérer le smooth scroll
        e.preventDefault(); 
        
        // Remonte tout en haut
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Optionnel : Fermer le menu mobile si ouvert
        const navMobile = document.getElementById('nav-mobile');
        if (navMobile.classList.contains('active')) {
            navMobile.classList.remove('active');
        }
    });

});

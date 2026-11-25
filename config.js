/*
 * Réglages du site Forevera store
 * --------------------------------
 * Modifiez seulement les valeurs entre guillemets. Laissez "" (vide) tant
 * que l'information n'est pas prête : l'élément correspondant reste caché
 * sur le site, au lieu d'afficher un faux lien.
 */
window.FOREVERA = {
  // Numéro WhatsApp au format international, sans "+", sans espaces.
  // Exemple : "243812345678". Vide = les boutons WhatsApp sont cachés.
  whatsapp: "",

  // Lien de réservation d'une rencontre (formulaire, agenda...).
  // Vide = le bouton « Réserver une rencontre » ouvre WhatsApp.
  rencontreUrl: "",

  // Formulaire de démarrage (section « Prêt à démarrer ? ») : URL de l'application
  // Web Google Apps Script (…/exec), voir apps-script/Code.gs.
  // Vide = les réponses ne sont pas enregistrées.
  formulaireUrl: "https://script.google.com/macros/s/AKfycby2Nr-nQ0rQU2tcHhywRtJLQgZl4Rqr6kwuW0GN2-bHpeFi9hohWfdwn6V0DCOshzUh/exec",
  // Doit être identique à TOKEN dans apps-script/Code.gs.
  formulaireJeton: "fvd_UGxg4yJ2qJCQTrBv4NarPw",

  // Vidéo de l'accroche : lien YouTube, ou fichier du site (ex. "assets/video/...mp4").
  // Vide = photo seule.
  // Vidéo de Jean-Baptiste Revelat (chaîne MyAloe), utilisée avec son accord.
  videoAccroche: "assets/video/forever-opportunite-480p.mp4",

  // Lecture automatique de cette vidéo, sans le son, quand elle est visible
  // (seulement pour une vidéo du site, pas YouTube). false = au clic.
  // Désactivée d'office si le visiteur économise ses données ou est en 2G.
  autoplayAccroche: true,

  // Témoignages. La section reste cachée tant que la liste est vide.
  // Publiez uniquement des témoignages réels, avec l'accord des personnes.
  temoignages: [
    // { video: "https://youtu.be/XXXXXXXXXXX", citation: "« … »", nom: "Prénom N.", statut: "Partenaire depuis 2026" },
  ],

  // Vidéo du voyage. La section reste cachée tant que la vidéo est vide.
  voyage: {
    video: "assets/video/emr-2025-phuket-720p.mp4",   // lien YouTube ou fichier du site
    affiche: "assets/emr-2025-phuket.webp",            // image affichée avant la lecture
    legende: "Eagle Manager Retreat 2025, Phuket (Thaïlande), du 26 au 30 septembre 2025"
  },

  // Pages et sites liés, affichés dans le menu quand ils existent.
  liens: {
    produits: "",                    // ex. "/produits/"
    blog: "",                        // ex. "https://blog.forevera.io"
    aPropos: "",                     // ex. "/a-propos/"
    contact: "",                     // ex. "/contact/"
    espacePartenaire: ""             // ex. "https://espace.forevera.io"
  }
};

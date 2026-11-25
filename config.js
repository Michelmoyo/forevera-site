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

  // Vidéo de 90 s de l'accroche (lien YouTube). Vide = photo seule.
  videoAccroche: "",

  // Témoignages. La section reste cachée tant que la liste est vide.
  // Publiez uniquement des témoignages réels, avec l'accord des personnes.
  temoignages: [
    // { video: "https://youtu.be/XXXXXXXXXXX", citation: "« … »", nom: "Prénom N.", statut: "Partenaire depuis 2026" },
  ],

  // Vidéo du voyage. La section reste cachée tant que la vidéo est vide.
  voyage: {
    video: "",                       // lien YouTube
    legende: ""                      // ex. "Nom de l'événement, ville, année"
  },

  // Pages et sites liés, affichés dans le menu quand ils existent.
  liens: {
    produits: "",                    // ex. "/produits/"
    blog: "",                        // ex. "https://blog.forevera.store"
    aPropos: "",                     // ex. "/a-propos/"
    contact: "",                     // ex. "/contact/"
    espacePartenaire: ""             // ex. "https://espace.forevera.store"
  }
};

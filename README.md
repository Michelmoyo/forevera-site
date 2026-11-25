# Site Forevera store : page « Découvrir l'activité »

Site statique (HTML, CSS, JavaScript), sans base de données ni compilation. Il fonctionne sur n'importe quel hébergement web, dont Hostinger.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page complète |
| `config.js` | **Les réglages à remplir** : WhatsApp, lien de réservation, vidéos, témoignages, liens du menu |
| `assets/` | Logo, favicon, image de l'accroche, image de partage (1200 × 630) |
| `robots.txt` | Autorise l'indexation par les moteurs de recherche |

## Remplir les réglages (`config.js`)

Tant qu'une valeur est vide (`""`), l'élément correspondant reste **caché** sur le site, au lieu d'afficher un faux lien :

- `whatsapp` : sans numéro, les boutons WhatsApp sont cachés.
- `rencontreUrl` : sans lien, « Réserver une rencontre » ouvre WhatsApp.
- `videoAccroche` : sans vidéo, l'accroche affiche seulement la photo.
- `temoignages` : sans témoignage, la section « Ils ont commencé » est cachée.
- `voyage.video` : sans vidéo, la section des voyages est cachée.
- `liens` : chaque page (produits, blog, à propos, contact, espace partenaire) apparaît dans le menu dès que son lien est rempli.

Les vidéos sont des liens **YouTube**, ou des fichiers du site (`assets/video/…mp4`) lus par un lecteur sans avance rapide.

## Formulaire de démarrage (Google Sheet)

La section « Prêt à démarrer ? » enregistre chaque demande dans un Google Sheet, avec un **statut** :

| Statut | Règle | Ce que voit la personne |
| --- | --- | --- |
| **Qualifié** | Veut l'activité, prêt à acheter le pack, au moins 5 h par semaine, peut venir à une rencontre (ou en ligne) | Invitation à réserver une rencontre |
| **Plus tard** | Pas encore prêt à acheter, moins de 5 h par semaine ou pas de rencontre possible | Proposition de commencer comme client, recontact plus tard |
| **Client** | Veut seulement les produits, ou répond « Non » à l'achat du pack | Proposition de commencer comme client |

Mise en place, une seule fois :

1. Créer un Google Sheet, par exemple « Forevera - Demandes de démarrage ».
2. **Extensions → Apps Script**, remplacer le contenu de `Code.gs` par `apps-script/Code.gs`, enregistrer.
3. Choisir la fonction `initialiser`, cliquer sur **Exécuter** et autoriser l'accès.
4. **Déployer → Nouveau déploiement → Application Web**. Exécuter en tant que : **Moi**. Qui a accès : **Tout le monde**.
5. Copier l'URL qui finit par `/exec` dans `config.js`, à `formulaireUrl`.

Le jeton `formulaireJeton` de `config.js` doit rester identique à `TOKEN` dans `Code.gs`.

## Mettre en ligne sur Hostinger (déploiement Git)

1. Dans hPanel : **Sites web → Gérer → Avancé → Git**.
2. **Dépôt** : l'adresse du dépôt GitHub. **Branche** : `main`. **Répertoire** : laisser vide pour publier à la racine (`public_html`), qui doit être vide.
3. Si le dépôt GitHub est **privé** : copier la **clé SSH** affichée par Hostinger, puis l'ajouter dans GitHub, dans **Settings → Deploy keys** du dépôt (lecture seule). Utiliser alors l'adresse SSH du dépôt (`git@github.com:...`).
4. Cliquer sur **Créer**, puis **Déployer**.
5. Pour publier automatiquement à chaque modification, activer le **déploiement automatique** dans Hostinger et ajouter l'URL du webhook fournie dans GitHub, dans **Settings → Webhooks**.

Les balises de partage (`og:image`, `canonical`) utilisent le domaine `https://forevera.io/`. Si le site est publié sur un autre domaine, remplacer ce domaine dans `index.html`.

## Avant de publier

- Vérifier que les prix (liste de juillet 2026) sont toujours à jour.
- Le règlement de Forever Living (Company Policy, §17.10) encadre les sites et publicités des distributeurs. Vérifier les validations nécessaires avant la mise en ligne.

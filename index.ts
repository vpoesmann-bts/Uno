// Constantes de couleur
// Couleur.Rouge vaut 0
// Couleur.Vert vaut 1 etc...
enum Couleur {
  Rouge,
  Vert,
  Jaune,
  Bleu,
}

// Constantes de valeurs
// Valeur.Plus2 vaut 10
// Valeur.Inversion vaut 11 etc...
enum Valeur {
  Plus2 = 10,
  Inversion,
  Passe,
  Joker,
  Plus4,
}

// Nombre de cartes initialement distribuées à chaque joueurs.
// Permet d'éviter les magic numbers
const NB_CARTES_INITIALES: number = 8
// Permet de faire la liaison avec les classes CSS
const COULEURS_CARTES: string[] = ["rouge", "vert", "jaune", "bleu", "noir"]
// Permet de lier chaque valeur à une représentation string
const VALEURS_CARTES: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "🂠 🂠 ", "⇄", " ⃠", "🃟", "🂠 🂠 🂠 🂠 "]

// Tableau 2D contenant la pioche
let jeuCartes: number[][] = []
// Tableau 3D contenant la main de chaque joueur
// Les cartes existent en un seul exemplaire et sont donc retirées de la pioche quand elles sont distribuées
let mainsJoueurs: number[][][] = []

// Nombre de joueurs pour la partie
let nbJoueurs: number = 0

// On remplit le jeu de cartes
// Chaque carte est en double sauf le 0, joker et plus4
function remplirPioche() {
  for (let i: number = 0 ; i < 4 ; i++) {
    for (let j: number = 0 ; j < 15 ; j++) {
      if (j > 0 && j < 13) {
        jeuCartes.push([j, i])
      }
      jeuCartes.push([j, i]) 
    }
  }
}

// On gère ici le nombre de joueurs pour la partie
function fixerNombreJoueurs() {
  nbJoueurs = parseInt(prompt("Indiquez un nombre de joueurs entre 2 et 10"))

  while (nbJoueurs < 2 || nbJoueurs > 10) {
    nbJoueurs = parseInt(prompt("Nombre de joueurs incorrect, indiquez un nombre de joueurs entre 2 et 10"))
  }

  if (isNaN(nbJoueurs)) {
    nbJoueurs = 2
  }
}

// Fonction permettant de mélanger le paquet de cartes
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Mélange du paquet
shuffle(jeuCartes)

// Distribution des cartes, chaque joueur en reçoit 8
function distribuerCartes() {
  for(let i: number = 0 ; i < nbJoueurs ; i++) {
    mainsJoueurs.push([])
    for(let j: number = 0 ; j < NB_CARTES_INITIALES ; j++) {
      let carte: number[] = jeuCartes.shift()
      mainsJoueurs[i].push(carte)
    }
  }
}

// On crée les lignes de cartes en HTML pour chaque joueur
function creerLignesJoueursHTML() {
  for (let i: number = 0 ; i < nbJoueurs ; i++) {
    // Div permettant d'afficher en lignes les cartes de chaque joueur
    let cartesJoueur = document.createElement("div");
    document.body.appendChild(cartesJoueur);

    cartesJoueur.id = i.toString()
    cartesJoueur.classList.add("paquetCartes");
  }
}

// Fonction permettant de créer une carte HTML
function creerCarteHTML(valeur: string, couleur: string) {
  // Création de la div de la carte
  let carteHTML = document.createElement("div")
  carteHTML.classList.add("carte")

  // Balise p affichant la valeur de la carte
  let texteCarteHTML = document.createElement("p")
  texteCarteHTML.classList.add("valeurCarte")

  carteHTML.appendChild(texteCarteHTML)

  // On calcule la bonne couleur et la bonne valeur à afficher pour la carte

  // On assigne la bonne chaîne de caractères pour la valeur de la carte
  texteCarteHTML.innerHTML = valeur
  // On assigne la bonne classe pour la couleur de la carte
  carteHTML.classList.add(couleur)

  return carteHTML
}

// Fonction permettant de faire la distribution initiale des cartes en HTML
function distributionHTML() {
  for (let i: number = 0 ; i < nbJoueurs ; i++) {
    for (let j: number = 0 ; j < NB_CARTES_INITIALES ; j++) {

      // On calcule la bonne couleur et la bonne valeur à afficher pour la carte
      let numCouleurCarte: number = mainsJoueurs[i][j][1]
      let couleurCarte: string = COULEURS_CARTES[numCouleurCarte]

      let numCarte: number = mainsJoueurs[i][j][0]
      let valeurCarte: string = VALEURS_CARTES[numCarte]

      // On crée la carte HTML
      let carteHTML = creerCarteHTML(valeurCarte, couleurCarte)
      // On l'ajoute à la bonne rangée
      document.getElementById(i.toString()).appendChild(carteHTML)
    }
  }
}

remplirPioche()
shuffle(jeuCartes)
fixerNombreJoueurs()
distribuerCartes()

creerLignesJoueursHTML()
distributionHTML()

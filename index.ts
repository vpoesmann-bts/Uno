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
// Tableau 2D contenant les cartes déjà jouées
let cartesJouees: number[][] = []

// Nombre de joueurs pour la partie
let nbJoueurs: number = 0
let tourJoueur: number = 0

// On remplit le jeu de cartes
// Chaque carte est en double sauf le 0, joker et plus4
function remplirPioche() {
  let compteurCarte: number = 0
  for (let i: number = 0 ; i < 4 ; i++) {
    for (let j: number = 0 ; j < 15 ; j++) {
      if (j > 0 && j < 13) {
        jeuCartes.push([j, i, compteurCarte])
        compteurCarte++
      }
      jeuCartes.push([j, i, compteurCarte])
      compteurCarte++
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
function creerCarteHTML(carte: number[]) {
  // Création de la div de la carte
  let carteHTML = document.createElement("div")
  carteHTML.classList.add("carte")

  // Balise p affichant la valeur de la carte
  let texteCarteHTML = document.createElement("p")
  texteCarteHTML.classList.add("valeurCarte")

  carteHTML.appendChild(texteCarteHTML)

  // On calcule la bonne couleur et la bonne valeur à afficher pour la carte
  let valeurCarte: string = VALEURS_CARTES[carte[0]]
  let couleurCarte: string = COULEURS_CARTES[carte[1]]

  // On assigne la bonne chaîne de caractères pour la valeur de la carte
  texteCarteHTML.innerHTML = valeurCarte
  // On assigne la bonne classe pour la couleur de la carte
  carteHTML.classList.add(couleurCarte)
  carteHTML.id = carte[2].toString()

  return carteHTML
}

// Supprime une carte HTML via son id
function supprimerCarteHTML(idUnique: number) {
  document.getElementById(idUnique.toString()).remove()
}

// Supprime une carte logique de la main d'un joueur avec l'index de la main et l'id de la carte
function supprimerCarteMain(indexMain: number, idCarte: number): number[] {
  let main: number[][] = mainsJoueurs[indexMain]
  for (let i: number = 0 ; i < main.length ; i++) {
    if (idCarte === main[i][2]) {
      let carte: number[] = main.splice(i, 1)[0]
      return carte
    }
  }
}

// Permet de lancer le jeu en piochant et jouant la première carte
function piocherPremiereCarte() {
  cartesJouees.push(jeuCartes.pop())
  let derniereCarte = cartesJouees[0]
  let carteVisible = document.getElementById("talon")
  carteVisible.appendChild(creerCarteHTML(derniereCarte))
}

// Fonction permettant de faire la distribution initiale des cartes en HTML
function distributionHTML() {
  for (let i: number = 0 ; i < nbJoueurs ; i++) {
    for (let j: number = 0 ; j < NB_CARTES_INITIALES ; j++) {

      // On récupère la carte
      let carte: number[] = mainsJoueurs[i][j]

      // On crée la carte HTML
      let carteHTML = creerCarteHTML(carte)

      carteHTML.addEventListener("click", function(event) {
        if(i === tourJoueur && jouerCarte(carte)) {
          let carteJouee: number[] = supprimerCarteMain(i, carte[2])
          jouerCarteHTML(carteJouee)
          cartesJouees.push(carteJouee)

          prochainTour()
        }
      })

      // On l'ajoute à la bonne rangée
      document.getElementById(i.toString()).appendChild(carteHTML)

    }
  }
}

// Joue la carte et applique ses effets si elle en a
function jouerCarte(carte: number[]) {
  if (cartesJouees.length !== 0 && !carteJouable(carte, cartesJouees[cartesJouees.length -1])) {
    return false
  } else {

    return true
  }
}

// S'occupe de l'affichage de la carte jouée
// déplace la carte jouée sur la pile des cartes jouées
function jouerCarteHTML(carte: number[]) {
  supprimerCarteHTML(carte[2])
  supprimerCarteHTML(cartesJouees[cartesJouees.length -1][2])
  let carteJouee = creerCarteHTML(carte)
  document.getElementById("talon").appendChild(carteJouee)
}

// Teste si la carte sélectionnée est jouable sur la carte précédente
function carteJouable(carte, cartePrec) {
  if (carte[0] >= Valeur.Joker) {
    return true
  } else if (carte[0] === cartePrec[0] || carte[1] === cartePrec[1]) {
    return true
  }

  return false
}

// Change le tour de jeu
function prochainTour() {
  tourJoueur += 1
  if (tourJoueur >= nbJoueurs) {
    tourJoueur = 0
  }
}

remplirPioche()
shuffle(jeuCartes)
fixerNombreJoueurs()
distribuerCartes()

creerLignesJoueursHTML()
distributionHTML()

piocherPremiereCarte()
jouerCarte(cartesJouees[0])

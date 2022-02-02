enum Couleur {
  Rouge,
  Vert,
  Jaune,
  Bleu,
}

enum Valeur {
  Plus2 = 10,
  Inversion,
  Passe,
  Joker,
  Plus4,
}

const NB_CARTES_INITIALES: number = 8
const COULEURS_CARTES: string[] = ["rouge", "vert", "jaune", "bleu"]

let jeuCartes: number[][] = []
let mainsJoueurs: number[][][] = []

for (let i: number = 0 ; i < 4 ; i++) {
  for (let j: number = 0 ; j < 15 ; j++) {
    if (j > 0 && j < 13) {
      jeuCartes.push([j, i]) 
    }
    jeuCartes.push([j, i]) 
  }
}

let nbJoueurs: number = parseInt(prompt("Indiquez un nombre de joueurs entre 2 et 10"))

while (nbJoueurs < 2 || nbJoueurs > 10) {
  nbJoueurs = parseInt(prompt("Nombre de joueurs incorrect, indiquez un nombre de joueurs entre 2 et 10"))
}

if (isNaN(nbJoueurs)) {
  nbJoueurs = 2
}
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffle(jeuCartes)

for(let i: number = 0 ; i < nbJoueurs ; i++) {
  mainsJoueurs.push([])
  for(let j: number = 0 ; j < NB_CARTES_INITIALES ; j++) {
    let carte: number[] = jeuCartes.shift()
    mainsJoueurs[i].push(carte)
  }
}

for (let i: number = 0 ; i < nbJoueurs ; i++) {
  let cartesJoueur = document.createElement("div");
  document.body.appendChild(cartesJoueur);

  cartesJoueur.id = i.toString()
  cartesJoueur.classList.add("paquetCartes");

  for (let j: number = 0 ; j < NB_CARTES_INITIALES ; j++) {
    let carteHTML = document.createElement("div")
    cartesJoueur.appendChild(carteHTML)
    carteHTML.classList.add("carte")
    let numCouleurCarte: number = mainsJoueurs[i][j][1]
    let couleurCarte: string = COULEURS_CARTES[numCouleurCarte]
    carteHTML.classList.add(couleurCarte)
  }
}


console.log(nbJoueurs)
console.log(jeuCartes)
console.log(mainsJoueurs)

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

let jeuCartes: number[][] = []

let newDiv = document.createElement("div");
document.body.appendChild(newDiv);
newDiv.classList.add("carte");
newDiv.classList.add("rouge");

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

console.log(nbJoueurs)
console.log(jeuCartes)

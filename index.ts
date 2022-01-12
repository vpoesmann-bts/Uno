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

console.log(jeuCartes)

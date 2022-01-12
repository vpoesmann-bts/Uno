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

for (let i: number = 0 ; i < 4 ; i++) {
  for (let j: number = 0 ; j < 15 ; j++) {
    jeuCartes.push([j, i]) 
  }
}

console.log(jeuCartes)

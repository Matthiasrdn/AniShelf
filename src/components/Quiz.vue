<template>
  <div class="quiz-page">
    <h1>Quiz AniShelf</h1>

    <div v-if="finished" class="result-box">
      <h2>Résultat</h2>
      <p>Tu as obtenu <strong>{{ score }}</strong> / {{ questions.length }}</p>

      <button class="btn primary" @click="restart">Rejouer</button>
    </div>

    <div v-else class="question-box" v-if="currentQuestion">
      <h2 class="question-title">
        Question {{ currentIndex + 1 }} / {{ questions.length }}
      </h2>

      <p class="question-text">{{ currentQuestion.question }}</p>

      <div class="choices">
        <button
          v-for="choice in currentQuestion.choices"
          :key="choice"
          class="choice-btn"
          :class="{
            correct: answered && choice === currentQuestion.answer,
            wrong: answered && choice === selected && choice !== currentQuestion.answer
          }"
          @click="selectChoice(choice)"
          :disabled="answered"
        >
          {{ choice }}
        </button>
      </div>

      <div v-if="answered" class="next-box">
        <button class="btn secondary" @click="nextQuestion">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  question: string
  choices: string[]
  answer: string
}

const QUESTIONS_PER_GAME = 10

const fullQuestions: Question[] = [
  {
    question: "Dans Vinland Saga, quel est le cadre historique principal de l’histoire ?",
    choices: ["La Grèce antique", "Le Japon féodal", "L’Europe des Vikings", "L’Amérique coloniale"],
    answer: "L’Europe des Vikings"
  },
  {
    question: "Quel est le sport au cœur de Blue Lock ?",
    choices: ["Basket-ball", "Football", "Rugby", "Handball"],
    answer: "Football"
  },
  {
    question: "Dans Tokyo Ghoul, quel établissement sert de refuge aux ghouls bienveillantes ?",
    choices: ["Anteiku", "Kabaneri", "NERV", "Soul Society"],
    answer: "Anteiku"
  },
  {
    question: "Dans Steins;Gate, quel élément du quotidien est détourné pour envoyer des messages dans le passé ?",
    choices: ["Un micro-ondes", "Une console de jeux", "Un PC portable", "Une télévision cathodique"],
    answer: "Un micro-ondes"
  },
  {
    question: "Dans My Hero Academia, comment appelle-t-on les pouvoirs des héros ?",
    choices: ["Stands", "Quirks/Alters", "Nen", "Techniques maudites"],
    answer: "Quirks/Alters"
  },
  {
    question: "Dans Hunter x Hunter, quel est le type de Nen principal de Gon ?",
    choices: ["Transformation", "Émission", "Manipulation", "Renforcement"],
    answer: "Renforcement"
  },
  {
    question: "Dans JoJo’s Bizarre Adventure, quelle génération introduit les Stands pour la première fois ?",
    choices: ["Phantom Blood (Part 1)", "Battle Tendency (Part 2)", "Stardust Crusaders (Part 3)", "Diamond is Unbreakable (Part 4)"],
    answer: "Stardust Crusaders (Part 3)"
  },
  {
    question: "Dans Jujutsu Kaisen, quel est le rôle principal de Satoru Gojo à l’école d’exorcistes ?",
    choices: ["Directeur de l’école", "Professeur", "Étudiant", "Inspecteur spécial"],
    answer: "Professeur"
  },
  {
    question: "Dans Chainsaw Man, à quoi est lié le pouvoir de Denji ?",
    choices: ["Une tronçonneuse", "Un fusil", "Un chien démoniaque", "Un katana maudit"],
    answer: "Une tronçonneuse"
  },
  {
    question: "Dans Violet Evergarden, quel métier Violet exerce-t-elle pour comprendre les émotions ?",
    choices: ["Journaliste", "Autrice de romans", "Auto Memory Doll (rédactrice de lettres)", "Professeure"],
    answer: "Auto Memory Doll (rédactrice de lettres)"
  },
  {
    question: "Dans Bungo Stray Dogs, plusieurs personnages sont inspirés de quoi ?",
    choices: ["Dieux japonais", "Personnages de jeux vidéo", "Auteurs et œuvres littéraires", "Figures historiques européennes"],
    answer: "Auteurs et œuvres littéraires"
  },
  {
    question: "Dans Noragami, Yato est au départ un dieu…",
    choices: ["De la guerre", "De la pauvreté", "Du ménage", "Sans domaine clairement reconnu"],
    answer: "Sans domaine clairement reconnu"
  },
  {
    question: "Dans Dr. Stone, pourquoi la civilisation doit-elle être reconstruite ?",
    choices: ["Une guerre nucléaire a tout détruit", "Un virus a éradiqué l’humanité", "Tous les humains ont été pétrifiés", "La Terre a changé d’orbite"],
    answer: "Tous les humains ont été pétrifiés"
  },
  {
    question: "Dans Fire Force, quel est le phénomène surnaturel au cœur du scénario ?",
    choices: ["Métamorphose en pierre", "Combustion spontanée humaine", "Pluie acide constante", "Possession par des esprits"],
    answer: "Combustion spontanée humaine"
  },
  {
    question: "Dans Fate/Zero, pour quel objet mystique les mages se battent-ils ?",
    choices: ["La Lance de Longinus", "La Triforce", "Le Saint Graal", "La Pierre philosophale"],
    answer: "Le Saint Graal"
  },
  {
    question: "Dans Overlord, quel est le nom que prend le protagoniste coincé dans le jeu ?",
    choices: ["Kirito", "Ainz Ooal Gown", "Momonga D.", "Bell Cranel"],
    answer: "Ainz Ooal Gown"
  },
  {
    question: "Dans No Game No Life, comment sont réglés les conflits dans le monde de Disboard ?",
    choices: ["Par la guerre totale", "Par vote démocratique", "Par des jeux et paris", "Par duel magique"],
    answer: "Par des jeux et paris"
  },
  {
    question: "Dans The Rising of the Shield Hero, quel est le principal handicap de Naofumi au combat ?",
    choices: ["Il ne peut utiliser que des boucliers", "Il ne peut pas parler", "Il ne peut pas utiliser de magie", "Il est maudit de ne pas pouvoir blesser ses ennemis"],
    answer: "Il ne peut utiliser que des boucliers"
  },
  {
    question: "Dans Re:Zero, quel est le « pouvoir » principal de Subaru ?",
    choices: ["Voyager dans le futur", "Contrôler les souvenirs", "Revenir à la vie à un point de sauvegarde", "Changer de corps avec quelqu’un"],
    answer: "Revenir à la vie à un point de sauvegarde"
  },
  {
    question: "Dans Erased, dans quelle période de sa vie Satoru est-il renvoyé pour résoudre le mystère ?",
    choices: ["Dans sa petite enfance", "Au collège", "Au lycée", "À l’université"],
    answer: "Dans sa petite enfance"
  },
  {
    question: "Dans Psycho-Pass, que mesure le fameux système Sibyl pour juger un individu ?",
    choices: ["Son QI", "Son niveau de stress criminel (Crime Coefficient)", "Sa fortune", "Son âge mental"],
    answer: "Son niveau de stress criminel (Crime Coefficient)"
  },
  {
    question: "Dans Haikyuu!!, sur quel poste Hinata se spécialise-t-il malgré sa taille ?",
    choices: ["Passeur", "Libero", "Central/pointu", "Réceptionneur-attaquant"],
    answer: "Central/pointu"
  },
  {
    question: "Dans Spy x Family, quelle particularité possède Anya ?",
    choices: ["Elle voit le futur", "Elle lit dans les pensées", "Elle contrôle le temps", "Elle est invisibile"],
    answer: "Elle lit dans les pensées"
  },
  {
    question: "Dans Blue Exorcist, de qui Rin Okumura est-il le fils ?",
    choices: ["D’un exorciste légendaire", "De Satan", "D’un dieu oublié", "Du pape"],
    answer: "De Satan"
  },
  {
    question: "Dans Toradora!, quel est le genre principal de la série ?",
    choices: ["Mecha", "Isekai", "Romance / slice of life", "Horreur psychologique"],
    answer: "Romance / slice of life"
  },
  {
    question: "Dans Wolf Children, quelle est la particularité des enfants d’Hana ?",
    choices: ["Ils ne vieillissent pas", "Ils peuvent voler", "Ils peuvent se transformer en loups", "Ils voient les fantômes"],
    answer: "Ils peuvent se transformer en loups"
  },
  {
    question: "Dans Ajin, quelle est la caractéristique principale des Ajin ?",
    choices: ["Ils ne ressentent pas la douleur", "Ils sont immortels", "Ils ne dorment jamais", "Ils contrôlent le métal"],
    answer: "Ils sont immortels"
  },
  {
    question: "Dans Golden Kamuy, que cherche principalement le duo de protagonistes ?",
    choices: ["Un artefact magique", "Un trésor en or caché", "Un passage vers l’Amérique", "Une ville perdue"],
    answer: "Un trésor en or caché"
  },

  {
    question: "Lequel de ces animés est un film du studio Madhouse et non une série ?",
    choices: ["Redline", "Black Lagoon", "Paranoia Agent", "Devilman Crybaby"],
    answer: "Redline"
  },
  {
    question: "Parmi ces animés, lequel n’est PAS initialement adapté d’un manga mais d’un visual novel ou novel ?",
    choices: ["Steins;Gate", "Erased", "Tokyo Ghoul", "Chainsaw Man"],
    answer: "Steins;Gate"
  },
  {
    question: "Dans Code Geass, quel est l’effet principal du Geass de Lelouch ?",
    choices: ["Remonter le temps", "Lire les pensées", "Contrôler totalement une personne une fois", "Annuler les souvenirs d’une personne"],
    answer: "Contrôler totalement une personne une fois"
  },
  {
    question: "Dans Fate/Zero, Saber est la réincarnation d’une figure historique. Laquelle ?",
    choices: ["Arthur Pendragon (Roi Arthur)", "Lancelot du Lac", "Alexandre le Grand", "Jeanne d’Arc"],
    answer: "Arthur Pendragon (Roi Arthur)"
  },
  {
    question: "Parmi ces œuvres laquelle est classée 18+ ?",
    choices: ["Berserk (1997)", "Devilman Crybaby", "Hellsing Ultimate", "Texhnolyze"],
    answer: "Devilman Crybaby"
  },
  {
    question: "Dans Neon Genesis Evangelion, comment appelle-t-on les ennemis mystérieux que combattent les EVA ?",
    choices: ["Hollows", "Titans", "Anges", "Démons"],
    answer: "Anges"
  },
  {
    question: "Lequel de ces animés traite le plus directement du thème de la dépression et de l’introspection existentielle ?",
    choices: ["Neon Genesis Evangelion", "Haikyuu!!", "Blue Lock", "Food Wars!"],
    answer: "Neon Genesis Evangelion"
  },
  {
    question: "Laquelle de ces œuvres est un film de la réalisatrice Naoko Yamada (Kyoto Animation) ?",
    choices: ["A Silent Voice", "Belle", "Wolf Children", "Spirited Away"],
    answer: "A Silent Voice"
  },
  {
    question: "Parmi ces animés, lequel est un spin globalement centré sur une évaluation du « coefficient criminel » ?",
    choices: ["Death Note", "Psycho-Pass", "Ergo Proxy", "Paranoia Agent"],
    answer: "Psycho-Pass"
  },
  {
    question: "Dans JoJo’s Bizarre Adventure, comment s’appelle le pouvoir spirituel qui accompagne les utilisateurs à partir de la Part 3 ?",
    choices: ["Quirk", "Nen", "Stand", "Geass"],
    answer: "Stand"
  },
  {
    question: "Dans Moriarty the Patriot, quelle célèbre figure littéraire antagonise William James Moriarty ?",
    choices: ["Hercule Poirot", "Sherlock Holmes", "Lupin III", "Conan Edogawa"],
    answer: "Sherlock Holmes"
  },
  {
    question: "Dans Devilman Crybaby, quel est le véritable objectif de Ryo Asuka ?",
    choices: [
      "Devenir le roi des démons",
      "Observer l’humanité pour Dieu",
      "Déclencher l’apocalypse et révéler la guerre anges/démons",
      "Éradiquer tous les démons et sauver le monde"
    ],
    answer: "Déclencher l’apocalypse et révéler la guerre anges/démons"
  },
  {
    question: "Lequel de ces animés traite le plus directement de la guerre et des discriminations ethniques dans un contexte futuriste ?",
    choices: ["Vinland Saga", "86 Eighty-Six", "Erased", "Fire Force"],
    answer: "86 Eighty-Six"
  },
  {
    question: "Parmi ces animés, lequel est un exemple classique d’« urban fantasy » se déroulant dans un quartier réel de Tokyo ?",
    choices: ["Durarara!!", "Gurren Lagann", "Vinland Saga", "Dr. Stone"],
    answer: "Durarara!!"
  },
  {
    question: "Dans Haibane Renmei, quelle est une des grandes questions symboliques au cœur de la série ?",
    choices: [
      "L’origine du pouvoir magique",
      "La réincarnation et la rédemption",
      "La colonisation spatiale",
      "La création d’IA conscientes"
    ],
    answer: "La réincarnation et la rédemption"
  },
  {
    question: "Lequel de ces animés se rapproche le plus du cyberpunk philosophique ?",
    choices: ["Ergo Proxy", "Haikyuu!!", "Toradora!", "Free!"],
    answer: "Ergo Proxy"
  },
  {
    question: "Dans Dorohedoro, quelle est la particularité physique majeure de Caiman ?",
    choices: ["Il a un bras mécanique", "Il a une tête de lézard", "Il a deux cœurs", "Il a des ailes"],
    answer: "Il a une tête de lézard"
  },
  {
    question: "Lequel de ces animés est produit par le studio MAPPA ?",
    choices: ["Chainsaw Man", "Free!", "Violet Evergarden", "Cowboy Bebop"],
    answer: "Chainsaw Man"
  },
  {
    question: "Parmi ces œuvres, laquelle est une série courte (environ 11–13 épisodes) mais reconnue pour son style graphique très atypique et centré sur le ping-pong ?",
    choices: ["Megalo Box", "Ping Pong the Animation", "Yuri!!! on Ice", "Blue Lock"],
    answer: "Ping Pong the Animation"
  },
  {
    question: "Dans Black Lagoon, dans quelle région du monde se déroulent principalement les activités de la Lagoon Company ?",
    choices: ["Europe de l’Est", "Amérique du Nord", "Asie du Sud-Est", "Afrique du Nord"],
    answer: "Asie du Sud-Est"
  },
  {
    question: "Parmi ces animés, lequel propose une réécriture moderne du mythe du vampire dans un contexte quasi militaire ?",
    choices: ["Hellsing Ultimate", "Devilman Crybaby", "Bungo Stray Dogs", "Oshi no Ko"],
    answer: "Hellsing Ultimate"
  },
  {
    question: "Dans Gurren Lagann, quel thème symbolique est au cœur de l’histoire ?",
    choices: ["La lutte des classes", "Le dépassement de soi et la volonté humaine", "La science contre la magie", "La vengeance familiale"],
    answer: "Le dépassement de soi et la volonté humaine"
  },
  {
    question: "Lequel de ces animés est le plus associé au réalisateur Satoshi Kon ?",
    choices: ["Paranoia Agent", "Erased", "Ergo Proxy", "Psycho-Pass"],
    answer: "Paranoia Agent"
  },
  {
    question: "Parmi ces œuvres, laquelle est un film traitant surtout de la notion de distance temporelle et émotionnelle entre deux personnes ?",
    choices: ["5 Centimeters per Second", "Grave of the Fireflies", "Wolf Children", "Summer Wars"],
    answer: "5 Centimeters per Second"
  },
  {
    question: "Dans Terror in Resonance, quel moyen les deux protagonistes utilisent-ils pour défier la police ?",
    choices: ["Des braquages de banques", "Des énigmes et vidéos en ligne", "Des combats de rue", "Des piratages de jeux vidéo"],
    answer: "Des énigmes et vidéos en ligne"
  },
  {
    question: "Parmi ces animés, lequel est un thriller tournant autour d’une boucle temporelle et d’enlèvements d’enfants ?",
    choices: ["Erased", "Death Note", "Steins;Gate", "Re:Zero"],
    answer: "Erased"
  },
  
  {
    question: "Lequel de ces animés est un film du studio Chizu et non de Ghibli ou Kyoto Animation ?",
    choices: ["Belle", "Spirited Away", "A Silent Voice", "My Neighbor Totoro"],
    answer: "Belle"
  },
  {
    question: "Dans Fullmetal Alchemist: Brotherhood, quel est le péché capital incarné par le chef des Homunculus ?",
    choices: ["Pride", "Father", "Greed", "Wrath"],
    answer: "Father"
  },
  {
    question: "Quel anime mélange patinage artistique et introspection émotionnelle ?",
    choices: ["Free!", "Yuri!!! on Ice", "Ping Pong the Animation", "Horimiya"],
    answer: "Yuri!!! on Ice"
  },
  {
    question: "Dans Fate/Zero, quel servant est célèbre pour son charisme exubérant lors des banquets ?",
    choices: ["Gilgamesh", "Lancer", "Rider (Iskander)", "Assassin"],
    answer: "Rider (Iskander)"
  },
  {
    question: "Dans Mob Psycho 100, quel est l’alias du mentor de Mob ?",
    choices: ["Tsubomi", "Reigen", "Dimple", "Serizawa"],
    answer: "Reigen"
  },
  {
    question: "Dans Dragon Ball Z, quel est le premier ennemi majeur de l’arc Saiyan ?",
    choices: ["Frieza", "Raditz", "Cell", "Vegeta"],
    answer: "Raditz"
  },
  {
    question: "Quel anime propose une réécriture moderne du mythe de Frankenstein ?",
    choices: ["Erased", "Ajin", "Devilman Crybaby", "Paranoia Agent"],
    answer: "Ajin"
  },
  {
    question: "Dans Dorohedoro, dans quel lieu se déroule principalement l’histoire ?",
    choices: ["Le Monde Souterrain", "La Capitale", "Hole", "La Zone Libre"],
    answer: "Hole"
  },
  {
    question: "Quel anime associe magie, clans et rivalité fraternelle dans un univers médiéval fantastique ?",
    choices: ["Black Clover", "Fairy Tail", "Overlord", "No Game No Life"],
    answer: "Black Clover"
  },
  {
    question: "Dans Cowboy Bebop, comment s'appelle le vaisseau principal ?",
    choices: ["Swordfish II", "Red Tail", "Bebop", "Outlaw Star"],
    answer: "Bebop"
  },
  {
    question: "Quel anime présente un monde où les humains sont menacés par une forêt et ses créatures géantes ?",
    choices: ["Made in Abyss", "Princess Mononoke", "Nausicaä of the Valley of the Wind", "To Your Eternity"],
    answer: "Nausicaä of the Valley of the Wind"
  },
  {
    question: "Dans Konosuba, quel est le pouvoir principal d’Aqua ?",
    choices: ["Feu sacré", "Résurrection et purification", "Invocation d’armes divines", "Domination mentale"],
    answer: "Résurrection et purification"
  },
  {
    question: "Dans Erased, quel métier Satoru exerce-t-il en tant qu’adulte ?",
    choices: ["Enseignant", "Livreur de pizzas", "Mangaka raté", "Policier"],
    answer: "Livreur de pizzas"
  },
  {
    question: "Dans Bleach, quel est le rôle d’un Shinigami remplaçant ?",
    choices: ["Capturer les hollows", "Protéger les humains", "Guider les âmes", "Tout à la fois"],
    answer: "Tout à la fois"
  },
  {
    question: "Dans Fire Force, quelle brigade Shinra rejoint-il ?",
    choices: ["Compagnie 7", "Compagnie 1", "Compagnie 8", "Compagnie 5"],
    answer: "Compagnie 8"
  },
  {
    question: "Dans Blue Exorcist, quel démon légendaire apparaît comme l’ennemi principal ?",
    choices: ["Baal", "Satan", "Asmodeus", "Belzébuth"],
    answer: "Satan"
  },
  {
    question: "Dans Gurren Lagann, quel est le nom du robot principal ?",
    choices: ["Lagann", "Tengen Toppa", "Gurren", "Gurren Lagann"],
    answer: "Gurren Lagann"
  },
  {
    question: "Quel anime mélange mafia, littérature et pouvoirs surnaturels ?",
    choices: ["Durarara!!", "Black Lagoon", "Bungo Stray Dogs", "Moriarty the Patriot"],
    answer: "Bungo Stray Dogs"
  },
  {
    question: "Dans Ranking of Kings, quel est le handicap principal de Bojji ?",
    choices: ["Aveugle", "Sourd et muet", "Ne peut pas marcher", "Ne peut pas parler"],
    answer: "Sourd et muet"
  },
  {
    question: "Dans Tokyo Ghoul, comment s’appelle la spécialité d’arme anti-ghoul utilisée par les inspecteurs ?",
    choices: ["Quirk", "Kagune", "Queen", "Quinque"],
    answer: "Quinque"
  },
  {
    question: "Dans Fairy Tail, quel est l’élément que maîtrise Natsu ?",
    choices: ["Glace", "Feu", "Vent", "Lumière"],
    answer: "Feu"
  },


  {
    question: "Dans Neon Genesis Evangelion, quelle organisation pilote les EVA ?",
    choices: ["WILLE", "Seele", "Gehirn", "NERV"],
    answer: "NERV"
  },
  {
    question: "Dans Monster quelle métaphore symbolise le monstre intérieur ?",
    choices: ["Le cercle", "Le dragon", "Le vampire", "Le loup"],
    answer: "Le dragon"
  },
  {
    question: "Dans Berserk 1997, quel événement marque la fin traumatisante de la série ?",
    choices: ["Le Grand Fléau", "L’Éclipse", "Le Pacte Noir", "La Marque du Démon"],
    answer: "L’Éclipse"
  },
  {
    question: "Dans Death Note, pourquoi L s’assoit-il de façon accroupie ?",
    choices: [
      "Pour se concentrer",
      "Pour rester éveillé",
      "Pour augmenter son niveau de réflexion",
      "Pour contrer la pression artérielle"
    ],
    answer: "Pour augmenter son niveau de réflexion"
  },
  {
    question: "Dans 86 Eighty-Six, comment sont appelés les soldats sacrifiés par la République ?",
    choices: ["Les Oubliés", "Les No-Names", "Les 86", "Les Sans-Voix"],
    answer: "Les 86"
  },
  {
    question: "Dans Fate/Zero, quel servant est réputé pour sa philosophie nihiliste sur la guerre ?",
    choices: ["Caster", "Assassin", "Berserker", "Kirei Kotomine / Lancer"],
    answer: "Caster"
  },
  {
    question: "Dans Ergo Proxy, quel terme désigne les androïdes sophistiqués cohabitant avec les humains ?",
    choices: ["AutoReivs", "EVA", "Dolls", "Synthetic Souls"],
    answer: "AutoReivs"
  },
  {
    question: "Dans Texhnolyze, quelle ville souterraine constitue le décor du récit ?",
    choices: ["Rapture", "Luca", "Lux", "Zalem"],
    answer: "Lux"
  },
  {
    question: "Dans Hellsing Ultimate, quel est le nom de l'ennemi nazi surnaturel que doit combattre Alucard ?",
    choices: ["Millennium", "Einsatz", "Ouroboros", "Edelweiss"],
    answer: "Millennium"
  },
  {
    question: "Dans Gantz, que doivent absolument faire les participants pour survivre ?",
    choices: ["Obéir à la sphère noire", "Gagner une guerre", "Tuer un monstre précis", "Terminer des missions sans mourir"],
    answer: "Terminer des missions sans mourir"
  },
  {
    question: "Dans Black Lagoon, comment s’appelle la ville gangrenée par la criminalité où vit l’équipage ?",
    choices: ["Roanapur", "Shinjuku", "Rangpur", "Laketown"],
    answer: "Roanapur"
  },
  {
    question: "Dans Paranoia Agent, que symbolise la batte dorée de Shonen Bat ?",
    choices: ["Une déité", "La violence juvénile", "La fuite face aux problèmes", "La folie collective"],
    answer: "La fuite face aux problèmes"
  },
  {
    question: "Dans Durarara!!, comment s'appelle la motarde sans tête ?",
    choices: ["Selty", "Celia", "Senna", "Shizu"],
    answer: "Selty"
  },
  {
    question: "Dans Oshi no Ko, quel métier Ai exerce-t-elle ?",
    choices: ["Actrice", "Idole", "Influenceuse", "Mannequin"],
    answer: "Idole"
  },
  {
    question: "Dans Summer Wars, quel est le nom du monde virtuel attaqué par l’IA Love Machine ?",
    choices: ["Linkverse", "OZ", "AetherNet", "Digital Sea"],
    answer: "OZ"
  },
  {
    question: "Dans Children of the Sea, quelle entité cosmique influence le destin des protagonistes ?",
    choices: ["Les étoiles", "L’océan lui-même", "Une comète", "Un monstre marin géant"],
    answer: "L’océan lui-même"
  },
  {
    question: "Dans Violet Evergarden, quel événement tragique pousse Violet à changer de voie ?",
    choices: ["La perte de ses bras", "La mort de Gilbert", "Sa capture", "La perte de mémoire"],
    answer: "La perte de ses bras"
  },
  {
    question: "Dans Dorohedoro, quel rôle jouent les sorciers dans l'univers ?",
    choices: ["Oppresseurs des humains", "Protecteurs", "Nomades neutres", "Retirés du monde"],
    answer: "Oppresseurs des humains"
  },
  {
    question: "Dans Made in Abyss, quel est le principal danger de la remontée hors de l’Abysse ?",
    choices: ["Les monstres", "La malédiction de l’Abysse", "La faim", "L’absence de lumière"],
    answer: "La malédiction de l’Abysse"
  },
  {
    question: "Dans Moriarty the Patriot, quelle est la philosophie de Moriarty pour « améliorer » le monde ?",
    choices: ["Éradiquer les pauvres", "Détruire le gouvernement", "Punir les nobles corrompus", "Planter une révolution socialiste"],
    answer: "Punir les nobles corrompus"
  },
  {
    question: "Dans One Piece, quel membre de l'équipage de Luffy est originaire du Royaume de Drum ?",
    choices: ["Chopper", "Nami", "Robin", "Franky"],
    answer: "Chopper"
  },
  {
    question: "Quel est le nom du titan que possède Reiner Braun dans Attack on Titan ?",
    choices: ["Titan Assaillant", "Titan Colossal", "Titan Cuirassé", "Titan Bestial"],
    answer: "Titan Cuirassé"
  },
  {
    question: "Dans My Hero Academia, quel personnage utilise un alter basé sur la glace et le feu ?",
    choices: ["Bakugo", "Todoroki", "Deku", "Endeavor"],
    answer: "Todoroki"
  },
  {
    question: "Quel est le but principal d’Edward et Alphonse dans Fullmetal Alchemist: Brotherhood ?",
    choices: ["Vaincre le gouvernement", "Récupérer leurs corps", "Créer une chimère parfaite", "Trouver une nouvelle nation"],
    answer: "Récupérer leurs corps"
  },
  {
    question: "Quel est le nom de l'école que fréquente Light Yagami dans Death Note ?",
    choices: ["To-Oh University", "Tokyo Tech", "Kansai Academy", "Meiwa College"],
    answer: "To-Oh University"
  },
  {
    question: "Dans Demon Slayer, quel démon utilise la Lune comme thème pour ses techniques ?",
    choices: ["Akaza", "Kokushibo", "Douma", "Gyutaro"],
    answer: "Kokushibo"
  },
  {
    question: "Dans Naruto, qui est le premier à enseigner le contrôle du chakra à Naruto ?",
    choices: ["Kakashi", "Iruka", "Jiraya", "Ebisu"],
    answer: "Ebisu"
  },
  {
    question: "Dans Sword Art Online, quel est l’étage final d’Aincrad ?",
    choices: ["50", "75", "100", "150"],
    answer: "100"
  },
  {
    question: "Quel personnage de Hunter x Hunter a la capacité d’utiliser la chaîne Judgement Chain ?",
    choices: ["Hisoka", "Killua", "Kurapika", "Chrollo"],
    answer: "Kurapika"
  },
  {
    question: "Dans Jujutsu Kaisen, quel personnage possède la technique des Dix Ombres ?",
    choices: ["Yuji", "Gojo", "Megumi", "Nobara"],
    answer: "Megumi"
  },
  {
    question: "Quel anime raconte l’histoire d’une fille capable de voyager dans le temps après un accident en classe ?",
    choices: ["Erased", "Your Name", "The Girl Who Leapt Through Time", "Steins;Gate"],
    answer: "The Girl Who Leapt Through Time"
  },
  {
    question: "Dans Bleach, quel est le nom complet de l'épée d’Ichigo ?",
    choices: ["Senbonzakura", "Zangetsu", "Benihime", "Wabisuke"],
    answer: "Zangetsu"
  },
  {
    question: "Quel anime met en scène un monde virtuel nommé OZ utilisé par des millions de personnes ?",
    choices: ["Summer Wars", "SAO", "No Game No Life", "Overlord"],
    answer: "Summer Wars"
  },
  {
    question: "Dans Fairy Tail, quel esprit de Lucy est le plus puissant parmi les signes du zodiaque ?",
    choices: ["Leo", "Virgo", "Aquarius", "Taurus"],
    answer: "Leo"
  },
  {
    question: "Dans Tokyo Ghoul, quelle est la classe d’un inspecteur spécialisé d’élite ?",
    choices: ["Classe A", "Classe S", "Classe Spéciale", "Classe Oméga"],
    answer: "Classe Spéciale"
  },
  {
    question: "Quel anime raconte l’histoire d’une jeune femme qui apprend à écrire des lettres pour comprendre ses émotions ?",
    choices: ["Your Lie in April", "Violet Evergarden", "Clannad", "A Silent Voice"],
    answer: "Violet Evergarden"
  },
  {
    question: "Dans Blue Lock, quel est l'objectif unique demandé aux joueurs ?",
    choices: ["Jouer en équipe", "Devenir le meilleur gardien", "Marquer et devenir attaquant n°1", "Apprendre le fair-play"],
    answer: "Marquer et devenir attaquant n°1"
  },
  {
    question: "Quel personnage de JoJo possède Stand *Star Platinum* ?",
    choices: ["Jotaro", "Joseph", "Giorno", "Jonathan"],
    answer: "Jotaro"
  },
  {
    question: "Dans Black Clover, quel est l'atout principal d’Asta malgré l’absence de magie ?",
    choices: ["Une force surhumaine", "L’anti-magie", "Un grimoire élémentaire", "Un démon guérisseur"],
    answer: "L’anti-magie"
  },
  {
    question: "Dans Overlord, quel est le nom de la guilde dont Momonga était le maître ?",
    choices: ["Ainz Ooal Gown", "Blue Roses", "Black Fangs", "Dragon Tusk"],
    answer: "Ainz Ooal Gown"
  },
  {
    question: "Quel anime met en scène une équipe de combattants luttant contre des démons enflammés ?",
    choices: ["Demon Slayer", "Fire Force", "Chainsaw Man", "Blue Exorcist"],
    answer: "Fire Force"
  },
  {
    question: "Dans Mob Psycho 100, quel est le principal objectif de Mob ?",
    choices: ["Devenir le plus puissant", "Gagner de l’argent", "Mener une vie normale", "Dominer les esprits"],
    answer: "Mener une vie normale"
  },
  {
    question: "Dans Code Geass, quel pouvoir Lelouch obtient-il en recevant le Geass ?",
    choices: ["Contrôle total d'une personne", "Téléportation", "Télépathie", "Manipulation du temps"],
    answer: "Contrôle total d'une personne"
  },
  {
    question: "Quel film raconte l’histoire de deux enfants mi-loups élevés par leur mère ?",
    choices: ["Children of the Sea", "Wolf Children", "Belle", "Spirited Away"],
    answer: "Wolf Children"
  },
  {
    question: "Dans Psycho-Pass, comment appelle-t-on la valeur qui mesure la dangerosité mentale ?",
    choices: ["Soul Index", "Crime Coefficient", "Threat Number", "Mental Pulse"],
    answer: "Crime Coefficient"
  },
  {
    question: "Quel film de Makoto Shinkai explore la distance émotionnelle et physique entre deux personnes ?",
    choices: ["Your Name", "Weathering With You", "5 Centimeters per Second", "The Garden of Words"],
    answer: "5 Centimeters per Second"
  },
  {
    question: "Dans Dr. Stone, quel est le domaine principal de Senku ?",
    choices: ["Médecine", "Technique militaire", "Ingénierie et science", "Astronomie"],
    answer: "Ingénierie et science"
  },
  {
    question: "Quel anime se déroule dans une ville fictive nommée Ikebukuro où des gangs s'affrontent ?",
    choices: ["Durarara!!", "Bungo Stray Dogs", "Black Lagoon", "Paranoia Agent"],
    answer: "Durarara!!"
  },
  {
    question: "Dans Gurren Lagann, quel est le thème principal récurrent ?",
    choices: ["La politique", "Le destin tragique", "Le dépassement de soi", "La science contre la magie"],
    answer: "Le dépassement de soi"
  },
  {
    question: "Quel anime présente un protagoniste ressuscitant après chaque échec pour changer le futur ?",
    choices: ["Steins;Gate", "Re:Zero", "Erased", "Made in Abyss"],
    answer: "Re:Zero"
  }
]



const questions = ref<Question[]>([])
const currentIndex = ref(0)
const selected = ref<string | null>(null)
const answered = ref(false)
const score = ref(0)
const finished = ref(false)

function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initGame() {
  const shuffled = shuffle(fullQuestions)
  questions.value = shuffled.slice(0, QUESTIONS_PER_GAME)
  currentIndex.value = 0
  selected.value = null
  answered.value = false
  finished.value = false
  score.value = 0
}

const currentQuestion = computed(() => questions.value[currentIndex.value])

function selectChoice(choice: string) {
  if (answered.value || !currentQuestion.value) return
  selected.value = choice
  answered.value = true
  if (choice === currentQuestion.value.answer) {
    score.value++
  }
}

function nextQuestion() {
  if (currentIndex.value >= questions.value.length - 1) {
    finished.value = true
  } else {
    currentIndex.value++
    selected.value = null
    answered.value = false
  }
}

function restart() {
  initGame()
}

initGame()
</script>

<style scoped>
.quiz-page {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.2rem;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.question-box,
.result-box {
  background: radial-gradient(circle at top, #1f2937, #020617);
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(244, 114, 182, 0.3);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
}

.question-title {
  font-size: 1rem;
  color: #9ca3af;
}

.question-text {
  margin: 12px 0 18px;
  font-size: 1.1rem;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-btn {
  background: #111827;
  border: 1px solid rgba(148, 163, 184, 0.4);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: #e5e7eb;
}

.choice-btn:hover {
  border-color: rgba(244, 114, 182, 0.8);
}

.correct {
  background: rgba(34, 197, 94, 0.25);
  border-color: #22c55e !important;
  color: #22c55e !important;
}

.wrong {
  background: rgba(239, 68, 68, 0.25);
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

.next-box {
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn.primary {
  background: linear-gradient(135deg, #fb7185, #f9a8d4);
  color: #111827;
}

.btn.secondary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #eef2ff;
}
</style>

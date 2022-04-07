const consts = {
    firstDate: new Date(2022, 2, 29),
    apiKey: "453b207e5b4f65b9f51b1abb01505e89",
    imageUrl: "https://image.tmdb.org/t/p/w342",
    movieUrl: "https://api.themoviedb.org/3/movie",
    getFullImageUrl: (posterUrl) => `https://image.tmdb.org/t/p/w342${posterUrl}`,
    getFullMovieUrl: (id, lang) => `https://api.themoviedb.org/3/movie/${id}?api_key=453b207e5b4f65b9f51b1abb01505e89&language=${lang}`,
    getFullSeachUrl: (value, lang) => `https://api.themoviedb.org/3/search/movie?api_key=453b207e5b4f65b9f51b1abb01505e89&query=${value}&language=${lang}`,
}

consts.ids = [
    550,
    680,
    157336,
    62,
    78,
    238,
    13,
    120,
    429,
    155,
    27205,
    28,
    185,
    128,
    38,
    1018,
    129,
    11,
    603,
    105,
    694,
    335,
    98,
    769,
    5915,
    64690,
    278,
    115,
    348,
    497,
    68718,
    2105,
    14,
    500,
    11324,
    265177,
    24,
    329,
    103,
    641,
    629,
    73,
    60670,
    752,
    854,
    90,
    424,
    313369,
    16869,
    19995,
    162,
    107,
    597,
    37165,
    153,
    43074,
    38473,
    31011,
    1124,
    244786,
    671,
    76341,
    274,
    101,
    600,
    280,
    44214,
]

if (navigator.language === "fr" || navigator.language === "fr-FR") {
    consts.texts = {
        loading: "Chargement....",
        inputPlaceholder: "Titre du film..",
        confirmButton: "Confirmer",
        help: {
            title: "Aide",
            description: "Le principe du jeu est de trouver l'affiche du film qui est pixélisée, en un maximum de 6 essais.",
            description2: "A chaque essai, l'affiche du film se dévoile un peu plus. Bonne chance !",
            database: "Base de données fournie par ",
        },
        endGame: {
            title: "Partie terminée",
            description: "Merci d'avoir joué, à demain pour un nouveau film !",
            share: "Partager",
        },
        toastr: {
            copy: "Copié dans le presse-papier !"
        }
    }
} else {
    consts.texts = {
        loading: "Loading....",
        inputPlaceholder: "Movie title..",
        confirmButton: "Submit",
        help: {
            title: "Help",
            description: "The principle of the game is to find the movie poster that is pixelated, in a maximum of 6 tries.",
            description2: "with each test, the poster is revealed a little more. Good luck !",
            database: "Database provided by ",
        },
        endGame: {
            title: "Game Finished",
            description: "Thanks for playing, see you tomorrow for the next movie !",
            share: "Share",
        },
        toastr: {
            copy: "Copied to clipboard !"
        }
    }
}

export default consts
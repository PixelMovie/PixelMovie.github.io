const consts = {
    apiKey: "453b207e5b4f65b9f51b1abb01505e89",
    imageUrl: "https://image.tmdb.org/t/p/w342",
    movieUrl: "https://api.themoviedb.org/3/movie",
    getFullImageUrl: (posterUrl) => `https://image.tmdb.org/t/p/w342${posterUrl}`,
    getFullMovieUrl: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=453b207e5b4f65b9f51b1abb01505e89&language=fr`,
    getFullSeachUrl: (value) => `https://api.themoviedb.org/3/search/movie?api_key=453b207e5b4f65b9f51b1abb01505e89&query=${value}&language=fr`,
}

export default consts
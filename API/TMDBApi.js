const API_TOKEN = "85f700aeb24fd6957a0742fbb195f23e";

// https://api.themoviedb.org/3/movie/550?api_key=85f700aeb24fd6957a0742fbb195f23e

export default function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page='+page;
    return fetch(url).then((response) => response.json()).catch((error) => console.error(error))
}


export function getImageFromApi(name){
  return "https://image.tmdb.org/t/p/w300" + name;
}


export function getFilmDetailFromApi(id){

  const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=' + API_TOKEN + '&language=fr'

  return fetch(url).then((response) => response.json()).catch((error) => console.error(error))
  
}
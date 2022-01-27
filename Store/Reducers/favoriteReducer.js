const initialState = { favoritesFilm:[] }


function toggleFavorite(state = initialState,action) {
    
    let nextState

    switch (action.type) {
        case 'TOGGLE_FAVORITE' :
            // recuperer l'index qui respecte la condition d'egalite pour verifier si un film fait deja parti des favorites
            // on check si l'id de l'item en cours est = action value id
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id == action.value.id)

            if (favoriteFilmIndex !== -1) {
                // suppression
                nextState = {
                    ...state,
                    favoritesFilm:state.favoritesFilm.filter( (item,index)=> index !== favoriteFilmIndex )
                }
            }else{
                // ajouter en favoris
                nextState = {
                    ...state,
                    favoritesFilm:[...state.favoritesFilm,action.value]
                }
            }
            return nextState || state
    
        default:
            return state
    }
}

export default toggleFavorite
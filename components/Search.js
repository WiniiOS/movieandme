import React from 'react'
import { View,Button,TextInput,FlatList,ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import getFilmsFromApiWithSearchedText from '../API/TMDBApi'
import {connect} from 'react-redux'


class Search extends React.Component {

    // On definit le state du component
    constructor(props){
        super(props)
        this.state = {
            films:[],
            isLoading:false
        }

        this.page = 0
        this.totalPages = 0
        this.searchedText = ""

        this._loadFilms = this._loadFilms.bind(this)
    }

    // methode pour naviguer vers la page detail du film
    // la prop navigation est auto ajouté par le component navigation
    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate('FilmDetail', {idFilm:idFilm})
    }


    _loadFilms(){
        
        this.setState({ isLoading:true })

        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText,this.page + 1 )
            .then(data => {
                    this.page = data.page //on prend le chiffre de la page recuperé sur l'api
                    this.totalPages = data.total_pages
                    this.setState({
                        films:[...this.state.films,...data.results], //on concatene les anciens et nouveaux films
                        isLoading:false
                    })
                }
            )
        }
    }

    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films:[]
        }, () => { this._loadFilms() } )
    }

    _searchedTextInputChanged(text){
        this.searchedText = text;
    }

    _displayLoading(){
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container} >
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    render(){
        // console.log(this.props.favoritesFilm);
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={ () => {this._searchFilms()} } onChangeText={(text)=> this._searchedTextInputChanged(text)} style={styles.textInput}  placeholder='Titre du film' />
                <Button style={{height:50}} title='Rechercher' onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
                    keyExtractor={ (item, index) => index.toString() }
                    onEndReachedThreshold={0.5}
                    onEndReached={()=> {
                        if (this.state.films.length > 0 && this.page < this.totalPages) {
                            this._loadFilms();
                        }
                    }}

                    renderItem={({item}) =>
                     <FilmItem 
                        film={item}
                        // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm} 
                    /> }

                />
                { this._displayLoading() }
            </View>
        )
    }
}


const styles = {
    main_container:{
        flex:1,
        // marginTop:40
    },
    textInput:{ 
        marginLeft:3,
        marginRight:3,
        marginBottom:1,
        height:50,
        borderColor:'#000000',
        borderWidth:1,
        paddingLeft:5
    },
    loading_container:{
        position:'absolute',
        left:0,
        right:0,
        top:100,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
    }
}


// connexion aux props du component
const mapStateToProps = (state) => {
    return {
      favoritesFilm:state.favoritesFilm
    }
}
    
export default connect(mapStateToProps)(Search)
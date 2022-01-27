import * as React from 'react';// Library react-navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

// Nos vues
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'

// creation du stack
const Stack = createStackNavigator();

// definition des pages
function searchStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search}  options={{ title: 'Recherches'}} />
            <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Détails' }} />
        </Stack.Navigator>
    );
}


// creation du stack pour favoris
const Stack2 = createStackNavigator();

// definition des pages
function favoritesStackScreen() {
    return (
        <Stack2.Navigator>
            <Stack2.Screen name="Favorites" component={Favorites}  options={{ title: 'Mes Favoris'}} />
            <Stack2.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Détails' }} />
        </Stack2.Navigator>
    );
}


// Creation du tab button
const Tab = createBottomTabNavigator();

function MoviesTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                  tabBarActiveBackgroundColor:'#DDDDDD',
                  tabBarInactiveBackgroundColor:'#FFF'
                }}
            >
            <Tab.Screen 
                name="searchStackScreen" 
                component={searchStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" size={24} color="#000" />
                    ),
                    tabBarShowLabel:false,
                    headerShown:false
                }}
            />
            <Tab.Screen 
                name="favoritesStackScreen" 
                component={favoritesStackScreen}
                options={{
                    tabBarIcon: ({ color,size }) => (
                        <FontAwesome name="heart" size={24} color="#000" />
                    ),
                    tabBarShowLabel:false,
                    tabBarShowLabel:false,
                    headerShown:false
                }}
            />
            
            </Tab.Navigator>
        </NavigationContainer> 
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})
  
export default MoviesTabNavigator

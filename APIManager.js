// ToDo : add frindes url to return all people one ,
//        pokemon const max num to use it 
const usersNum = 8
const ApiUrls = { 
    RandomUser : `https://randomuser.me/api/?format=json&results=8`,
    RandomQuote : "https://api.kanye.rest/",
    RandomPokemon: "https://pokeapi.co/api/v2/pokemon/",
    RandomAboutMe: "https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=json"
} 

class APIManager {
    constructor(url) {
        this.url = url
        this.data = ""
    }
    getApiResponse(){
        return  new  Promise ((resolve, reject) =>{  
                fetch(this.url)
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    }
                    throw new Error('Request failed');
                })
                .then(data => {
                    resolve(
                        this.data = data,
                    )
                }
                )
                .catch(error => {
                    reject(error);
                })
            });
    }
    getData (){
        return this.data
    }

}

class User{
    constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    getFirstName (){
        return this.firstName
    }
    getLastName(){
        return this.lastName
    }
}
class Peckomon {
    constructor(){
        this.name = ""
        this.urlPhoto = ""
    }
    getRandomPeckomonByApi(){
        const randomId = Math.floor(Math.random() * 980) + 1;
        const apiManger = new APIManager(ApiUrls.RandomPokemon+randomId) 
        apiManger.getApiResponse().then((data)=>{
            let pokemonName = data.name
            this.name = pokemonName.charAt(0).toUpperCase()+ pokemonName.substring(1)
            console.log(data )
            this.urlPhoto = data.sprites.other["official-artwork"].front_default
            console.log(data )
        })
    }
}
class Frinde extends User{
    constructor(firstName, lastName){
        super(firstName, lastName)
    }
}
//ToDo : add set function to all attributes 
class MainUser extends User{
    constructor(firstName, lastName, city, state){
        super(firstName, lastName)
        this.city = city
        this.state = state
        this.photoUrl = ""
        this.quote =  ""
        this.aboutMeText = ""
        this.frindes = []
        this.peckomon = new Peckomon()
    }
    getPhotoUrl(){
        return this.photoUrl
    }
    getAddress (){
        return this.city + ", " + this.state
    }
    setQuote(){
        const apiManger = new APIManager(ApiUrls.RandomQuote) 
        apiManger.getApiResponse().then((data)=>{
            this.quote = data.quote
        })
    }
    getQuote(){
        return this.quote 
    }
    setAboutMe(){
        const apiManger = new APIManager(ApiUrls.RandomAboutMe) 
        apiManger.getApiResponse().then((data)=>{
            this.aboutMeText = data[0]
            console.log(this.aboutMeText)
        })
    }
    getAboutMe (){
        return this.aboutMeText
    }
    setFrindes (frindesList){
        this.frindes =[]
        for(let i = 1; i < frindesList.length; i++){
            const userName = frindesList[i].name
            const friend = new Frinde (userName.first, userName.last)
            this.frindes.push(friend)}
    }
    getFrindes (){
        return this.frindes
    }
    getPokemon (){
        return this.peckomon
    }
    setByApi (){
        const apiManger = new APIManager(ApiUrls.RandomUser) 
        return Promise.all([this.setQuote(),this.setAboutMe(),this.peckomon.getRandomPeckomonByApi()])
                .then(() => apiManger.getApiResponse()
                    .then((response)=>{
                        const userName = response.results[0].name
                        this.firstName = userName.first
                        this.lastName = userName.last
                        this.city = response.results[0].location.city
                        this.state = response.results[0].location.state
                        this.photoUrl = response.results[0].picture.medium
                        this.setFrindes(apiManger.data.results) 
                    }))
        
                
                    
                
        
    }

}

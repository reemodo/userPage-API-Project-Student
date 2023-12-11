
//This is the class that will manage all your APIs
const ApiUrls = { 
    RandomUser : "https://randomuser.me/api/?format=json",
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
                    // console.log(data)
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
// module.exports = APIManager
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
    setByAPI(){
        const apiManger = new APIManager(ApiUrls.RandomUser) 
        return apiManger.getApiResponse()
                .then(()=>{
                    const userName = apiManger.data.results[0].name
                    this.firstName = userName.first
                    this.lastName = userName.last
                    })
                .then(()=>apiManger.getApiResponse())
    }
}
class Frinde extends User{
    constructor(){
        super()
    }
}

class MainUser extends User{
    constructor(firstName, lastName, city, state){
        super(firstName, lastName)
        this.city = city
        this.state = state
        this.photoUrl = ""
        this.quote =  ""
        this.aboutMeText = ""
        this.frindes = []
        this.Peckomon = ""
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
            console.log(this.quote )
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
    setFrindes (){
        for(let i = 1; i <= 7; i++){
        const frinde = new Frinde()
        frinde.setByAPI().then(() => this.frindes.push(frinde))}
                
        }
    getFrindes (){
        return this.frindes
    }
    setByApi (){
    return super.setByAPI().then((response) => {
        this.city = response.results[0].location.city
        this.state = response.results[0].location.state
        this.photoUrl = response.results[0].picture.medium
        this.setFrindes()
        this.setQuote()
        this.setAboutMe()
        this.Peckomon = new Peckomon()
    }).then(()=> super.setByAPI())
        
    }

}
class Peckomon {
    constructor(){
        this.name = ""
        this.urlPhoto = ""
        this.getRandomPeckomon()
    }
    getRandomPeckomon(){
        const randomId = Math.floor(Math.random() * 980) + 1;
        const apiManger = new APIManager(ApiUrls.RandomPokemon+randomId) 
        apiManger.getApiResponse().then((data)=>{
            this.name = data.name
            console.log(data )
            this.urlPhoto = data.sprites.other["official-artwork"].front_default
            console.log(data )
        })
    }
}
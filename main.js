const render = new Renderer()
const mainUser = new MainUser()
$(".buttons").on("click", "button", function(){
   const clickedButtonText= $(this).text()
   if (clickedButtonText === "Load User Data")
        loadUser()
    else if(clickedButtonText === "Save User")
        saveUser()
    else
        displayUser()
})

const displayUser = function(){
    mainUser.setByApi().then(() => render.renderPage(mainUser))
    }
    

const saveUser = function(){
    localStorage["MainUser"] = JSON.stringify(mainUser)
}
const loadUser = function(){
    let oldUser = JSON.parse(localStorage.MainUser)
    let currentUser = new MainUser(oldUser.firstName,oldUser.lastName)
        currentUser.city = oldUser.city
        currentUser.state = oldUser.state
        currentUser.photoUrl = oldUser.photoUrl
        currentUser.quote =  oldUser.quote
        currentUser.aboutMeText = oldUser.aboutMeText
        currentUser.frindes = oldUser.frindes
        currentUser.peckomon = new Peckomon ()
        currentUser.peckomon.name = oldUser.peckomon.name
        currentUser.peckomon.urlPhoto = oldUser.peckomon.urlPhoto
    render.renderPage( currentUser)
}
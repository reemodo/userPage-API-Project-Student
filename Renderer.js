// ToDo : create render function 
class Renderer {
    constructor(){

    } 
    renderFrindes(freindsList){
        this.removeElement('.friends-container')
        const source = $('#freindsList').html();
        const template = Handlebars.compile(source);
        const newHTML = template({freindsList});
        $('.friends-container').append(newHTML)
    }
    renderUser(user){
        this.removeElement('.user-container')
        const source = $('#userText').html();
        const template = Handlebars.compile(source);
        const newHTML = template(user);
        $('.user-container').append(newHTML)
    }
    renderQuote(quote){
        this.removeElement('.quote-container')
        const source = $('#userQuote').html();
        const template = Handlebars.compile(source);
        const newHTML = template({quote});
        $('.quote-container').append(newHTML)
    }
    renderAboutMe(text){
        this.removeElement('.meat-container')
        const source = $('#aboutMeText').html();
        const template = Handlebars.compile(source);
        const newHTML = template({text});
        $('.meat-container').append(newHTML)
    }
    renderPokemon(pokemon){
        this.removeElement('.pokemon-container')
        const source = $('#pokemon').html();
        const template = Handlebars.compile(source);
        const newHTML = template(pokemon);
        $('.pokemon-container').append(newHTML)
    }
    renderPage(mainUser){
        this.renderUser(mainUser)
        this.renderFrindes(mainUser.getFrindes())
        this.renderQuote(mainUser.getQuote())
        this.renderAboutMe(mainUser.getAboutMe())
        this.renderPokemon(mainUser.getPokemon())
    }
    removeElement(element){
        $(element).empty()
    }
}
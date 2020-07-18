
//jQuery IIFE
$(function(){
    /*----- constants -----*/
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';
    /*----- app's state (variables) -----*/
    let pokemon, pokemonDetail;
    /*----- cached element references -----*/
    const $ulEl = $('.collection');
    const $imgEl = $('.modal-content img');
    const $name = $('#name');
    const $moves = $('#moves');
    const $abilities = $('#abilities');
    const $height = $('#height');
    const $modal = $('.modal');
    /*----- event listeners -----*/
    $ulEl.on('click', 'span', handleClick);
    /*----- functions -----*/
    // initialize modal
    $modal.modal();
    const instance = M.Modal.getInstance($modal);
    function handleClick(event) {
        getPokemon(event.target.dataset.url, true);
    }
    // make the data available as soon as the app loads
    getPokemon();
    function getPokemon(detailURL, isDetail = false) {
        const url = detailURL || baseURL;
        $.ajax(url)
        .then(
        function(data) {
            if(!isDetail) {
                pokemon = data.results;
                render(); // programatically render the html
            } else {
                pokemonDetail = data;
                render(true);
            }
        }, function(error){
            console.log("Error: ", error);
        });
    }
    function generateHTML() {
        return pokemon.map(function(p) {
            return `
            <li class="collection-item red-text">
                <div style="text-transform: capitalize;">${p.name}
                    <span data-url="${p.url}" class="secondary-content blue-text">
                    Detail
                    </span>
                </div>
            </li>`;
        });
    }
    function render(isDetail = false) {
        if(!isDetail) {
            const html = generateHTML().join("");
            $ulEl.html(html)
        } else {
            // produce the modal
            $imgEl.attr('src', pokemonDetail.sprites.front_default);
            $imgEl.attr('alt', pokemonDetail.name);
            $name.text(pokemonDetail.name);
            $height.text("Height: " + pokemonDetail.height);
            $moves.text("Number of moves: " + pokemonDetail.moves.length);
            $abilities.text("Number of abilities: " + pokemonDetail.abilities.length);
            // open the modal
            instance.open();
        }
    }
});
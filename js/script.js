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
function getPokemon(detailURL, isDetail) {
    const url = detailURL || baseURL;
    $.ajax(url)
    .then(
       function(data) {
           if(!isDetail) {
               pokemon = data.results;
               render(); // programatically render the html
           } else {
               pokemonDetail = data;
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
function render() {
    const html = generateHTML().join("");
    $ulEl.html(html)
}
//form query input
const search_term = document.getElementById('search_q');
//search btn
const search_btn = document.getElementById('search-btn');

//main function - searches api for input in search_term
// async and await allow for this to happen without reloading the page
const getPokemonData = async (query) => {
  //fetch the url adding the input to the end of url as the 'query' - makes it lowercase
  const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
  const response = await fetch(url);

  //catch - if error display invalid pokemon input text to DOM
  if (response.status == 404 || response.statusText == 'Not Found') {
    document.getElementById('show_error').classList.add('show');
    document.getElementById('show_error').classList.remove('hidden');
    return;
    // else we will use json method to search through the api easily, pick then add the information to DOM
  } else {
    document.getElementById('show_error').classList.remove('show');
    document.getElementById('show_error').classList.add('hidden');

    const pokemon = await response.json();
    // prettier-ignore
    document.querySelector('#update_img').setAttribute('src', pokemon.sprites.other.home.front_default);
    // prettier-ignore
    document.querySelector('#update_name').innerHTML = pokemon.name;
    // prettier-ignore
    document.getElementById('update_hp').innerHTML = `HP ${Math.floor((Math.random() * pokemon.stats[0].base_stat) + 1)}/${pokemon.stats[0].base_stat}`
    // prettier-ignore
    document.querySelector('#update_cp').innerHTML = `XP ${pokemon.base_experience}`
    // prettier-ignore
    document.getElementById('update_ability').innerHTML = `${pokemon.abilities[0].ability.name}`
    // prettier-ignore
    document.getElementById('update_type').innerHTML = `${pokemon.types[0].type.name}`
    // prettier-ignore
    document.querySelector('#update_weight').innerHTML = `${pokemon.weight}kg`
    // prettier-ignore
    document.querySelector('#update_height').innerHTML = `${pokemon.height}m`
  }
};

// event listeners for click and 'Enter' key
search_btn.addEventListener('click', () => getPokemonData(search_term.value));

addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    getPokemonData(search_term.value);
  }
});

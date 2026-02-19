const lista = document.querySelector('.lista-spesa');

const input = document.querySelector('.input');

const bottone = document.querySelector('.button');


bottone.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value.trim() === '') return; // evita elementi vuoti
    let articolo = document.createElement("li");
    articolo.textContent = input.value;
    lista.appendChild(articolo);
    input.value = '';
})
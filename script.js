const lista = document.querySelector('.lista-spesa');
const input = document.querySelector('.input');
const bottone = document.querySelector('.button');

const STORAGE_KEY = 'listaSpesa';

// -------------------------------------------------------
// Ogni prodotto viene salvato come oggetto con due proprietà:
// - testo: il nome del prodotto
// - acquistato: true/false per lo stato barrato
// -------------------------------------------------------

function salvaNelLocalStorage() {
    const elementi = lista.querySelectorAll('li');
    const prodotti = [];

    elementi.forEach((li) => {
        prodotti.push({
            testo: li.dataset.testo,
            acquistato: li.dataset.acquistato === 'true'
        });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prodotti));
}

function creaElementoLista(testo, acquistato = false) {
    let articolo = document.createElement("li");
    articolo.dataset.testo = testo;
    articolo.dataset.acquistato = acquistato;

    let articoloDiv = document.createElement('div');
    articoloDiv.classList.add('articoloDiv');

    let articoloDivText = document.createElement("p");
    articoloDivText.classList.add('articoloDivText');
    articoloDivText.textContent = testo;

    // Ripristiniamo lo stile se l'articolo era già acquistato
    if (acquistato) {
        articoloDivText.style.textDecoration = "line-through";
        articoloDivText.style.color = "grey";
    }

    articoloDivText.addEventListener('click', (event) => {
        event.preventDefault();
        if (articoloDivText.style.color === 'grey') {
            articoloDivText.style.textDecoration = "none";
            articoloDivText.style.color = "#456967";
            articolo.dataset.acquistato = 'false';
        } else {
            articoloDivText.style.textDecoration = "line-through";
            articoloDivText.style.color = "grey";
            articolo.dataset.acquistato = 'true';
        }
        salvaNelLocalStorage(); // salviamo dopo ogni cambio di stato
    });

    articoloDiv.appendChild(articoloDivText);

    let articoloDivButton = document.createElement("button");
    articoloDivButton.classList.add('articoloDivButton');
    articoloDivButton.textContent = 'Rimuovi';

    articoloDivButton.addEventListener('click', (event) => {
        event.preventDefault();
        articolo.remove();
        salvaNelLocalStorage(); // salviamo dopo la rimozione
    });

    articoloDiv.appendChild(articoloDivButton);
    articolo.appendChild(articoloDiv);

    return articolo;
}

function caricaDalLocalStorage() {
    const datiSalvati = localStorage.getItem(STORAGE_KEY);
    if (datiSalvati === null) return;

    const prodotti = JSON.parse(datiSalvati);
    prodotti.forEach((prodotto) => {
        const elemento = creaElementoLista(prodotto.testo, prodotto.acquistato);
        lista.appendChild(elemento);
    });
}

bottone.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value.trim() === '') return;

    const elemento = creaElementoLista(input.value.trim());
    lista.appendChild(elemento);
    salvaNelLocalStorage(); // salviamo dopo l'aggiunta

    input.value = '';
});

// Avvio
caricaDalLocalStorage();
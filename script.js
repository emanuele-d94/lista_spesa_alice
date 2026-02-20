const lista = document.querySelector('.lista-spesa');

const input = document.querySelector('.input');

const bottone = document.querySelector('.button');


bottone.addEventListener('click', (event) => {
    event.preventDefault();

    if (input.value.trim() === '') return; // evita elementi vuoti

    let articolo = document.createElement("li");

    let articoloDiv = document.createElement('div')
    articoloDiv.classList.add('articoloDiv');

    let articoloDivText = document.createElement("p");
    articoloDivText.classList.add('articoloDivText');
    articoloDivText.textContent = input.value;

    articoloDivText.addEventListener('click', (event) => {
        event.preventDefault();
        // Articolo acquistato viene barrato
        if(articoloDivText.style.color === 'grey'){
            articoloDivText.style.textDecoration = "none";
            articoloDivText.style.color = "#456967"
        } else {
            articoloDivText.style.textDecoration = "line-through";
            articoloDivText.style.color = "grey";
        }
    })

    articoloDiv.appendChild(articoloDivText);


    let articoloDivButton = document.createElement("button");
    articoloDivButton.classList.add('articoloDivButton');
    articoloDivButton.textContent = 'Rimuovi'

    articoloDivButton.addEventListener('click', (event) => {
        //Rimuovi articolo
        event.preventDefault();
        articolo.remove()
    })

    articoloDiv.appendChild(articoloDivButton);


    articolo.appendChild(articoloDiv);

    lista.appendChild(articolo);
    input.value = '';
})


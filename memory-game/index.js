const cards = document.querySelectorAll('.card');
let firstCard;
let secondCard;
let hasFlippedCard = false;
let lockThirdCard = false;
let best = [];
let score = document.querySelector('.score');
let res = document.querySelectorAll('.res');
let newGame = document.querySelector('.clear');
let game = document.querySelector('.game');
let count = 0;
let gameEnd = false;

function flip(){
    if(lockThirdCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkFor();
}
function checkFor(){
    if (firstCard.dataset.card === secondCard.dataset.card){
        dissable();
        return;
    }
    unFlip();
}
function dissable(){
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    reset();
}
function unFlip(){
    lockThirdCard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
    },800);
}
function reset (){
    [hasFlippedCard, lockThirdCard] = [false, false];
    [firstCard, secondCard] = [null,null];
}
(function shuffle(){
    cards.forEach(card =>{
        let randomGame = Math.floor(Math.random() *16);
        card.style.order = randomGame;
    });
})();
cards.forEach(card => card.addEventListener('click', flip));

function start(){
    setTimeout(unShow,1000);
    setTimeout(showCards,16);
        function showCards(){
        cards.forEach(a => a.classList.add('flip'));
            shuffle();
            score.classList.remove('show')
            newGame.classList.remove('clearA')
            cards.forEach(a=> a.addEventListener('click',flip))
    };
    function unShow() {
        cards.forEach(a=> a.classList.remove('flip') );
    };
    function shuffle(){
        cards.forEach(card =>{
            let randomGame = Math.floor(Math.random() *16);
            card.style.order = randomGame;
        });
    }
}
document.addEventListener('click',(event) =>{
    if(event.target.classList.contains('scores')){
    score.classList.toggle('show')}
}
)

function saveScore(){
    for(let i = 0;i<best.length;i++) {
    res[i].textContent = best[i]
    }
}
newGame.addEventListener('click', start)
cards.forEach(card => card.addEventListener('click', flip))
function setLocalstorage(){
    localStorage.setItem ('score', best)
}
window.addEventListener('beforeunload',setLocalstorage);

function getLocalStorage(){
    if(localStorage.getItem('score')){
        best=localStorage.getItem('score')
        saveScore()
    }
}
window.addEventListener('load',getLocalStorage)

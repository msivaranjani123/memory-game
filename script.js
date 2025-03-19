document.addEventListener("DOMContentLoaded", function() {
    // మీ కోడ్ ఇక్కడ రాయండి
    let cards = [];
        let flippedCards = [];
        let score = 0;
        let timer = null;
        let timeunits = 0;
        let attempts = 0;
        let level = 'easy'; 

      
        const levels = {
            easy: 8,
            medium: 12,
            hard: 16
        };

        const emojis = ['🐶', '💜', '😘', '🦊', '🐼', '🤡','🍒','🍎'];

     
        function initializeGame() {
            score = 0;
            timeunits = 0;
            attempts = 0;
            flippedCards = [];
            clearInterval(timer);
            document.getElementById('score').innerText = `Score: ${score}`;
            document.getElementById('timing').innerText = `Time: ${timeunits}s`;
            document.getElementById('attempts').innerText = `Attempts: ${attempts}`;

            
            const numberOfPairs = levels[level];
            const selectedEmojis = emojis.slice(0, numberOfPairs / 2);
            cards = [...selectedEmojis, ...selectedEmojis]; //
            cards.sort(() => Math.random() - 0.5); 

            const main = document.querySelector('.main');
            main.innerHTML = '';

            cards.forEach(emoji => {
                const box = document.createElement('div');
                box.classList.add('box');
                box.innerHTML = `
                    <div class="card">
                        <div class="front">❓</div>
                        <div class="back">${emoji}</div>
                    </div>
                `;
                main.appendChild(box);
            });

           
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', flipCard);
            });
        }

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.classList.add('flipped');
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    attempts++;
                    document.getElementById('attempts').innerText = `Attempts: ${attempts}`;
                    setTimeout(checkMatch, 1000);
                }
            }
        }

       
        // function checkMatch() {
        //     const [card1, card2] = flippedCards;
        //     const emoji1 = card1.querySelector('.back').innerText;
        //     const emoji2 = card2.querySelector('.back').innerText;

        //     if (emoji1 === emoji2) {
        //         score++;
        //         document.getElementById('score').innerText = `Score: ${score}`;
        //     } else {
        //         card1.classList.remove('flipped');
        //         card2.classList.remove('flipped');
        //     }

        //     flippedCards = []; 

         
        //     if (score === cards.length / 2) {
        //         clearInterval(timer);
        //         alert(`You won! Time: ${timeunits}s, Attempts: ${attempts}`);
        //     }
        // }
         function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.back').innerText;
    const emoji2 = card2.querySelector('.back').innerText;

    if (emoji1 === emoji2) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = []; 

    // **Game win condition**
    if (score === cards.length / 2) {
        clearInterval(timer);
        displayWinMessage();  // Display win message instead of alert
    }
}


    function displayWinMessage() {
    const main = document.querySelector('.main');
    main.innerHTML = `
        <div class="win-message">
            🎉 <span>You Won!</span> 🎉
        </div>
    `;
}

       
        function startTimer() {
            timer = setInterval(() => {
                timeunits++;
                document.getElementById('timing').innerText = `Time: ${timeunits}s`;
            }, 1000);
        }

        
        document.getElementById('easy').addEventListener('click', () => {
            level = 'easy';
            initializeGame();
        });
        document.getElementById('medium').addEventListener('click', () => {
            level = 'medium';
            initializeGame();
        });
        document.getElementById('hard').addEventListener('click', () => {
            level = 'hard';
            initializeGame();
        });

      
        document.getElementById('start_game').addEventListener('click', () => {
            initializeGame();
            startTimer();
        });
     
});


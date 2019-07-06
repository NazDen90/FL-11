const TWO = 2;
const THREE = 3;
const FOUR = 4;
let play = confirm('Do you want to play a game?');
while (play) {
    let totalPrize = 0;
    let maxPrize = 100;
    let maxPocketNumber = 8;
    let attempts = 3;
    let currentPrize = maxPrize;
    let randomNumber = Math.round(Math.random() * maxPocketNumber);
    while (0 < attempts) {
        let pocketNumber = prompt(`Choose a roulette pocket number from 0 to ${maxPocketNumber}:
Attempts left: ${attempts}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${currentPrize}$`);
        attempts--;
        if (pocketNumber !== null && pocketNumber !== '' && randomNumber === +pocketNumber) {
            totalPrize += currentPrize;
            play = confirm(`Congratulation, you won! Your prize is: ${currentPrize}$. Do you want to continue?`);
            if (play) {
                maxPrize *= TWO;
                currentPrize = maxPrize;
                maxPocketNumber += FOUR;
                attempts = THREE;
                randomNumber = Math.round(Math.random() * maxPocketNumber);
            } else {
                break;
            }
        } else {
            currentPrize /= TWO;
        }
    }
    alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
    play = confirm('Do you want to play again?');
}
alert('You did not become a billionaire, but can.');

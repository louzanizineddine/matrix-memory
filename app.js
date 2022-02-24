class MatrixGame {
    constructor() {
        this.level = 5;
        this.clickedSquares = [];
        this.correctSquares = [];
        this.allowUserToclick = false;
        this.gameDom = document.querySelector('.game');
        this.playAgainBtn = document.querySelector('.play-again');
        this.nextLevelBtn = document.querySelector('.next-level');
    }
    // a function to build the matrix 
    fillMatrix(level) {
        while(this.correctSquares.length < level){
            let randomNumber = Math.floor(Math.random() * Math.pow(level + 2 , 2));
            if (!this.correctSquares.includes(randomNumber)) this.correctSquares.push(randomNumber)
        }
        this.correctSquares.forEach(el => {
            console.log(document.querySelector(`.cell-${el}`))
            document.querySelector(`.cell-${el}`).classList.add('active');
        })
        // setTimeout( () => {
        //     this.hideColorfulSquares()
        // }  , 3000);
    }

    // we hide the colorful squres 

    hideColorfulSquares() {
        let colorfulSquares = document.querySelectorAll('.active');
        colorfulSquares.forEach(square => {
            square.classList.remove('active');
        })
        this.allowUserToclick = true;
        // if (this.allowUserToclick){
        //     this.userChoice()
        // }
    }

    userChoice() {
        this.gameDom.addEventListener(('click') , (e) => {
            if (this.clickedSquares.length < this.level) {
                e.preventDefault();
                e.target.classList.add('clicked-square');
                this.clickedSquares.push(Number(e.target.dataset.indexNumber));
            } else {
                this.evaluateUserClicks()
            }
        })
    }

    evaluateUserClicks() {
        for (let elem of this.clickedSquares) {
            console.log(elem)
            if (this.correctSquares.includes(elem)) {
                this.showCorrectAnswer(elem)
            } else {
                this.showWrongAnswer(elem)
            }
        } 
        for (let elem of this.correctSquares) {
            this.showCorrectAnswer(elem);
        }

        this.updateLevel();
    }

    updateLevel() {
        if (document.querySelectorAll('correct').length === this.level) {
            this.level++;
            this.nextLevelBtn.classList.remove('d-none');
            this.nextLevelBtn.addEventListener('click' , (e) => {
                e.preventDefault();
                this.nextLevelBtn.classList.add('d-none');
                this.clearTheGame()
                // this.buildMatrix(this.level)
            })
        }   

        else {
            this.playAgainBtn.classList.remove('d-none');
            this.playAgainBtn.addEventListener('click' , (e) => {
                e.preventDefault();
                this.playAgainBtn.classList.add('d-none');
                this.clearTheGame()
                // this.buildMatrix(this.level)
            })
        }
    }

    clearTheGame() {
        while (this.gameDom.firstChild) {
            this.gameDom.firstChild.remove()
            console.log('something node is removed')
        }
    }

    showWrongAnswer(index) {
        const squareElem = document.querySelector(`.cell-${index}`);
        squareElem.classList.add('wrong');
    }

    showCorrectAnswer(index) {
        const squareElem = document.querySelector(`.cell-${index}`);
        squareElem.classList.add('correct');
    }

    buildMatrix(level) {
        console.log('hey am been called again')
        let index = 1;
        for (let i = 0; i < level + 2; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            this.gameDom.appendChild(row);
            for (let j = 0; j < level + 2; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell'
                cell.classList.add(`cell-${index}`);
                cell.dataset.indexNumber = index;
                // cell.textContent = `${index}`;
                row.appendChild(cell);
                index++;
            }
        }
        // this.fillMatrix(this.level)
    }
}

const a = new MatrixGame()
a.buildMatrix(a.level)
a.fillMatrix(a.level)
setTimeout( () => {
    this.hideColorfulSquares()
}  , 3000);

if (a.allowUserToclick){
    a.userChoice()
}
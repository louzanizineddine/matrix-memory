class MatrixGame {
    constructor() {
        this.level = 5;
        this.score = 0;
        this.clickedSquares = [];
        this.correctSquares = [];
        this.allowUserToclick = true;
        this.gameDom = document.querySelector('.game');
    }

    fillMatrix(level) {
        while(this.correctSquares.length < level){
            let randomNumber = Math.floor(Math.random() * Math.pow(level + 2 , 2));
            if (!this.correctSquares.includes(randomNumber)) this.correctSquares.push(randomNumber)
        }
        this.correctSquares.forEach(el => {
            console.log(document.querySelector(`.cell-${el}`))
            document.querySelector(`.cell-${el}`).classList.add('active');
        })

        setTimeout(this.hideColorfulSquares  , 3000)
    }

    hideColorfulSquares() {
        let colorfulSquares = document.querySelectorAll('.active');
        colorfulSquares.forEach(square => {
            square.classList.remove('active');
        })
        this.allowUserToclick = true;
        console.log(this.gameDom , this.level)
        this.gameDom.addEventListener('click' , (e) => {
            if(this.allowUserToclick && (this.clickedSquares.length < this.level)) this.userChoice(e)
        });
    }

    userChoice(event) {
               event.target.classList.add('clicked-square')
                this.clickedSquares.push(event.target)
                console.log(this.clickedSquares)
    }

    buildMatrix(level) {
        let index = 1;
        for (let i = 0; i < level + 2; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            this.gameDom.appendChild(row);
            for (let j = 0; j < level + 2; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell'
                cell.classList.add(`cell-${index}`);
                // cell.textContent = `${index}`;
                row.appendChild(cell);
                index++;
            }
        }
        this.fillMatrix(this.level)
    }
}

const a = new MatrixGame()
a.buildMatrix(a.level)
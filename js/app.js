const style = require("../css/style.css");

class Tictactoe {
    constructor(n) {
        this.n = n;
        this.draw(n);
        this.reset();
    }

    reset() {
        this.curPlayer = 'O';
        this.rows = new Array(this.n).fill(0);
        this.cols = new Array(this.n).fill(0);
        this.diag = 0;
        this.adiag = 0;
        this.totalMoves = 0;
        this.isGameOver = false;

        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.innerText = "";
        }

        const message = document.getElementById('message');
        message.innerText = "";
    }

    draw(n) {
        const appElem = document.getElementById('app');
        
        for (let j = 0;j < n*n;j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell-' + j;
            appElem.appendChild(cell);
        }

        appElem.addEventListener("click", (event) => this.move.call(this, event));
        document.getElementById("resetBtn").addEventListener("click", this.reset.bind(this));
    }

    move(event) {
        if (this.isGameOver) return;
        let toAdd = this.curPlayer === 'O' ? -1 : 1;
        const id = event.target.id.split("-")[1];
        const [r, c] = [Math.floor(id/3), id%3];

        const cell = document.getElementById('cell-' + id);
        cell.innerText = this.curPlayer === 'O' ? "O" : "X";

        this.rows[r] += toAdd;
        this.cols[c] += toAdd;
        if (r === c) this.diag += toAdd;
        if (["2", "4", "6"].includes(id)) this.adiag += toAdd;
        this.totalMoves++;

        const message = document.getElementById('message');
        if (Math.abs(this.rows[r]) === this.n ||
            Math.abs(this.cols[c]) === this.n ||
            Math.abs(this.diag) === this.n ||
            Math.abs(this.adiag) === this.n) {
            message.innerText = `Player ${this.curPlayer === "O" ? 1 : 2} wins!`;
            this.isGameOver = true;
        }
            
        if (this.totalMoves === this.n*this.n-1) {
            this.isGameOver = true;
            message.innerText = `Nobody wins!`;
        }

        this.curPlayer = this.curPlayer === "O" ? "X" : "O";
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    let t = new Tictactoe(3);
});
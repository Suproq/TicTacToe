let cros = true;
let lastNumField;
let motions = 0;
let field = new Array(9);
let crosses = document.getElementsByClassName('cross');
let circles = document.getElementsByClassName('circle');
let winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
console.debug(field);
function checkIsWin(playerIdx) {
    for (const winPosition of winPositions) {
        let isWin = true;

        for (const cell of winPosition) {
            isWin = isWin && field[cell] == playerIdx;// === players[playerIdx].symbol;
        }

        if (isWin) {
            return true;
        }
    }

    return false;
}
function reset(sbros) {
    let conf = true;
    if (sbros) {
        conf = confirm("Вы уверены, что хотите сбросить игру?");
    }
    if (conf) {
        for (let i = 0; i < 9; i++) {
            field[i] = null;
            crosses[i].style.display = 'none';
            circles[i].style.display = 'none';
        }
        motions = 0;
        cros = true;
    }
}
function motion(numField) {
    if (field[numField] == null) {
        lastNumField = numField;
        motions++;
        if (cros) {
            crosses[numField].style.display = 'block';
            cros = false;
            field[numField] = 1;
            if (checkIsWin(1)) {
                alert("Игрок 1(крестики) выиграл");
                reset(false);
            }
        }
        else {
            circles[numField].style.display = 'block';
            cros = true;
            field[numField] = 2;
            if (checkIsWin(2)) {
                alert("Игрок 2(нолики) выиграл");
                reset(false);
            }
        }
        if (motions == 9) {
            alert("Ничья");
            reset(false);
        }
    }
}

function cancel() {
    if (lastNumField == null) {
        alert("Ходов еще не было");
    }
    else if (lastNumField == 10) {
        alert("Нельзя два раза подряд отменять ход");
    }
    else {
        field[lastNumField] = null;
        crosses[lastNumField].style.display = 'none';
        circles[lastNumField].style.display = 'none';
        motions--;
        cros = cros ? false : true;
        lastNumField = 10;
    }
}
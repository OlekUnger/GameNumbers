// document.addEventListener("DOMSubtreeModified", function() {
//     alert("DOMSubtreeModified fired!");
// }, false);
//
// MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//
// var observer = new MutationObserver(function(mutations, observer) {
//     // fired when a mutation occurs
//     console.log(mutations, observer);
//     // ...
// });
//
// // define what element should be observed by the observer
// // and what types of mutations trigger the callback
// observer.observe(document, {
//     subtree: true,
//     attributes: true
//     //...
// });

let field = document.querySelector('.field'),
    container = document.getElementById('container'),
    playField = document.getElementById('playField'),

    arrFirst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9],
    rows = [],
    len = arrFirst.length;


while (len > 0) {
    var row = arrFirst.splice(0, 9);
    rows.push(row);
    len -= 9;
}
function render(){

field.innerHTML = '';
let fragmentRows = document.createDocumentFragment();

for (let i = 0; i < rows.length; i++) {
    let fragmentCells = document.createDocumentFragment();
    let row = document.createElement('DIV');
    row.classList.add('row');

    for (let j = 0; j < rows[i].length; j++) {
        let cell = document.createElement('DIV');
        cell.classList.add('cell');
        cell.setAttribute('id', `${i}.${j}.${rows[i][j]}`);
        cell.innerHTML = rows[i][j];
        fragmentCells.appendChild(cell);
    }
    row.appendChild(fragmentCells);
    fragmentCells = null;
    fragmentRows.appendChild(row);
}
field.appendChild(fragmentRows);
fragmentRows = null;
}
render();


window.onload = function () {
    var removed = [];

    field.addEventListener('click',(e)=>{
        let id = e.target.id,
            [row, ind, value] = id.split('.');

        removed.push({id, row, ind, value});
        e.target.classList.add('gray');

        if (removed.length > 2) {
            removed = removed.splice(2, 1);
        }


        if (removed.length === 2) {
            let valid = validate(removed);
            console.log('valid ',valid)
//
            if (!valid) {
                for(let item of removed) {
                    document.getElementById(item.id).classList.remove('gray');
                }
            } else {
                for(let item of removed){
                    rows[item.row][item.ind] = 0;
                }
                render();
                // сделать тут сохранение в localStorage
            }
        }
    })
};


//тут будет проверка на валидность выбора

function validate(arr) {
    let valid = false;

    let [first, second] = arr,
        [ ,firstRow, firstInd, firstValue ] = Array.from(Object.values(first), (value)=>parseInt(value)),
        [ ,secondRow, secondInd, secondValue ] = Array.from(Object.values(second), (value)=>parseInt(value));

    //если цифры одинаковые
    if (firstValue === secondValue || (firstValue + secondValue === 10)) {

        // // если выбранные цифрв находятся в одной строке
        if (firstRow === secondRow) {

            let asd = rows[firstRow];
            // если цифры рядом
            if (Math.abs(firstInd - secondInd) === 1) {
                valid = true;
            } else {
                for (let i = firstInd + 1; i < secondInd; i++) {
                    if (asd[i] !== 0) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        //в разных строках
        else {
           // если цифры друг под другом
            if(firstInd === secondInd) {

                // рядом
                if (Math.abs(firstRow - secondRow) === 1) {
                    valid = true;
                } else {
                    for( let i = firstRow + 1; i < secondRow; i ++){
                        let asd = rows[i][firstInd];
                        if (asd[i] !== 0) {
                            valid = false;
                            break;
                        }
                    }
                }
            } else {
                let asd = [].concat(rows[firstRow].slice(firstInd+1,rows[firstRow].length-firstInd))
                    .concat(rows[secondRow].slice(0, secondInd));
                // console.log('row1 ',asd)
                if(Math.abs(firstRow - secondRow) > 1) {
                    valid = true;
                    for(let i = firstRow + 1; i < secondRow; i++){
                        if(rows[i].some(item=>item > 0)){
                            valid = false;
                            break;
                        }
                    }
                }

                if (Math.abs(firstRow - secondRow) === 1) {
                    if (asd.every(item => item === 0)) {
                        valid = true;
                    }
                }
            }

        }
    }

    return valid;
}
//
// //проверка на имеющиеся совпдения
// function checkExist(){
//     // по горизонтали рядом
//     for(let row of rows)
//     // по вертикали рядом
//     // по горизонтали через несколько
//     // по вертикали через несколько
//
// }


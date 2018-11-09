//с использованием вложенных map

let field = document.querySelector('.field'),
    container = document.getElementById('container'),
    playField = document.getElementById('playField'),
    btnAdd = document.getElementById('btnAdd'),
    btnRestart = document.getElementById('btnRestart'),
    btnBack = document.getElementById('btnBack');

const initialArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9];
// const initialArr = [2,0,4,5,6,7,0,0,9,1,0,0,1,3,0,0,0,5,0,0,0,7,1,0,0,0,0,3,0,0,0,0,0,0,0,4,5,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,3,4,5,0,0,0,0,0,0,1,3,4,5,0,0,0,0,6,7,1,1,8,2,4,5,6,7,1,3,5,7,1,3,4,5,1,3,5,1,3,4,5,1,3,4,5,6,7,1,8];
let actualArr = [].concat(initialArr);
let map = new Map();
let removed = [];

field.addEventListener('click', (e) => {
    deleteNums(e);
});
btnRestart.addEventListener('click', createNew);


function madeRows(arr) {
    let rows = [],
        len = arr.length,
        count = 0,
        m = new Map();

    while (len >0) {
        let asd = new Map();
        let row = arr.splice(0, 9);

        if (!row.every(item => item === 0)) {
            rows.push(row);
        }

        for(let j = 0; j < row.length; j++){
            let id = `${count}.${j}.${row[j]}`;
            asd.set(id, {id: id, row: count, ind: j, value: row[j]})
        }
        m.set(count, asd);
        len -= 9;
        count++;
    }

    return m;
}


render(actualArr);


function render(arr) {
    map = madeRows(arr);

    field.innerHTML = '';
    let fragmentRows = document.createDocumentFragment(),
        size = map.size;

    for (let i = 0; i < size; i++) {

        let fragmentCells = document.createDocumentFragment(),
            row = document.createElement('DIV'),
            item = map.get(i),
            keys = [...item.keys()];

        row.classList.add('row');
        row.setAttribute('id', i);

        for (let j = 0; j < keys.length; j++) {
            let asd = item.get(keys[j]);
            let cell = document.createElement('DIV');

            cell.classList.add('cell');
            cell.setAttribute('id', asd.id);
            if (asd.value === 0) cell.classList.add('deleted');
            cell.innerHTML = asd.value;
            fragmentCells.appendChild(cell);
        }
        row.appendChild(fragmentCells);
        fragmentCells = null;
        fragmentRows.appendChild(row);
    }
    field.appendChild(fragmentRows);
    fragmentRows = null;
}

function createNew() {
    actualArr = [].concat(initialArr);
    render(actualArr);

}
console.log(map)

function deleteNums(e) {
    if (!e.target.classList.contains('cell')) return;
    if (e.target.classList.contains('deleted')) return;

    let id = +e.target.id,
        rowId = +e.target.parentNode.id;

    removed.push(map.get(rowId).get(id));
    e.target.classList.add('gray');

    if (removed.length > 2) {
        removed = removed.splice(2, 1);
    }
    let first = removed[0],
        second = removed[1];

    if (removed.length === 2) {
        if (first.id === second.id) {
            removed.shift();
            return;
        }
        if (first.row >= second.row && first.ind > second.ind) {
            removed.reverse();
        }
        if (first.row > second.row) {
            removed.reverse();
        }

        let valid = validate(first.id, second.id);

        // if (valid) {
        //     for (let item of removed) {
        //         let cell = document.getElementById(item.id);
        //
        //         cell.classList.add('deleted');
        //         Rows[item.row][item.ind] = 0;
        //     }
        //     turnsArr.push(removed);
        //     counter += 1;
        // }
        //
        // for (let item of removed) {
        //     let r = document.getElementById(item.row);
        //
        //     document.getElementById(item.id).classList.remove('gray');
        //
        //     if (checkEmptyRow(Rows[item.row])) {
        //         r.classList.add('hidden');
        //     }
        // }
    }
}

function validate(arr) {
    let valid = false;

    let first = map.get(arr[0]),
        second = map.get(arr[1]);

    console.log(first, second)

    // let [first, second] = arr,
    //     [, firstRow, firstInd, firstValue] = Array.from(Object.values(first)),
    //     [, secondRow, secondInd, secondValue] = Array.from(Object.values(second));
    //
    // //если цифры одинаковые
    // if (firstValue === secondValue || (firstValue + secondValue === 10)) {
    //
    //     // // если выбранные цифрв находятся в одной строке
    //     if (firstRow === secondRow) {
    //
    //         let asd = Rows[firstRow];
    //         // если цифры рядом
    //         if (Math.abs(firstInd - secondInd) === 1) {
    //             valid = true;
    //         } else {
    //             valid = true;
    //             for (let i = firstInd + 1; i < secondInd; i++) {
    //                 if (asd[i] !== 0) {
    //                     valid = false;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     //в разных строках
    //     else {
    //         // если цифры друг под другом
    //         if (firstInd === secondInd) {
    //
    //             // рядом
    //             if (Math.abs(firstRow - secondRow) === 1) {
    //                 valid = true;
    //             } else {
    //                 valid = true;
    //                 for (let i = firstRow + 1; i < secondRow; i++) {
    //                     let asd = Rows[i][firstInd];
    //                     if (asd !== 0) {
    //                         valid = false;
    //                         break;
    //                     }
    //                 }
    //             }
    //         } else {
    //             let asd = [].concat(Rows[firstRow].slice(firstInd + 1, Rows[firstRow].length - firstInd))
    //                 .concat(Rows[secondRow].slice(0, secondInd));
    //
    //             if (Math.abs(firstRow - secondRow) > 1) {
    //                 valid = true;
    //                 for (let i = firstRow + 1; i < secondRow; i++) {
    //                     if (Rows[i].some(item => item > 0)) {
    //                         valid = false;
    //                         break;
    //                     }
    //                 }
    //             }
    //
    //             if (Math.abs(firstRow - secondRow) === 1) {
    //                 if (asd.every(item => item === 0)) {
    //                     valid = true;
    //                 }
    //             }
    //         }
    //
    //     }
    // }

    return valid;
}











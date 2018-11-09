// с использованием одномерного map

let field = document.querySelector('.field'),
    container = document.getElementById('container'),
    playField = document.getElementById('playField'),
    btnAdd = document.getElementById('btnAdd'),
    btnRestart = document.getElementById('btnRestart'),
    btnBack = document.getElementById('btnBack');

const initialArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9];
// const initialArr = [2,0,4,5,6,7,0,0,9,1,0,0,1,3,0,0,0,5,0,0,0,7,1,0,0,0,0,3,0,0,0,0,0,0,0,4,5,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,3,4,5,0,0,0,0,0,0,1,3,4,5,0,0,0,0,6,7,1,1,8,2,4,5,6,7,1,3,5,7,1,3,4,5,1,3,5,1,3,4,5,1,3,4,5,6,7,1,8];
let actualArr = [].concat(initialArr);
let map = [];

let removed = [];

field.addEventListener('click', (e) => {
    deleteNums(e);
});

function madeRows(arr) {
    let rows = [],
        count = 0,
        len = arr.length,
        asd = [];

    while (len >0) {
        let row = arr.splice(0, 9);

        if (!row.every(item => item === 0)) {
            rows.push(row);
        }

        for(let j = 0; j < row.length; j++){
            let id = `${count}.${j}.${row[j]}`;
            asd.push({id: id, row: count, ind: j, value: row[j]});

        }

        len -= 9;
        count++;
    }

    return asd;
}


function render(arr) {
    map = madeRows(arr);

    field.innerHTML = '';
    let fragmentRows = document.createDocumentFragment(),
        size = map.length/9;

    for (let i = 0; i < size; i++) {
        let fragmentCells = document.createDocumentFragment(),
            row = document.createElement('DIV'),
            keys = map.filter(item=>item.row == i);

        row.classList.add('row');
        row.setAttribute('id', i);

        for (let j = 0; j < keys.length; j++) {
            let cell = document.createElement('DIV'),
                item = keys[j];

            cell.classList.add('cell');
            cell.setAttribute('id', item.id);
            if (item.value === 0) cell.classList.add('deleted');
            cell.innerHTML = item.value;
            fragmentCells.appendChild(cell);
        }
        row.appendChild(fragmentCells);
        fragmentCells = null;
        fragmentRows.appendChild(row);
    }
    field.appendChild(fragmentRows);
    fragmentRows = null;
}

render(actualArr);

function deleteNums(e) {
    if (!e.target.classList.contains('cell')) return;
    if (e.target.classList.contains('deleted')) return;

    let id = e.target.id;
    e.target.classList.add('gray')

    removed.push(map[1]);
    console.log(removed)

//
//     if (removed.length > 2) {
//         removed = removed.splice(2, 1);
//     }
//
//     let first = removed[0],
//         second = removed[1];
//
//     if (removed.length === 2) {
//         if (first.id === second.id) {
//             removed.splice(1, 1);
//             return;
//         }
//         if ((first.row >= first.row && first.ind > second.ind) || (first.row > second.row)) {
//             removed.reverse();
//         }
//
//         let valid = validate(removed);
//         //
//         //     if (valid) {
//         //         for (let item of removed) {
//         //             let cell = document.getElementById(item.id);
//         //
//         //             cell.classList.add('deleted');
//         //             Rows[item.row][item.ind] = 0;
//         //         }
//         //         turnsArr.push(removed);
//         //         counter += 1;
//         //     }
//         //
//         //     for (let item of removed) {
//         //         let r = document.getElementById(item.row);
//         //
//         //         document.getElementById(item.id).classList.remove('gray');
//         //
//         //         if (checkEmptyRow(Rows[item.row])) {
//         //             r.classList.add('hidden');
//         //         }
//         //     }
//     }
}
//
// function validate(arr) {
//     let valid = false;
//
//
//     let searchMap = [...map.values()],
//         [first, second] = arr,
//         [, firstRow, firstInd, firstValue] = [...Object.values(first)],
//         [, secondRow, secondInd, secondValue] = [...Object.values(second)];
//
//
//
//     // //если цифры одинаковые
//     if (firstValue === secondValue || (firstValue + secondValue === 10)) {
//         //поиск в строках в одной или разных
//         // for(let item of map){
//         //     if(item.value ===firstValue){
//         //         console.log(item)
//         //     }
//         //
//         // }
//
//     }
//
//     return valid;
// }
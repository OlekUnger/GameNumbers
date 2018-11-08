let field = document.querySelector('.field'),
    container = document.getElementById('container'),
    playField = document.getElementById('playField'),
    btnAdd = document.getElementById('btnAdd'),
    btnRestart = document.getElementById('btnRestart'),
    btnBack = document.getElementById('btnBack');
console.time('asd')
const initialArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9];
// const initialArr = [2,0,4,5,6,7,0,0,9,1,0,0,1,3,0,0,0,5,0,0,0,7,1,0,0,0,0,3,0,0,0,0,0,0,0,4,5,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,1,0,0,3,4,5,0,0,0,0,0,0,1,3,4,5,0,0,0,0,6,7,1,1,8,2,4,5,6,7,1,3,5,7,1,3,4,5,1,3,5,1,3,4,5,1,3,4,5,6,7,1,8];
let actualArr = [].concat(initialArr);
let map = new Map();

// field.addEventListener('click', (e) => {
//     deleteNums(e);
// });
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

function deleteNums(e) {
    if (!e.target.classList.contains('cell')) return;
    if (e.target.classList.contains('deleted')) return;

    let id = e.target.id;

    let item
        // [row, ind, value] = id.split('.').map(item => parseInt(item));

    // removed.push({id, row, ind, value});
    // e.target.classList.add('gray');
    //
    // if (removed.length > 2) {
    //     removed = removed.splice(2, 1);
    // }
    //
    // if (removed.length === 2) {
    //     if (removed[0].id === removed[1].id) {
    //         removed.splice(1, 1);
    //         return;
    //     }
    //     if (removed[0].row >= removed[1].row && removed[0].ind > removed[1].ind) {
    //         removed.reverse();
    //     }
    //     if (removed[0].row > removed[1].row) {
    //         removed.reverse();
    //     }
    //
    //     let valid = validate(removed);
    //
    //     if (valid) {
    //         for (let item of removed) {
    //             let cell = document.getElementById(item.id);
    //
    //             cell.classList.add('deleted');
    //             Rows[item.row][item.ind] = 0;
    //         }
    //         turnsArr.push(removed);
    //         counter += 1;
    //     }
    //
    //     for (let item of removed) {
    //         let r = document.getElementById(item.row);
    //
    //         document.getElementById(item.id).classList.remove('gray');
    //
    //         if (checkEmptyRow(Rows[item.row])) {
    //             r.classList.add('hidden');
    //         }
    //     }
    // }
}











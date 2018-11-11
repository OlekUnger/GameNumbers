

//с использованием массивов

let field = document.querySelector('.field'),
    btnAdd = document.getElementById('btnAdd'),
    btnRestart = document.getElementById('btnRestart'),
    btnBack = document.getElementById('btnBack'),
    btnClose = document.getElementById('btnClose'),
    btnRefer = document.getElementById('btnRefer'),
    btnHint = document.getElementById('btnHint'),
    reference = document.getElementById('reference'),
    storage = localStorage.getItem('numbers');


const initialArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9];

let counter = 0,
    actualArr = [],
    Rows = [],
    turnsArr = [],
    removed = [],
    searchMap = [];


createNew();

// if(!turns.length) btnBack.setAttribute('disabled', 'disabled');
// if(!turns.length) btnBack.setAttribute('disabled', 'disabled');


field.addEventListener('click', (e) => {
    deleteNums(e);
});

btnAdd.addEventListener('click', addRows);
btnRestart.addEventListener('click', createNew);
btnBack.addEventListener('click', () => {
    if (!turnsArr.length) return;
    stepBack(turnsArr);
});
btnHint.addEventListener('click', getHint);
btnRefer.addEventListener('click', ()=>{
    reference.classList.remove('hidden');
});
btnClose.addEventListener('click', ()=>{
    reference.classList.add('hidden');
});

function render(arr) {

    Rows = createRows(arr);
    searchMap = createSearchMap(Rows);


    field.innerHTML = '';
    let fragmentRows = document.createDocumentFragment();

    for (let i = 0; i < Rows.length; i++) {
        let fragmentCells = document.createDocumentFragment();
        let row = document.createElement('DIV');
        row.classList.add('row');
        row.setAttribute('id', i);

        for (let j = 0; j < Rows[i].length; j++) {
            let cell = document.createElement('DIV');

            cell.classList.add('cell');
            cell.setAttribute('id', `${i}.${j}.${Rows[i][j]}`);
            if (Rows[i][j] === 0) cell.classList.add('deleted');
            cell.innerHTML = Rows[i][j];

            fragmentCells.appendChild(cell);
        }
        row.appendChild(fragmentCells);
        fragmentCells = null;
        fragmentRows.appendChild(row);
    }
    field.appendChild(fragmentRows);
    fragmentRows = null;
}

function deleteNums(e) {
    if (!e.target.classList.contains('cell')) return;
    if (e.target.classList.contains('deleted')) return;

    let id = e.target.id,
        [row, ind, value] = id.split('.').map(item => parseInt(item));

    removed.push({id, row, ind, value});
    e.target.classList.add('gray');

    if (removed.length > 2) {
        removed = removed.splice(2, 1);
    }

    if (removed.length === 2) {
        if (removed[0].id === removed[1].id) {
            removed.splice(1, 1);
            return;
        }
        if ((removed[0].row >= removed[1].row && removed[0].ind > removed[1].ind) || (removed[0].row > removed[1].row)) {
            removed.reverse();
        }

        let valid = validate(removed);

        if (valid) {
            for (let item of removed) {
                let cell = document.getElementById(item.id);

                cell.classList.add('deleted');
                Array.from(document.querySelectorAll('.cell')).map(item=>{
                    if(item.classList.contains('hint')) item.classList.remove('hint')
                });

                Rows[item.row][item.ind] = 0;
                searchMap = createSearchMap(Rows);
                setStorage();
                console.log(storage)

            }
            turnsArr.push(removed);
            counter += 1;
        }

        for (let item of removed) {
            let r = document.getElementById(item.row);

            document.getElementById(item.id).classList.remove('gray');

            if (checkEmptyRow(Rows[item.row])) {
                r.classList.add('hidden');
            }
        }

    }

    if(searchMap.every(item=>item.value === 0)){
        setTimeout(()=>{
            alert('Игра окончена');
        }, 10)

    }
}

function addRows() {
    let arr = [],
        actualArr = [];

    for (let item of Rows) {
        actualArr = actualArr.concat(item);
        arr = arr.concat(item.filter(num => num > 0));
    }
    turnsArr = [];
    actualArr = actualArr.concat(arr);
    render(actualArr);
}

function createRows(arr) {
    let rows = [],
        len = arr.length;

    while (len > 0) {
        let row = arr.splice(0, 9);
        if (!row.every(item => item === 0)) {
            rows.push(row);
        }

        len -= 9;
    }
    return rows;
}

function createSearchMap(arr) {
    let asd = [];
    let count = 0;
    for(let i = 0; i < arr.length; i++) {
        let row = arr[i];
        for(let j = 0; j < row.length; j++) {
            let id = `${i}.${j}.${row[j]}`;
            asd.push({id: id, row: i, ind: j, value: row[j], indx: count})
            count++;
        }
    }
    return asd;
}

function stepBack(arr) {
    let item = arr.pop();

    for (let i of item) {
        let cell = document.getElementById(i.id),
            row = document.getElementById(`${i.row}`);

        cell.classList.remove('deleted');
        if(row.classList.contains('hidden')) row.classList.remove('hidden');
        Rows[i.row][i.ind] = i.value;
    }
}

function createNew() {
    storage = (!storage) ? [] : JSON.parse(storage);
    actualArr = (storage.length) ? storage : initialArr;
    render(actualArr);
}

function checkEmptyRow(r) {
    if (r.every(item => item === 0)) {
        return true;
    }
}

function getHint() {
    searchMap = createSearchMap(Rows);
    let
        map = searchMap,
        len = searchMap.length;
    let valid = false;
    let compare = true;

    while (len > 1 && !valid && compare) {
        let com1 = map.shift();
        if (com1.value === 0) continue;

        let arr = map.filter(item => (item.value === com1.value || item.value + com1.value === 10));
        if(arr.length>0){
            for (let item of arr) {
                valid = validate([com1, item]);

                if (valid) {
                    let cell1 = document.getElementById(com1.id),
                        cell2 = document.getElementById(item.id);

                    [cell1, cell2].map(item => item.classList.add('hint'));
                    break;
                }
            }
        }
        else {
            compare = false;
            alert('Нет совпадений')
        }

        len--;
    }
}

function validate(arr) {
    let valid = false;

    let
        [first, second] = arr,
        [firstId, firstRow, firstInd, firstValue] = [...Object.values(first)],
        [secondId, secondRow, secondInd, secondValue] = [...Object.values(second)];

    // //если цифры одинаковые
    if (firstValue === secondValue || (firstValue + secondValue === 10)) {
        if((secondInd - firstInd === 1 && secondRow === firstRow) || (secondInd === firstInd && secondRow - firstRow === 1)) {
            valid = true;
        }
        else if(secondRow - firstRow > 1 && firstInd === secondInd){
            //составим массив из элементов с таким же индексом но в разных строках

            let asd = searchMap.filter(item=>item.row > firstRow && item.row< secondRow && item.ind === firstInd)
                .every(item=>item.value===0);
           if(asd) valid = true;
        }
        else {
            let one = searchMap.findIndex(item=>item.id === firstId),
                two = searchMap.findIndex(item=>item.id === secondId);

            let asd = searchMap.some((item, indx)=>
                indx > one && indx < two && item.value!== 0
            );
            if(!asd) valid = true;
        }
    }

    return valid;

}

function setStorage() {
    storage = [];
    let arr = [];
    for(let item of Rows){
        arr = arr.concat(item);
    }
    localStorage.setItem('numbers', JSON.stringify(arr));
}


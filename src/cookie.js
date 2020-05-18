/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    refreshCookieTable();

    for (let child of listTable.children) {
        filterRow(child);
    }
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;

    if (document.getElementById(cookieName) != null) {
        document.cookie = `${cookieName} = ${cookieValue}`;
        refreshCookieTable();

    } else {
        document.cookie = `${cookieName} = ${cookieValue}`;
        refreshCookieTable();
    }

});

const filterRow = (row) => {

    let filter = filterNameInput.value;

    let rName = row.firstElementChild.innerText;
    let rValue = row.firstElementChild.nextElementSibling.innerText;

    if (rName.includes(filter) || rValue.includes(filter)) {
        // console.log('Row passed the filter');
    } else {
        // console.log('Row did not pass the filter');
        row.remove();
    }
};

const refreshCookieTable = () => {

    listTable.innerHTML = '';

    let cookieObj = document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');
  
        prev[name] = value;
  
        return prev;
    }, {});

    for (let cName in cookieObj) {

        if (cName.length > 0) {
            let newRow = document.createElement('tr');
            let delBtn = document.createElement('button');

            newRow.setAttribute('id', cName);
            delBtn.innerText = 'Удалить';

            delBtn.onclick = function () {
                document.cookie = `${cName} = null; max-age=-1`;
                refreshCookieTable();

            };

            newRow.innerHTML = "<td'></td> <td></td> <td></td>"
            newRow.firstChild.append(cName);
            newRow.firstChild.nextElementSibling.append(cookieObj[cName]);
            newRow.lastChild.append(delBtn);

            listTable.appendChild(newRow);
            filterRow(newRow);
        } 
    }
};

refreshCookieTable();


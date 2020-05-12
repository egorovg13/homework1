/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const newDiv = document.createElement('div');

homeworkContainer.appendChild(newDiv);

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    let arrayLocation = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    const NameSorter = (a, b) => {
        if (a.name < b.name) return -1;
        if (a.name === b.name) return 0;
        if (a.name > b.name) return 1;
    };

    const responseHandler = (response) => {
      if (response.ok) {
        console.log('HEADERS OK'); 
        return response.json();
      } else {
        console.log('HEADERS NOT OK');
      }
      
    };

    return fetch (arrayLocation).then(response => responseHandler(response)).then(list => list.sort(NameSorter)).catch(err => {
      console.log('CAUGHT. Error Message is:   ' + err);
      loadErrorHandler();
    });
}

const loadErrorHandler = () => {
  let div = document.createElement('div');
  div.textContent = 'Не удалось загрузить города';
  filterResult.appendChild(div);

  let button = document.createElement('button');
  button.textContent = 'Повторить';
  filterResult.appendChild(button);

  button.onclick = offerHelp;
};


/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let createCityNode = (city) => {
  let div = document.createElement('div');
  div.textContent = city;
  filterResult.appendChild(div);
};

const offerHelp = () => {
    let value = filterInput.value;
    
    filterResult.innerHTML = '';

    async function promptLauncher () {
      let parsedJson = await loadTowns();
      for (let obj in parsedJson) {
        let city = parsedJson[obj].name;
        if (isMatching(city, value)) {
          createCityNode(city);
        }
    }
  }
    
    if (value.length > 0) {
    loadingBlock.style.visibility = 'visible';
    promptLauncher().then(() => loadingBlock.style.visibility = 'hidden');    
}
};

filterInput.addEventListener('keyup', offerHelp);
loadingBlock.style.visibility = 'hidden';
filterBlock.style.display = 'initial';




export {
    loadTowns,
    isMatching
};

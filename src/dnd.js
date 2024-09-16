/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let randomDiv = document.createElement('div');
    let randomLeftC = Math.floor(Math.random() * document.documentElement.clientWidth);
    let randomTopC = Math.floor(Math.random() * document.documentElement.clientHeight);
    let randomDivHeight = Math.floor(Math.random() * document.documentElement.clientHeight);
    let randomDivWidth = Math.floor(Math.random() * document.documentElement.clientWidth);
    let randomColor = '#'+((1<<24)*Math.random()|0).toString(16);

    randomDiv.classList.add('draggable-div');

    randomDiv.style.position = 'absolute';
    randomDiv.style.left = randomLeftC + 'px'; 
    randomDiv.style.top = randomTopC + 'px';
    randomDiv.style.width = randomDivWidth + 'px';
    randomDiv.style.height = randomDivHeight + 'px';
    randomDiv.style.backgroundColor = randomColor;

    return randomDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    const moveAt = (pageX, pageY) => {
        target.style.left = pageX - target.offsetWidth/2 + 'px';
        target.style.top = pageY - target.offsetHeight/2 + 'px';
    };

    const onMouseMove = (event) => {
        moveAt (event.pageX, event.pageY);
    };

    target.onmousedown = function (event) {
        target.style.zIndex = 1000;
        document.body.append(target);

        moveAt (event.pageX, event.pageY);

        document.addEventListener('mousemove', onMouseMove);
        
        target.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            target.onmouseup = null;
        };
    };
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

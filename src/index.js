ymaps.ready(init);

function init () {

    let currentCoordinates;
    let newPlacemark;
    let inputAddress;
    let modalAdr = document.querySelector('.coords');

    let map = new ymaps.Map('map', {
        center: [55.766001, 37.604961],
        zoom: 14,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    const showModal = (e) => {
        let pixelCoords = (e.get('pagePixels'));
        
        currentCoordinates = e.get('coords');

        updateAddress(currentCoordinates);
        spawnModal(pixelCoords);
        renderModal();

    }

    map.events.add('click', e => showModal (e));

    const createPlacemark = (coords) => {

        return new ymaps.Placemark(coords, {

            hintContent: coords,
            balloonContentHeader: inputPlace.value,
            balloonContentBody: modalAdr.innerText,
            balloonContent: inputReview.value,
            balloonContentFooter: getTimestamp(),

        }, {
            preset: 'islands#violetIcon',
            draggable: false,
            hasBalloon: false,
            openHintOnHover: false
            
        });
    }

    const submitReview = () => {

        if (inputReview.value.length > 0) { 

            newPlacemark = createPlacemark(currentCoordinates);

            // Запись координат пина
            let newPlacemarkCoords = currentCoordinates;

            newPlacemark.events.add('click', (e) => {
                let pixelCoords = (e.get('pagePixels'));

                spawnModal(pixelCoords);
                renderModal(newPlacemarkCoords);
                updateAddress(newPlacemarkCoords);
                currentCoordinates = newPlacemarkCoords;
                console.log('click on a placemark')
            });
            map.geoObjects.add(newPlacemark);
            clusterer.add(newPlacemark);
            console.log(newPlacemark);
                
            if (!([currentCoordinates] in addedObjects)) { 
                console.log('New location logged')
                addedObjects[currentCoordinates] = [];
            } else {
                console.log('New review added to existing location');
            }
            
            let currentObjectArray = addedObjects[currentCoordinates];
            let newReviewObj = {};

            newReviewObj.name = inputName.value;
            newReviewObj.place = inputPlace.value;
            newReviewObj.review = inputReview.value;
            newReviewObj.timeStamp = getTimestamp();
            newReviewObj.address = inputAddress;
               
            clearInput();

            currentObjectArray.push(newReviewObj);

            renderModal(currentCoordinates);

        } else {
            console.log('No review')
        }

    }

    const renderModal = (coords) => {
        reviewBox.innerHTML = '';

        if ((coords) && (addedObjects[coords].length> 0)) {
            console.log('entry found! cycling thouugh ')
            let reviewsArray = addedObjects[coords];

            reviewsArray.forEach(review => {

                console.log(review)
                let reviewContainer = document.createElement('div');
                reviewContainer.classList.add('review');

                let reviewSignature = document.createElement('div');
                reviewSignature.classList.add('review-sign');

                let nameInfo = document.createElement('span');
                nameInfo.classList.add('name-info');

                let placeInfo = document.createElement('span');
                placeInfo.classList.add('place-info');

                let dateInfo = document.createElement('span');
                dateInfo.classList.add('date-info');

                let reviewText = document.createElement('div');
                reviewText.classList.add('review-text');

                nameInfo.innerText = review.name + '  ';
                placeInfo.innerText = review.place + '  ';
                dateInfo.innerText = review.timeStamp;
                reviewText.innerText = review.review;

                reviewSignature.append(nameInfo);
                reviewSignature.append(placeInfo);
                reviewSignature.append(dateInfo);

                reviewContainer.append(reviewSignature);
                reviewContainer.append(reviewText);

                reviewBox.append(reviewContainer);

            })} else {
            noReviews();
        }

    }

    function updateAddress(coords) {

        modalAdr.innerText = 'Ищем адрес...';

        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let fullAddress = firstGeoObject.getAddressLine();

            let address = fullAddress.replace('Россия, Москва, ', "");

            modalAdr.innerText = address;
            inputAddress = address;
            
        });
    }

    submitButton.addEventListener('click', submitReview);

    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="font-weight:bold;" class=ballon_header>{{ properties.balloonContentHeader|raw }}</div>' +
        // eslint-disable-next-line max-len
        ' <a href = "javascript:undefined" class = ballon_address onclick = "clusterAdrClick(event, {{properties.hintContent}})"> {{ properties.balloonContentBody|raw }}</a>' +
        '<div class=ballon_body>{{ properties.balloonContent|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
            
    );

    let clusterer = new ymaps.Clusterer ({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonItemContentLayout: customItemContentLayout,
        preset: 'islands#invertedVioletClusterIcons',

    });

    map.geoObjects.add(clusterer);

}

let addedObjects = {};

let modal = document.querySelector('.modal');

let closeButton = document.querySelector('.close-button');

let submitButton = document.querySelector('.submit-button');

let reviewBox = document.querySelector('.reviews');

//let reviewPlaceholder = document.querySelector('.review-placeholder')

let inputName = document.querySelector('#name');

let inputPlace = document.querySelector('#place');

let inputReview = document.querySelector('#review');

const hideModal = () => {
    modal.style.display = 'none';
    noReviews();
    clearInput();

};

closeButton.addEventListener ('click', hideModal);

const spawnModal = (pixelArray) => {
    if (modal.style.display !== 'block') {
        let x = pixelArray[0];
        let y = pixelArray[1];

        modal.style.left = x + 'px';
        modal.style.top = y + 'px'; 
        modal.style.display = 'block';

    } else {
        console.log ('The modal is already visible');
    }
};

const clearInput = () => {
    inputName.value = '';
    inputPlace.value = '';
    inputReview.value = '';
}

const noReviews = () => {
    reviewBox.innerHTML = '<p class="review-placeholder">Отзывов пока нет</p>'
}

const getTimestamp = () => {
    let today = new Date();
    let timeStamp = today.getHours() + ':' + today.getMinutes();

    return timeStamp;
};

const clusterAdrClick = (event, coords) => {

    let pixelCoords = [];
    
    pixelCoords.push(event.clientX);
    pixelCoords.push(event.clientY);

    console.log(pixelCoords);
};
  

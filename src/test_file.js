let arrayLocation = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
const NameSorter = (a, b) => {
if (a.name < b.name) return -1;
if (a.name === b.name) return 0;
if (a.name > b.name) return 1;
};

return fetch (arrayLocation).then(response => response.json()).then(list => {
    console.log (list.sort(NameSorter));
});
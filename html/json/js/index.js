
// 0, 1 for index col
let currentSortCol = null;

// null for no sort
let isASC = null;

const onFetchButtonClick = (e) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ({currentTarget}, ev) => {
        if (currentTarget.readyState === 4) {
            if (currentTarget.status === 200) {
                const data = JSON.parse(currentTarget.responseText)
                data.forEach((e, index) => {
                    createRow({index, ...e})
                })
            }
        }
    };
    xmlhttp.open("GET", "/json/data", true);
    xmlhttp.send()
};


const createRow = ({ index, name, age, cars }) => {
    console.log(cars)
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const nameCol = document.createElement("th");
    nameCol.innerText = name;
    const ageCol = document.createElement("th");
    ageCol.innerText = age;
    const carsCol = document.createElement("th");
    carsCol.innerText = cars.length
    cars.forEach(({name, models}) => {
        carsCol.innerHTML = carsCol.innerHTML + 
                "<br/>" + name + "-" + models.reduce((pre, cur) => pre + "/" + cur);
    })
    const rowNode = document.createElement("tr");
    if (index % 2 == 0) {
        rowNode.style.setProperty("color", "red");
    } else {
        rowNode.style.setProperty("color", "blue");
    }
    rowNode.appendChild(nameCol);
    rowNode.appendChild(ageCol);
    rowNode.appendChild(carsCol);
    contentTable.appendChild(rowNode);
};

const onSortColClick = (e, indexCol) => {
    currentSortCol = indexCol
    isASC = true
    sortTable()
}


const sortTable = () => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes
    console.log(childNodes.length)
    console.log(childNodes)
    for (i=2; i<childNodes.length-1; i++) {
        for (j=3; j<childNodes.length;j++) {
            if (childNodes[i].childNodes[currentSortCol].innerText < childNodes[j].childNodes[currentSortCol].innerText ^ isASC) {
                // in right position
                console.log("er")
            } else {
                console.log("123")
                temp = childNodes[i]
                childNodes[i] = childNodes[j]
                childNodes[j] = temp               
            }
        }
    }
}
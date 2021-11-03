
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
    removeArrow()
    if (indexCol === currentSortCol) {
        isASC = !isASC
    } else {
        isASC = true
    }
    currentSortCol = indexCol
    const elements = document.getElementsByClassName("sortcol")
    if (isASC) {
        elements[currentSortCol].className = "sortcol asc"
    } else {
        elements[currentSortCol].className = "sortcol desc"
    }
    sortTable()
}

const removeArrow = () => {
    let elements = document.getElementsByClassName("asc")
    for (i=0; i<elements.length; i++) {
        elements[i].className = "sortcol"
    }
    elements = document.getElementsByClassName("desc")
    for (i=0; i<elements.length; i++) {
        elements[i].className = "sortcol"
    }
}


const sortTable = () => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes
    for (i=2; i<childNodes.length-1; i++) {
        for (j=i+1; j<childNodes.length;j++) {
            compareStmt = childNodes[i].childNodes[currentSortCol].innerText < childNodes[j].childNodes[currentSortCol].innerText && isASC
            if (!compareStmt) {
                numCol = childNodes[i].childNodes.length
                for (k=0; k<numCol; k++) {
                    temp = childNodes[i].childNodes[k].innerText
                    childNodes[i].childNodes[k].innerText = childNodes[j].childNodes[k].innerText
                    childNodes[j].childNodes[k].innerText = temp          
                }
            }
        }
    }
}
const initData = () => [
    {
        name: "A",
        dob: "19/8/2002",
        gender: "Nam",
    },
    {
        name: "A",
        dob: "19/8/2002",
        gender: "Nam",
    },
    {
        name: "A",
        dob: "19/8/2002",
        gender: "Nam",
    },
    {
        name: "A",
        dob: "19/8/2002",
        gender: "Nam",
    },
];

const createRow = ({ index, name, dob, gender }) => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    console.log(contentTable);
    const checkboxCol = document.createElement("th");
    const checkboxNode = document.createElement("input");
    checkboxNode.setAttribute("type", "checkbox");
    checkboxNode.setAttribute("onclick", "onCheckBoxTick(this)");
    checkboxCol.appendChild(checkboxNode);
    const nameCol = document.createElement("th");
    nameCol.innerText = name;
    const dobCol = document.createElement("th");
    dobCol.innerText = dob;
    const genderCol = document.createElement("th");
    genderCol.innerText = gender;
    const rowNode = document.createElement("tr");
    if (index % 2 == 0) {
        rowNode.style.setProperty("color", "red");
    } else {
        rowNode.style.setProperty("color", "blue");
    }
    rowNode.appendChild(checkboxCol);
    rowNode.appendChild(nameCol);
    rowNode.appendChild(dobCol);
    rowNode.appendChild(genderCol);
    contentTable.appendChild(rowNode);
};
const refreshData = () => {
    data.forEach((e, index) => createRow({ index, ...e }));
};
const data = initData();
refreshData();

const onCheckBoxTick = (e) => {
    const rowNode = e.parentNode.parentNode;
    if (e.checked) {
        rowNode.style.setProperty("background-color", "yellow");
    } else {
        rowNode.style.setProperty("background-color", "");
    }
    shouldAllButtonChecked();
    shouldDeleteButtonShow();
};
const shouldDeleteButtonShow = () => {
    const { count } = countChecked();
    if (count > 0) {
        document.getElementById("delete-button").style.setProperty("opacity", "100%");
    } else {
        document.getElementById("delete-button").style.setProperty("opacity", "0%");
    }
};
const countChecked = () => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes;
    let count = 0;
    for (i = 2; i < childNodes.length; i++) {
        // checkbox node is first child of row node
        const checkBoxNode = childNodes[i].firstChild.firstChild;
        if (checkBoxNode.checked === true) {
            count++;
        }
    }
    return {
        count,
        total: childNodes - 2,
    };
};
const shouldAllButtonChecked = (rowNode) => {
    const { count, total } = countChecked();
    const allButton = document.getElementById("check-all");
    if (count === total) {
        allButton.checked = true;
    } else {
        allButton.checked = false;
    }
};
const onDeleteButtonClick = (e) => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes;
    for (i = 2; i < childNodes.length; i++) {
        // checkbox node is first child of row node
        const checkBoxNode = childNodes[i].firstChild.firstChild;
        if (checkBoxNode.checked === true) {
        }
    }
    console.log(e);
};

const onAllCheckBoxClick = (e) => {
    // Check all tick box
    const allChecked = e.checked;
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes;
    // data row start from index 2
    for (i = 2; i < childNodes.length; i++) {
        // checkbox node is first child of row node
        const checkBoxNode = childNodes[i].firstChild.firstChild;
        if (checkBoxNode.checked !== allChecked) {
            checkBoxNode.checked = allChecked;
        }
        shouldHightLightRow(checkBoxNode.parentNode.parentNode);
    }
    shouldDeleteButtonShow();
};

const refreshDeleteButton = () => {};

const shouldHightLightRow = (rowNode) => {
    if (rowNode.firstChild.firstChild.checked === true) {
        rowNode.style.setProperty("background-color", "yellow");
    } else {
        rowNode.style.setProperty("background-color", "");
    }
};

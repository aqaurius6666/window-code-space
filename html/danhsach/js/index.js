const initData = () => [
    {
        id: "1",
        name: "A",
        dob: "19/8/2001",
        gender: "Nam",
    },
    {
        id: "2",
        name: "D",
        dob: "19/8/2003",
        gender: "Nu",
    },
    {
        id: "3",
        name: "C",
        dob: "19/8/2002",
        gender: "Nam",
    },
    {
        id: "4",
        name: "B",
        dob: "19/8/2004",
        gender: "Nu",
    },
    {
        id: "5",
        name: "K",
        dob: "20/8/2004",
        gender: "Nu",
    },
    {
        id: "6",
        name: "CB",
        dob: "19/10/2004",
        gender: "Nu",
    },
    {
        id: "7",
        name: "DB",
        dob: "11/8/2004",
        gender: "Nu",
    },
    {
        id: "8",
        name: "BE",
        dob: "2/2/2004",
        gender: "Nu",
    },

];
let current_data = [];
const createRow = ({ index, name, dob, gender, id }) => {
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const checkboxCol = document.createElement("th");
    const checkboxNode = document.createElement("input");
    checkboxNode.setAttribute("type", "checkbox");
    checkboxNode.className = "checkbox";
    checkboxNode.id = id;
    checkboxNode.setAttribute("onclick", "onCheckBoxTick(this)");
    checkboxCol.appendChild(checkboxNode);
    const nameCol = document.createElement("th");
    nameCol.innerText = name;
    const dobCol = document.createElement("th");
    dobCol.innerText = dob;
    const genderCol = document.createElement("th");
    genderCol.innerText = gender;
    const rowNode = document.createElement("tr");
    rowNode.className = "row"
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
const refreshData = (_data) => {
    current_data = _data
    const table = document.getElementById("table");
    const contentTable = table.childNodes[1]; // tbody
    const childNodes = contentTable.childNodes
    if (childNodes.length > 2) {
        for (i=childNodes.length-1; i>=2; i--) {
            contentTable.removeChild(childNodes[i])
        }
    }
    current_data.forEach((e, index) => createRow({ index, ...e }));
    
};

refreshData(initData());

const onCheckBoxTick = (e) => {
    const rowNode = e.parentNode.parentNode;
    if (e.checked) {
        rowNode.style.setProperty("background-color", "yellow");
    } else {
        rowNode.style.setProperty("background-color", "");
    }
    refreshAllCheckBoxNode();
    refreshDeleteButton();
};
const refreshDeleteButton = () => {
    const { checkedNodes } = getCheckBoxNodes();
    if (checkedNodes.length > 0) {
        document.getElementById("delete-button").style.setProperty("visibility", "visible");
    } else {
        document.getElementById("delete-button").style.setProperty("visibility", "hidden");
    }
};
const getCheckBoxNodes = () => {
    const checkboxNodes = document.getElementsByClassName("checkbox");
    const checkedNodes = [];
    const allNodes = [];
    for (i = 0; i < checkboxNodes.length; i++) {
        if (checkboxNodes.item(i).checked) {
            checkedNodes.push(checkboxNodes.item(i));
        }
        allNodes.push(checkboxNodes.item(i));
    }
    return {
        checkedNodes,
        allNodes,
    };
};
const refreshAllCheckBoxNode = () => {
    const { checkedNodes, allNodes } = getCheckBoxNodes();
    const allCheckBoxNode = document.getElementById("check-all");
    console.log(allNodes.length)
    if (checkedNodes.length === allNodes.length && checkedNodes.length !== 0) {
        allCheckBoxNode.checked = true;
    } else {
        allCheckBoxNode.checked = false;
    }
};
const onDeleteButtonClick = (e) => {
    const { checkedNodes } = getCheckBoxNodes();
    const copydata = [];
    const ids = checkedNodes.map((e) => e.id);
    current_data.forEach((e) => {
        if (ids.indexOf(e.id) == -1) {
            copydata.push(e)
        }
    })
    refreshData(copydata);
    refreshDeleteButton()
    refreshAllCheckBoxNode()
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
    refreshDeleteButton();
    refreshAllCheckBoxNode()
};

const shouldHightLightRow = (rowNode) => {
    if (rowNode.firstChild.firstChild.checked === true) {
        rowNode.style.setProperty("background-color", "yellow");
    } else {
        rowNode.style.setProperty("background-color", "");
    }
};

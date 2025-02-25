let columns = 27;
let row = 100;

let headRow = document.querySelector(".head-row");
let snoCol = document.querySelector(".serial-no");
let body = document.querySelector(".main-body");
let activeCellElement = document.querySelector(".selected-cell");
let form = document.querySelector(".form-container");

let selectedCell = "";
let history = [];
let redoStack = [];

// Create column headers
for (let i = 0; i < columns - 1; i++) {
    let headCell = document.createElement("div");
    headCell.textContent = String.fromCharCode(i + 65);
    headCell.classList.add("col-head");
    headRow.appendChild(headCell);
}

// Create row numbers
for (let i = 0; i < row; i++) {
    let headColCells = document.createElement("div");
    headColCells.textContent = i + 1;
    headColCells.classList.add("sno-col");
    snoCol.appendChild(headColCells);
}

// Create cells
for (let i = 1; i <= row; i++) {
    let rowCell = document.createElement("div");
    rowCell.classList.add("row");

    for (let j = 1; j < columns; j++) {
        let colCell = document.createElement("span");
        colCell.id = `${String.fromCharCode(j + 64)}${i}`;
        colCell.classList.add("cell");
        colCell.contentEditable = "true";
        colCell.addEventListener("input", saveState);
        rowCell.appendChild(colCell);
    }
    body.appendChild(rowCell);
}

// Event listener for cell selection
body.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
        activeCellElement.textContent = e.target.id;
        selectedCell = e.target;
    }
});


function saveState() {
    if (selectedCell) {
        let data = {
            value: selectedCell.textContent,
            style: {
                fontSize: selectedCell.style.fontSize,
                fontFamily: selectedCell.style.fontFamily,
                fontWeight: selectedCell.style.fontWeight,
                fontStyle: selectedCell.style.fontStyle,
                textDecoration: selectedCell.style.textDecoration,
                textAlign: selectedCell.style.textAlign,
                color: selectedCell.style.color,
                backgroundColor: selectedCell.style.backgroundColor,
            },
        };
        
      
    }
}



// Print Functionality
document.querySelector(".options button:nth-child(3)").addEventListener("click", () => {
    window.print();
});

// Form change event
form.addEventListener("change", () => {
    if (!selectedCell) {
        alert("Please select a cell");
        form.reset();
        return;
    }

    // Access data
    const formData = {
        fontFamily: form["fontfamily"].value,
        fontSize: form["fontSize"].value + "px",
        fontWeight: form["isBold"].checked ? "bold" : "normal",
        fontItalic: form["isItalic"].checked ? "italic" : "normal",
        fontUnderline: form["isUnderline"].checked ? "underline" : "none",
        align: form["align"].value,
        textColor: form["textColor"].value,
        backgroundColor: form["backgroundColor"].value,
    };

    // Apply styles to the selected cell
    applyStylesToSelectedCells(formData);
});

// Function to apply styles
function applyStylesToSelectedCells(formData) {
    selectedCell.style.fontSize = formData.fontSize;
    selectedCell.style.fontFamily = formData.fontFamily;
    selectedCell.style.fontWeight = formData.fontWeight;
    selectedCell.style.fontStyle = formData.fontItalic;
    selectedCell.style.textDecoration = formData.fontUnderline;
    selectedCell.style.textAlign = formData.align;
    selectedCell.style.color = formData.textColor;
    selectedCell.style.backgroundColor = formData.backgroundColor;
    
}





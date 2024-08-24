const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage on page load
function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
    // Reattach event listeners to existing notes after loading
    notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.addEventListener("keyup", updateStorage);
    });
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.alt = "Delete Note";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Add keyup event listener for the new note
    inputBox.addEventListener("keyup", updateStorage);

    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand('insertHTML', false, '<br><br>');
        event.preventDefault();
    }
});

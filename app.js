
document.addEventListener('DOMContentLoaded', function () {
    const noteArea = document.getElementById('noteArea');
    const saveButton = document.getElementById('saveButton');
    const savedNotesContainer = document.getElementById('savedNotes');

    // cargar notas
    loadNotes();

    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotesContainer.innerHTML = '';

        savedNotes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.innerHTML = `
                <p>${note}</p>
                <button data-index="${index}">Eliminar</button>
            `;

            noteItem.querySelector('button').addEventListener('click', function () {
                // eliminar la nota
                savedNotes.splice(index, 1);
                saveNotes(savedNotes);
            });

            savedNotesContainer.appendChild(noteItem);
        });
    }

    // guardar notas
    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    saveButton.addEventListener('click', function () {
        const noteText = noteArea.value.trim();
        if (noteText !== '') {

            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            savedNotes.push(noteText);
            saveNotes(savedNotes);
            noteArea.value = '';
        }
    });
});

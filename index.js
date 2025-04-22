let beverageCount = 1;

const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const originalFieldset = document.querySelector('.beverage');

function createDeleteButton(fieldset) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';

    deleteButton.addEventListener('click', () => {
        const total = document.querySelectorAll('.beverage').length;
        if (total > 1) {
            fieldset.remove();
            updateHeadings();
        }
    });

    return deleteButton;
}

function updateHeadings() {
    const all = document.querySelectorAll('.beverage');
    all.forEach((el, i) => {
        el.querySelector('.beverage-count').textContent = `Напиток №${i + 1}`;
    });
}

originalFieldset.appendChild(createDeleteButton(originalFieldset));

addButton.addEventListener('click', () => {
    const newFieldset = originalFieldset.cloneNode(true);
    newFieldset.querySelectorAll('input[type=radio]').forEach((r, i) => {
        r.checked = i === 0; // сброс radio
    });
    newFieldset.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
    newFieldset.querySelector('select').selectedIndex = 0;

    newFieldset.querySelector('.delete-button')?.remove();
    newFieldset.appendChild(createDeleteButton(newFieldset));

    form.insertBefore(newFieldset, addButton.parentNode);
    updateHeadings();
});

const modal = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('modalClose');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});
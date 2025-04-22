document.querySelector('.add-button').addEventListener('click', () => {
    const form = document.querySelector('form');
    const beverages = form.querySelectorAll('.beverage');
    const lastBeverage = beverages[beverages.length - 1];
    const clone = lastBeverage.cloneNode(true);

    const newNumber = beverages.length + 1;
    clone.querySelector('.beverage-count').textContent = `Напиток №${newNumber}`;

    clone.querySelector('select').selectedIndex = 0;
    const radios = clone.querySelectorAll('input[type="radio"]');
    radios.forEach((radio, i) => (radio.checked = i === 0));
    clone.querySelectorAll('input[type="checkbox"]').forEach(chk => (chk.checked = false));

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        if (form.querySelectorAll('.beverage').length > 1) {
            clone.remove();
        }
    });
    clone.appendChild(removeButton);

    form.insertBefore(clone, form.querySelector('.add-button').parentElement);
});

const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});
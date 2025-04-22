let beverageCount = 1;

const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const originalFieldset = document.querySelector('.beverage');

function getWordForm(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'напитков';
    }
    if (lastDigit === 1) return 'напиток';
    if (lastDigit >= 2 && lastDigit <= 4) return 'напитка';

    return 'напитков';
}

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
        r.checked = i === 0;
    });
    newFieldset.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
    newFieldset.querySelector('select').selectedIndex = 0;

    const milkRadios = newFieldset.querySelectorAll('input[type=radio]');
    const uniqueName = `milk-${Date.now()}-${Math.random()}`;
    milkRadios.forEach(radio => {
        radio.name = uniqueName;
    });

    newFieldset.querySelector('.delete-button')?.remove();
    newFieldset.appendChild(createDeleteButton(newFieldset));

    form.insertBefore(newFieldset, addButton.parentNode);
    updateHeadings();

    const textarea = newFieldset.querySelector('.custom-text');
    const output = newFieldset.querySelector('.custom-text-output');
    textarea.addEventListener('input', () => {
        let text = textarea.value;

        const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            text = text.replace(regex, '<b>$1</b>');
        });

        output.innerHTML = text || '—';
    });
});

document.querySelectorAll('.beverage').forEach(bev => {
    const textarea = bev.querySelector('.custom-text');
    const output = bev.querySelector('.custom-text-output');

    textarea.addEventListener('input', () => {
        let text = textarea.value;

        const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            text = text.replace(regex, '<b>$1</b>');
        });

        output.innerHTML = text || '—';
    });
});

const modal = document.getElementById('modalOverlay');
const modalText = modal.querySelector('p');
const closeModalButton = document.getElementById('modalClose');
const tableBody = document.getElementById('modalTableBody');
const orderTimeInput = document.getElementById('order-time');
const confirmOrderButton = document.getElementById('confirm-order');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const totalBeverages = document.querySelectorAll('.beverage').length;
    const wordForm = getWordForm(totalBeverages);

    modalText.textContent = `Вы заказали ${totalBeverages} ${wordForm}`;
    tableBody.innerHTML = '';

    document.querySelectorAll('.beverage').forEach(bev => {
        const drink = bev.querySelector('select').selectedOptions[0].textContent;
        const milk = bev.querySelector('input[type="radio"]:checked')?.nextElementSibling.textContent.trim();
        const extras = [...bev.querySelectorAll('input[type="checkbox"]:checked')]
            .map(c => c.nextElementSibling.textContent.trim())
            .join(', ');
        const wishes = bev.querySelector('.custom-text').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drink}</td>
            <td>${milk}</td>
            <td>${extras || ''}</td>
            <td>${wishes || ''}</td>
        `;
        tableBody.appendChild(row);
    });

    modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

confirmOrderButton.addEventListener('click', () => {
    const selectedTime = orderTimeInput.value;
    if (!selectedTime) {
        alert('Пожалуйста, выберите время заказа.');
        return;
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const selectedDateTime = new Date();
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const currentTime = new Date();

    if (selectedDateTime <= currentTime) {
        orderTimeInput.style.borderColor = 'red';
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее.');
    } else {
        orderTimeInput.style.borderColor = '';
        modal.classList.add('hidden');
    }
});
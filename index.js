document.querySelector('.add-button').addEventListener('click', () => {
    const form = document.querySelector('form');
    const beverages = form.querySelectorAll('.beverage');
    const lastBeverage = beverages[beverages.length - 1];
    const clone = lastBeverage.cloneNode(true);
    const newNumber = beverages.length + 1;
    clone.querySelector('.beverage-count').textContent = `Напиток №${newNumber}`;
    clone.querySelector('select').selectedIndex = 0;
    const radios = clone.querySelectorAll('input[type="radio"]');
    radios.forEach((radio, i) => radio.checked = i === 0);
    clone.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);
    form.insertBefore(clone, form.querySelector('.add-button').parentElement);
});
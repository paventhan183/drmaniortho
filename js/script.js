<script>
  const container = document.getElementById('container');
  const addRowBtn = document.getElementById('addRowBtn');
  const submitBtn = document.getElementById('submitBtn');

  const custNameInput = document.getElementById('custName');
  const custAddressInput = document.getElementById('custAddress');
  const custMobileInput = document.getElementById('custMobile');

  const unitDefaults = {
    'Gram': 200,
    'Kg': 1,
    'Packet': 1,
    'Litre': 1
  };

  function generateOrderNumber() {
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
                    String(now.getMonth()+1).padStart(2, '0') +
                    String(now.getDate()).padStart(2, '0') +
                    String(now.getHours()).padStart(2, '0') +
                    String(now.getMinutes()).padStart(2, '0') +
                    String(now.getSeconds()).padStart(2, '0');
    const randomStr = Math.floor(Math.random() * 900 + 100);
    return 'ORD' + dateStr + randomStr;
  }

  function updateLabels() {
    const rows = container.querySelectorAll('.row');
    rows.forEach((row, i) => {
      const label = row.querySelector('label');
      label.textContent = `Item ${i + 1}:`;
    });
  }

  function createRow() {
  const row = document.createElement('div');
  row.className = 'row';

  const label = document.createElement('label');
  row.appendChild(label);

  // Editable dropdown (input + select merged)
  const wrapper = document.createElement('div');
  wrapper.style.flex = '1 1 45%';
  wrapper.style.position = 'relative';

  const inputItem = document.createElement('input');
  inputItem.type = 'text';
  inputItem.placeholder = 'Enter or select item name';
  inputItem.style.width = '100%';
  wrapper.appendChild(inputItem);

  const selectItem = document.createElement('select');
  selectItem.style.position = 'absolute';
  selectItem.style.top = '0';
  selectItem.style.left = '0';
  selectItem.style.width = '100%';
  selectItem.style.height = '100%';
  selectItem.style.opacity = '0'; // Invisible but clickable
  selectItem.style.cursor = 'pointer';

  const products = [
    '',
    'Apple iPhone',
    'Samsung Galaxy',
    'Sony Headphones',
    'Dell Laptop',
    'HP Printer',
    'Logitech Mouse',
    'USB Cable',
    'Bluetooth Speaker'
  ];
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product;
    option.textContent = product;
    selectItem.appendChild(option);
  });

  // When user selects from dropdown, put value in input
  selectItem.addEventListener('change', () => {
    inputItem.value = selectItem.value;
  });

  wrapper.appendChild(selectItem);
  row.appendChild(wrapper);

  // Unit select box
  const selectUnit = document.createElement('select');
  const defaultOption = new Option('Select unit', '');
  selectUnit.add(defaultOption);
  for (const unit in unitDefaults) {
    selectUnit.add(new Option(unit, unit));
  }
  row.appendChild(selectUnit);

  // Quantity input
  const inputQty = document.createElement('input');
  inputQty.type = 'number';
  inputQty.min = '0';
  inputQty.placeholder = 'Quantity';
  row.appendChild(inputQty);

  selectUnit.addEventListener('change', () => {
    const selectedUnit = selectUnit.value;
    if (selectedUnit && unitDefaults[selectedUnit] !== undefined) {
      inputQty.value = unitDefaults[selectedUnit];
    } else {
      inputQty.value = '';
    }
  });

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.textContent = 'X';
  closeBtn.className = 'close-btn';
  closeBtn.onclick = () => {
    container.removeChild(row);
    updateLabels();
  };
  row.appendChild(closeBtn);

  return row;
}
  function resetForm() {
    custNameInput.value = '';
    custAddressInput.value = '';
    custMobileInput.value = '';
    container.innerHTML = '';
    container.appendChild(createRow());
    updateLabels();
  }

  resetForm();

  addRowBtn.addEventListener('click', () => {
    const rows = container.querySelectorAll('.row');
    const lastRow = rows[rows.length - 1];

    if (!lastRow) {
      container.appendChild(createRow());
      updateLabels();
      return;
    }

    const inputs = lastRow.querySelectorAll('input');
    const select = lastRow.querySelector('select');

    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === '') allFilled = false;
    });
    if (!select.value) allFilled = false;

    if (!allFilled) {
      alert('Please fill all fields in the current row before adding a new one.');
      return;
    }

    container.appendChild(createRow());
    updateLabels();
  });

  submitBtn.addEventListener('click', () => {
    if (custNameInput.value.trim() === '') {
      alert('Please enter customer name.');
      custNameInput.focus();
      return;
    }
    if (custAddressInput.value.trim() === '') {
      alert('Please enter delivery address.');
      custAddressInput.focus();
      return;
    }
    if (custMobileInput.value.trim() === '') {
      alert('Please enter mobile number.');
      custMobileInput.focus();
      return;
    }

    const rows = container.querySelectorAll('.row');
    if (rows.length === 0) {
      alert('Please add at least one item.');
      return;
    }

    let allFilled = true;
    const data = [];

    rows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const select = row.querySelector('select');

      inputs.forEach(input => {
        if (input.value.trim() === '') allFilled = false;
      });
      if (!select.value) allFilled = false;

      if (allFilled) {
        data.push({
          item: inputs[0].value.trim(),
          unit: select.value,
          quantity: inputs[1].value.trim()
        });
      }
    });

    if (!allFilled) {
      alert('Please fill all fields in every item row before submitting.');
      return;
    }

    const orderNumber = generateOrderNumber();

    let message = `Order No: ${orderNumber}\n\n`;
    message += `Name: ${custNameInput.value.trim()}\n`;
    message += `Address: ${custAddressInput.value.trim()}\n`;
    message += `Mobile: ${custMobileInput.value.trim()}\n\n`;
    data.forEach((item, idx) => {
      message += `${idx + 1}. ${item.item} - ${item.quantity}${item.unit.toLowerCase()}\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918015241869?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    alert(`Order submitted!\nOrder No: ${orderNumber}\nPlease save it.`);

    resetForm();
  });
</script>
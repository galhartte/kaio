document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.card');
    const orderItemsDiv = document.getElementById('menuItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    const orderForm = document.getElementById('orderForm');

    // Create checkboxes for each menu item
    menuItems.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = item.querySelector('span').textContent;
        
        const div = document.createElement('div');
        div.className = 'menu-item-select';
        div.innerHTML = `
            <label>
                <input type="checkbox" name="items" value="${name}" data-price="${price.replace('R$ ', '')}">
                ${name} - ${price}
            </label>
        `;
        orderItemsDiv.appendChild(div);
    });

    // Calculate total when items are selected
    orderItemsDiv.addEventListener('change', calculateTotal);

    function calculateTotal() {
        const checkedItems = document.querySelectorAll('input[name="items"]:checked');
        let total = 0;
        
        checkedItems.forEach(item => {
            total += parseFloat(item.dataset.price);
        });

        totalPriceSpan.textContent = total.toFixed(2);
    }

    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const selectedItems = Array.from(document.querySelectorAll('input[name="items"]:checked'))
            .map(item => item.value);
        
        if (selectedItems.length === 0) {
            alert('Por favor, selecione pelo menos um item do menu.');
            return;
        }

        const orderMessage = `
            Pedido recebido!
            Nome: ${name}
            Endereço: ${address}
            Telefone: ${phone}
            Itens: ${selectedItems.join(', ')}
            Total: R$ ${totalPriceSpan.textContent}
        `;

        alert(orderMessage);
        orderForm.reset();
        totalPriceSpan.textContent = '0.00';
    });
});
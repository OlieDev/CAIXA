document.addEventListener("DOMContentLoaded", () => {
    let totalMoney = parseFloat(localStorage.getItem('totalMoney')) || 0;
    let totalCard = parseFloat(localStorage.getItem('totalCard')) || 0;
    let totalExit = parseFloat(localStorage.getItem('totalExit')) || 0;
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const moneyInput = document.getElementById('money-value1');
    const cardInput = document.getElementById('card-value1');
    const exitInput = document.getElementById('exit-value1');
    const moneyDisplay = document.getElementById('money');
    const cardDisplay = document.getElementById('cart');
    const exitDisplay = document.getElementById('exit');
    const totalDisplay = document.getElementById('total');
    const clearCacheBtn = document.getElementById('clear-cache');

    function updateDisplay() {
        moneyDisplay.textContent = `R$ ${totalMoney.toFixed(2)}`;
        moneyDisplay.style.color = 'green';
        cardDisplay.textContent = `R$ ${totalCard.toFixed(2)}`;
        cardDisplay.style.color = 'blue';
        exitDisplay.textContent = `R$ ${totalExit.toFixed(2)}`;
        exitDisplay.style.color ='red';
        const total = (totalMoney + totalCard) - totalExit;
        totalDisplay.textContent = `R$ ${total.toFixed(2)}`;

        localStorage.setItem('totalMoney', totalMoney);
        localStorage.setItem('totalCard', totalCard);
        localStorage.setItem('totalExit', totalExit);
    }

    function addTransaction(type, value) {
        const transaction = {
            type: type,
            value: parseFloat(value),
            date: new Date().toLocaleString()
        };
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function addValue(input, totalRef, type) {
        const value = parseFloat(input.value) || 0;
        totalRef += value;
        input.value = '';
        addTransaction(type, value);
        return totalRef;
    }

    moneyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            totalMoney = addValue(moneyInput, totalMoney, 'Dinheiro');
            updateDisplay();
        }
    });

    cardInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            totalCard = addValue(cardInput, totalCard, 'Cartão');
            updateDisplay();
        }
    });

    exitInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            totalExit = addValue(exitInput, totalExit, 'Saída');
            updateDisplay();
        }
    });

    clearCacheBtn.addEventListener('click', () => {
        localStorage.clear();
        totalMoney = 0;
        totalCard = 0;
        totalExit = 0;
        transactions = [];
        updateDisplay();
    });

    updateDisplay();
});


document.addEventListener("DOMContentLoaded", () => {
    const transactionList = document.getElementById('transaction-list');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>R$ ${transaction.value.toFixed(2)}</td>
            <td>${transaction.date}</td>
        `;
        transactionList.appendChild(row);
    });
});
// Função para calcular o valor total (mensalidade - desconto)
function calcular() {
    const valorSemDesconto = parseFloat(document.getElementById('value-bruto').value);
    const valorDoDesconto = parseFloat(document.getElementById('value-discount').value);

    // Verificando se os campos de valor bruto e desconto foram preenchidos
    if (isNaN(valorSemDesconto) || isNaN(valorDoDesconto)) {
        alert("Preencha os campos de valor da mensalidade e desconto corretamente.");
        return;
    }

    // Calculando o valor total (mensalidade - desconto)
    const valorTotal = valorSemDesconto - valorDoDesconto;

    // Atualizando o valor total no HTML
    document.getElementById('valorTotal').textContent = `R$ ${valorTotal.toFixed(2)}`;
}

// Função para calcular o troco (valor recebido - valor total)
function calcularTroco() {
    const valorTotal = parseFloat(document.getElementById('valorTotal').textContent.replace('R$ ', ''));
    const valorRecebido = parseFloat(document.getElementById('value-received').value);

    // Verificando se o valor total e o valor recebido foram preenchidos
    if (isNaN(valorTotal)) {
        alert("Calcule o valor total primeiro.");
        return;
    }

    if (isNaN(valorRecebido)) {
        alert("Preencha o valor recebido.");
        return;
    }

    // Calculando o troco
    const troco = valorRecebido - valorTotal;

    // Atualizando o valor do troco no HTML
    document.getElementById('troco').textContent = `R$ ${troco.toFixed(2)}`;
    
    // Definindo a cor do texto do troco (vermelho se for negativo)
    if (troco < 0) {
        document.getElementById('troco').style.color = 'red';
        document.getElementById('troco').style.fontWeight = 'bold';
    } else {
        document.getElementById('troco').style.color = 'green'; // Verde se for positivo
        document.getElementById('troco').style.fontWeight = 'normal';
    }
}

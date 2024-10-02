document.addEventListener("DOMContentLoaded", () => {
    // Acumuladores para os valores
    let totalMoney = parseFloat(localStorage.getItem('totalMoney')) || 0;
    let totalCard = parseFloat(localStorage.getItem('totalCard')) || 0;
    let totalExit = parseFloat(localStorage.getItem('totalExit')) || 0;

    // Captura os inputs e os elementos de exibição
    const moneyInput = document.getElementById('money-value1');
    const cardInput = document.getElementById('card-value1');
    const exitInput = document.getElementById('exit-value1');
    const moneyDisplay = document.getElementById('money');
    const cardDisplay = document.getElementById('cart');
    const exitDisplay = document.getElementById('exit');
    const totalDisplay = document.getElementById('total');
    const clearCacheBtn = document.getElementById('clear-cache');

    // Função que atualiza os valores na tela com "R$" e salva no localStorage
    function updateDisplay() {
        // Atualiza os valores acumulados no DOM com "R$" antes do valor
        moneyDisplay.textContent = `R$ ${totalMoney.toFixed(2)}`;
        moneyDisplay.style.color = 'green';
        cardDisplay.textContent = `R$ ${totalCard.toFixed(2)}`;
        cardDisplay.style.color = 'blue';
        exitDisplay.textContent = `R$ ${totalExit.toFixed(2)}`;
        exitDisplay.style.color ='red';

        // Calcula o total final e atualiza
        const total = (totalMoney + totalCard) - totalExit;
        totalDisplay.textContent = `R$ ${total.toFixed(2)}`;

        // Salva os valores no localStorage
        localStorage.setItem('totalMoney', totalMoney);
        localStorage.setItem('totalCard', totalCard);
        localStorage.setItem('totalExit', totalExit);
    }

    // Função para adicionar valores e limpar o input
    function addValue(input, totalRef) {
        const value = parseFloat(input.value) || 0; // Pega o valor inserido ou 0 se for inválido
        totalRef += value; // Adiciona ao total correspondente
        input.value = ''; // Limpa o input
        return totalRef; // Retorna o novo total
    }

    // Adicionar evento de 'keydown' para detectar Enter nos campos
    moneyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previne o comportamento padrão do Enter
            totalMoney = addValue(moneyInput, totalMoney); // Atualiza o total de dinheiro
            updateDisplay(); // Atualiza a exibição
        }
    });

    cardInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            totalCard = addValue(cardInput, totalCard); // Atualiza o total de cartão
            updateDisplay();
        }
    });

    exitInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            totalExit = addValue(exitInput, totalExit); // Atualiza o total de saída
            updateDisplay();
        }
    });

    // Função para limpar o cache
    clearCacheBtn.addEventListener('click', () => {
        localStorage.clear(); // Limpa o localStorage
        totalMoney = 0;
        totalCard = 0;
        totalExit = 0;
        updateDisplay(); // Atualiza os valores na tela
    });

    // Atualiza a exibição inicial com os valores salvos no localStorage
    updateDisplay();
});

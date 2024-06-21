document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            handleInput(value);
        });
    });

    document.addEventListener('keydown', function (event) {
        const key = event.key;
        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Escape') {
            handleInput('C');
        } else if (['+', '-', '*', '/'].includes(key) || (key >= '0' && key <= '9') || key === '.') {
            handleInput(key);
        }
    });

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '0';
            operator = null;
            previousInput = null;
        } else if (value === '=') {
            if (operator && previousInput !== null) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = null;
                previousInput = null;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (operator && previousInput !== null) {
                currentInput = calculate(previousInput, currentInput, operator);
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '0';
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }

        display.textContent = currentInput;
    }

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return '0';
        }
    }
});

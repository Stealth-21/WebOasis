document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerText === '=') {
                try {
                    const result = evaluateExpression(display.value);
                    display.value = formatResult(result);
                } catch (error) {
                    display.value = 'Error';
                }
            } else if (button.innerText === 'C') {
                clearDisplay();
            } else if (button.innerText === '√') {
                handleSquareRoot();
            } else {
                appendToDisplay(button.innerText);
            }
        });
    });

    function evaluateExpression(expression) {
        return Function('"use strict";return (' + expression + ')')();
    }

    function formatResult(result) {
        return Number.isInteger(result) ? result : result.toFixed(4);
    }

    function clearDisplay() {
        display.value = '';
    }

    function handleSquareRoot() {
        const expression = display.value;
        try {
            const result = Math.sqrt(evaluateExpression(expression));
            display.value = formatResult(result);
        } catch (error) {
            display.value = 'Error';
        }
    }

    function appendToDisplay(value) {
        display.value += value;
    }
});
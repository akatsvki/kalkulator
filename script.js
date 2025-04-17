let currentInput = '0';
let history = '';
let resultDisplayed = false;

// Update tampilan
function updateDisplay() {
    document.getElementById('current').innerText = currentInput;
    document.getElementById('history').innerText = history;
}

// Tambahkan ke display
function appendToDisplay(value) {
    if (resultDisplayed) {
        if (['+', '-', '*', '/', '%', '^'].includes(value)) {
            history = currentInput;
            currentInput = value;
            resultDisplayed = false;
        } else {
            clearAll();
            currentInput = value;
            resultDisplayed = false;
        }
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
}

// Fungsi khusus untuk fungsi scientific
function calculateFunction(func) {
    if (resultDisplayed) {
        history = '';
        resultDisplayed = false;
    }
    
    if (func === 'factorial(') {
        const num = parseFloat(currentInput);
        if (num < 0) {
            currentInput = 'Error';
            updateDisplay();
            return;
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        history = num + '! =';
        currentInput = result.toString();
        resultDisplayed = true;
    } else {
        history = func + currentInput + ')';
        currentInput = func + currentInput + ')';
    }
    updateDisplay();
}

// Hitung hasil
function calculate() {
    try {
        // Ganti ^ dengan ** untuk eksponensial
        let expression = currentInput.replace(/\^/g, '**');
        
        // Tangani x²
        expression = expression.replace(/(\d+)²/g, '($1)**2');
        
        // Evaluasi ekspresi
        let result = eval(expression);
        
        // Tangani pembagian oleh nol
        if (!isFinite(result)) {
            throw new Error('Division by zero');
        }
        
        history = currentInput + ' =';
        currentInput = result.toString();
        resultDisplayed = true;
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Hapus semua
function clearAll() {
    currentInput = '0';
    history = '';
    resultDisplayed = false;
    updateDisplay();
}

// Hapus karakter terakhir
function backspace() {
    if (resultDisplayed) {
        return;
    }
    
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Event listener untuk keyboard
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '%', '(', ')', '.', '^'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'p' && event.ctrlKey) {
        appendToDisplay('Math.PI');
    } else if (key === 'e' && event.ctrlKey) {
        appendToDisplay('Math.E');
    }
});

// Inisialisasi tampilan
updateDisplay();

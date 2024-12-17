expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

// ==========================================================================================================================================================

function solution1(expenses) {
    const allExpenses = [];
    
    // Funkcja pomocnicza do znalezienia pierwszej niedzieli w miesiącu
    function getFirstSunday(year, month) {
        for (let day = 1; day <= 7; day++) { // do 7, ponieważ pierwsza niedziela nie może być później   
            const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            if (date.getDay() === 0) return day; // Niedziela = 0
        }
        return null;
    }

    for (const month in expenses) {
        const [year, monthNum] = month.split('-');
        const firstSunday = getFirstSunday(year, monthNum);
        
        for (const day in expenses[month]) {
            const dayNum = parseInt(day, 10);
            if (dayNum <= firstSunday) {
                // Zbieramy wydatki z dni <= pierwszej niedzieli
                for (const category in expenses[month][day]) {
                    allExpenses.push(...expenses[month][day][category]);
                }
            }
        }
    }

    if (allExpenses.length === 0) return null;

    // Sortowanie i wyznaczanie mediany
    allExpenses.sort((a, b) => a - b);
    const mid = Math.floor(allExpenses.length / 2);
    return allExpenses.length % 2 === 0
        ? (allExpenses[mid - 1] + allExpenses[mid]) / 2
        : allExpenses[mid];
}

// ==========================================================================================================================================================

/*
    Quick Select pozwala na znalezienie k-tego elementu (np. elementu środkowego dla mediany) bez pełnego sortowania, co przyspiesza obliczenia.
    
    Złożoność czasowa:
    -Średni czas działania: O(n), gdzie n to liczba elementów w tablicy.
    -Najgorszy przypadek: O(n²), jeśli wybór pivota jest nieoptymalny.

    Quick Select działa in-place, co oznacza, że nie wymaga dodatkowej pamięci (poza rekurencją), w przeciwieństwie do metod sortujących, które mogą wymagać kopii tablicy.

    Zalety:
    -Szybsze działanie - dla dużych zbiorów danych Quick Select jest znacznie szybszy od pełnego sortowania, ponieważ koncentruje się tylko na znalezieniu wartości środkowej (k-tego elementu).
    -Oszczędność obliczeń - nie musimy sortować całej tablicy – algorytm przetwarza jedynie te elementy, które są potrzebne do znalezienia mediany.
    -Optymalizacja dla dużych danych - w zadaniach z dużą liczbą danych (np. tysiące liczb) różnica między O(n) a O(n log n) staje się zauważalna.

    Wady Quick Select:
    -Najgorszy przypadek - jeśli wybór pivota jest nieoptymalny (np. pivot zawsze jest najgorszym elementem), Quick Select może działać w czasie O(n²).
    -Złożoność implementacji - Quick Select jest trudniejszy do zaimplementowania niż klasyczne sortowanie (np. Array.sort()), ponieważ wymaga ręcznej implementacji funkcji partition.
    -Nieuporządkowane dane - w przeciwieństwie do sortowania, Quick Select nie pozostawia tablicy posortowanej, co może być wadą, jeśli inne operacje wymagają uporządkowanego zbioru.
*/

function solution2(expenses) {
    const allExpenses = [];
    
    // Funkcja pomocnicza do znalezienia pierwszej niedzieli w miesiącu
    function getFirstSunday(year, month) {
        for (let day = 1; day <= 7; day++) { // do 7, ponieważ pierwsza niedziela nie może być później
            const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            if (date.getDay() === 0) return day; // Niedziela = 0
        }
        return null;
    }

    for (const month in expenses) {
        const [year, monthNum] = month.split('-');
        const firstSunday = getFirstSunday(year, monthNum);
        
        for (const day in expenses[month]) {
            const dayNum = parseInt(day, 10);
            if (dayNum <= firstSunday) {
                // Zbieramy wydatki z dni <= pierwszej niedzieli
                for (const category in expenses[month][day]) {
                    allExpenses.push(...expenses[month][day][category]);
                }
            }
        }
    }

    if (allExpenses.length === 0) return null;

    // Wyznaczanie mediany przy użyciu "quick select" (optymalizacja)
    function quickSelect(arr, left, right, k) {
        if (left === right) return arr[left];

        const pivotIndex = partition(arr, left, right);
        if (k === pivotIndex) return arr[k];
        else if (k < pivotIndex) return quickSelect(arr, left, pivotIndex - 1, k);
        else return quickSelect(arr, pivotIndex + 1, right, k);
    }

    function partition(arr, left, right) {
        const pivot = arr[right];
        let i = left;
        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }

    const n = allExpenses.length;
    const mid = Math.floor(n / 2);
    if (n % 2 === 0) {
        const left = quickSelect([...allExpenses], 0, n - 1, mid - 1);
        const right = quickSelect([...allExpenses], 0, n - 1, mid);
        return (left + right) / 2;
    } else {
        return quickSelect([...allExpenses], 0, n - 1, mid);
    }
}

console.log(solution1(expenses));
console.log(solution2(expenses)); 
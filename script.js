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

function solution1(expenses) {
    let allExpenses = [];

    for (const month in expenses) {
        let days = Object.keys(expenses[month]).map(Number).sort((a, b) => a - b);

        let firstSunday = null;
        for (let day of days) {
            const date = new Date(`${month}-${String(day).padStart(2, '0')}`);
            if (date.getDay() === 0) { // 0 oznacza niedzielę
                firstSunday = day;
                break;
            }
        }

        if (firstSunday !== null) {
            for (let day of days) {
                if (day > firstSunday) break;

                const dayExpenses = expenses[month][String(day).padStart(2, '0')];
                for (let category in dayExpenses) {
                    allExpenses.push(...dayExpenses[category]);
                }
            }
        }
    }

    let result = allExpenses.length > 0 ? medianSol1(allExpenses) : null;

    return result
}

function medianSol1(arr) {
    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}

console.log(`Solution1 = ${solution1(expenses)}`);  // Wynik: obliczona mediana


function solution2(expenses) {
    let allExpenses = [];

    for (const month in expenses) {
        let days = Object.keys(expenses[month]).map(Number).sort((a, b) => a - b);

        let firstSunday = null;
        for (let day of days) {
            const date = new Date(`${month}-${String(day).padStart(2, '0')}`);
            if (date.getDay() === 0) {
                firstSunday = day;
                break;
            }
        }

        if (firstSunday !== null) {
            for (let day of days) {
                if (day > firstSunday) break;

                const dayExpenses = expenses[month][String(day).padStart(2, '0')];
                for (let category in dayExpenses) {
                    allExpenses.push(...dayExpenses[category]);
                }
            }
        }
    }

    return allExpenses.length > 0 ? medianSol2(allExpenses) : null;
}

function medianSol2(arr) {
    const n = arr.length;
    if (n % 2 === 1) {
        return quickSelect(arr, Math.floor(n / 2));
    } else {
        const mid1 = quickSelect(arr, n / 2 - 1);
        const mid2 = quickSelect(arr, n / 2);
        return (mid1 + mid2) / 2;
    }
}

function quickSelect(arr, k) {
    if (arr.length === 1) return arr[0];

    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const lows = arr.filter(x => x < pivot);
    const highs = arr.filter(x => x > pivot);
    const pivots = arr.filter(x => x === pivot);

    if (k < lows.length) return quickSelect(lows, k);
    else if (k < lows.length + pivots.length) return pivot;
    else return quickSelect(highs, k - lows.length - pivots.length);
}

console.log(`Solution2 = ${solution2(expenses)}`); // Wynik: obliczona mediana


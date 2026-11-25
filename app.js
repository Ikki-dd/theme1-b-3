const submitButton = document.getElementById("Submit_Button");
const clearButton = document.getElementById("Clear_Button");

let mealData = JSON.parse(localStorage.getItem("mealData")) || {};

createTable();
displayTable();

submitButton.addEventListener("click", () => {

    const user = document.getElementById("user_button").value;

    // 登録済み判定
    if (mealData[user]) {
        alert(user + " さんは既に登録済みです。変更できません。");
        return;
    }

    const breakfast = document.querySelector(
        'input[name="Breakfast_Schedule"]:checked'
    );

    const lunch = document.querySelector(
        'input[name="Lunch_Schedule"]:checked'
    );

    const dinner = document.querySelector(
        'input[name="Dinner_Schedule"]:checked'
    );

    if (!breakfast || !lunch || !dinner) {
        alert("朝食・昼食・夕食をすべて選択してください。");
        return;
    }

    mealData[user] = {
        breakfast: breakfast.value,
        lunch: lunch.value,
        dinner: dinner.value
    };

    localStorage.setItem(
        "mealData",
        JSON.stringify(mealData)
    );

    displayTable();

    alert("登録しました。");

    document
        .querySelectorAll('input[type="radio"]')
        .forEach(radio => radio.checked = false);
});

clearButton.addEventListener("click", () => {

    if (!confirm("全ユーザーの登録情報を削除しますか？")) {
        return;
    }

    mealData = {};

    localStorage.removeItem("mealData");

    displayTable();

    document
        .querySelectorAll('input[type="radio"]')
        .forEach(radio => radio.checked = false);

    alert("全ユーザーのデータを削除しました。");
});

function createTable() {

    const table = document.createElement("table");
    table.id = "mealTable";
    table.border = "1";

    table.innerHTML = `
        <thead>
            <tr>
                <th>ユーザー</th>
                <th>朝食</th>
                <th>昼食</th>
                <th>夕食</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(table);
}

function displayTable() {

    const tbody = document.querySelector("#mealTable tbody");

    tbody.innerHTML = "";

    for (const user in mealData) {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user}</td>
            <td>${mealData[user].breakfast}</td>
            <td>${mealData[user].lunch}</td>
            <td>${mealData[user].dinner}</td>
        `;

        tbody.appendChild(tr);
    }
}
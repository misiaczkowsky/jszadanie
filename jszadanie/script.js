const storageName = "passwordManager";
var usernamesAndPasswords;

(function () {
    usernamesAndPasswords = this.getMapFromStorage(storageName);
    this.refreshList();
}) ();

function add() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    var username = usernameInput.value;
    var password = passwordInput.value;

    this.addUsernameToList(username, password);

    usernameInput.value = '';
    passwordInput.value = '';;
}

function addUsernameToList(username, password) {
    this.usernamesAndPasswords.set(username, password);

    this.refreshList();
    this.saveStorage();
}

function refreshList() {
    var listElement = document.getElementById("passwordList");
    listElement.innerHTML = '';

    for (const [key, value] of this.usernamesAndPasswords.entries())
    {
        var newRow = this.getListElement(key, value);
        listElement.append(newRow);
    }
}

function getListElement(username, password) {
    var rowHtml = `Użytkownik: ${username} hasło: ${password}.`;
    var rowElement = document.createElement("li");
    rowElement.innerHTML = rowHtml;
    return rowElement;
}

function saveStorage() {
    this.saveMapToStorage(storageName, this.usernamesAndPasswords);
}

function saveMapToStorage(key, map) {
    var mapJson = JSON.stringify(Array.from(this.usernamesAndPasswords.entries()));
    localStorage.setItem(key, mapJson);
}

function getMapFromStorage(key) {
    var storage = localStorage.getItem(key);
    if (!storage){
        return new Map();
    }
    return new Map(JSON.parse(storage));
}
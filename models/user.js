class User {
    constructor(name, password, email) {
        this._name = name;
        this._password = password;
        this._email = email;
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    getPassword() {
        return this._password;
    }
    setPassword(password) {
        this._password = password;
    }
    getEmail() {
        return this._email;
    }
    setEmail(email) {
        this._email = email;
    }
}
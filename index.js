function Customer(name, age) {
    this.name = name;
    this.age = age;
}

function Car(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.owner = null;
}

const assignOwner = function (owner) {
    this.owner = owner;
}

const showThis = function () {
    console.log(this);
}

const messages = {
    LESS_THEN: 'Вы ввели не корректнное значение, минимально допустимое значение 0, попробуйте еще раз!',
    MORE_THEN: 'Вы ввели не корректнное значение, максимальное допустимое значение 200, попробуйте еще раз!',
    TO_SHORT: 'Вы ввели не корректнное значение, значение слишком короткое, попробуйте еще раз!',
    TO_LONG: 'Вы ввели не корректнное значение, значение слишком длинное, попробуйте еще раз!',
    WRONG_TYPE: 'Вы ввели не корректнное значение, попробуйте еще раз!',
    EMPTY: 'Вы ввели не корректнное значение, значение не может быть пустым, попробуйте еще раз!'
}

const getUserInfo = (message, validateRule, errorMessages = {}) => {
    const retryGetInfo = () => getUserInfo(message, validateRule, errorMessages);
    const val = prompt(message);

    if (val === null) {
        return;
    }

    switch (validateRule.type) {
        case 'number':
            const validTypeVal = Number(val);

            if (isNaN(validTypeVal)) {
                alert(errorMessages.WRONG_TYPE || 'WRONG_TYPE');
                return retryGetInfo();
            }

            if (typeof validateRule.max !== 'undefined' && validateRule.max < validTypeVal ) {
                alert(errorMessages.MORE_THEN || 'MORE_THEN');
                return retryGetInfo();
            }

            if (typeof validateRule.min !== 'undefined' && validateRule.min > validTypeVal ) {
                alert(errorMessages.LESS_THEN || 'LESS_THEN');
                return retryGetInfo();
            }

            return  validTypeVal;
        case 'string':
            if (val === '') {
                alert(errorMessages.EMPTY || 'EMPTY');
                return retryGetInfo();
            }

            if (typeof validateRule.maxLength !== 'undefined' && validateRule.maxLength < val.length ) {
                alert(errorMessages.TO_LONG || 'TO_LONG');
                return retryGetInfo();
            }

            if (typeof validateRule.minLength !== 'undefined' && validateRule.minLength > val.length ) {
                alert(errorMessages.TO_SHORT || 'TO_SHORT');
                return retryGetInfo();
            }

            return  val;
        default:
            return val
    }
}

const isEmptyUserInfo = (data) => {
    return Object
        .keys(data)
        .some(key => typeof data[key] === 'undefined');
}

(() => {
    const customerUserData = {
        name: getUserInfo('Введите ваше имя', { type: 'string', minLength: 3 }, messages),
        age: getUserInfo('Введите ваш возраст', {type: 'number', min: 0, max: 200 }, messages),
    }

    if (isEmptyUserInfo(customerUserData)) {
        console.log('Не все данные были введены');
        return;
    }

    if (customerUserData.age < 18) {
        console.log('К сожалению мы не можем продать вам автомобиль, потому что вам меньше 18!');
        return;
    }

    const customer = new Customer(customerUserData.name, customerUserData.age);
    showThis.apply(customer, []);

    const carUserData = {
        brand: getUserInfo('Введите бренд автомобиля', { type: 'string', minLength: 1 }, messages),
        model: getUserInfo('Введите модель автомобиля', { type: 'string', minLength: 3 }, messages),
        color: getUserInfo('Введите цвет автомобиля', { type: 'string', minLength: 1 }, messages),
    }

    if (isEmptyUserInfo(carUserData)) {
        console.log('Не все данные были введены');
        return;
    }

    const car = new Car(carUserData.brand, carUserData.model, carUserData.color);
    const showCar = showThis.bind(car);
    showCar();

    assignOwner.call(car, customer);
    showCar();
})()

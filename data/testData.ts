import { faker } from '@faker-js/faker'

export const newUser1 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    city: faker.location.city(),
    country: 'Ukraine',
    phone: `+380${faker.string.numeric(9)}`,
    street: faker.location.street(),
    zipCode: faker.location.zipCode('#####')
}

export const cardData = {
    cardNumber: faker.finance.creditCardNumber('################'),
    cardDate: '01/28',
    cardCVV: faker.finance.creditCardCVV()
}

export const apiDataPost = {
    title: 'Hello',
    body: 'Test body',
    userId: 1,
}

export const apiDataPatch = {
    title: 'Hello AQA'
}
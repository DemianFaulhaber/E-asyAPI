import {MercadoPagoConfig, Payment} from "mercadopago"

const client = new MercadoPagoConfig({accessToken: 'TEST-8751264754839642-082923-a63cb23f03114c4a8fc27fc6ce1d2917-812622517',options:{timeout:5000}})

export const createOrder = (req, res) => {
    const payment = new Payment(client)
    const body = {
        transaction_amount: 1000,
        description: '<DESCRIPTION>',
        payment_method_id: 'rapipago',
        payer: {
            email: 'test@email.com'
        },
    }
    payment.create({body})
    .then(console.log)
    .catch(console.log)

}
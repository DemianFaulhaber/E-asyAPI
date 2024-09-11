import {MercadoPagoConfig, Preference} from "mercadopago"

const client = new MercadoPagoConfig({accessToken: 'TEST-8751264754839642-082923-a63cb23f03114c4a8fc27fc6ce1d2917-812622517'})

export function CreatePreference(req, res){
    const plan = req.body.plan
    console.log(plan)
    const preference = new Preference(client)
    let body = {}
    switch(plan){
        case "mensual":
            body = {
                items: [
                    {
                    id:'mensual',
                    unit_price: 10500,
                    quantity: 1,
                    title: "mensualidad",
                }
                ]
            }
            break;
        case "anual":
            body = {
                items: [
                    {
                    id:'anual',
                    unit_price: 180000,
                    quantity: 1,
                    title: "anual",
                }
                ]
            }
            break;
    }
    preference.create({body})
    .then(r=>res.status(200).json(r.sandbox_init_point) )
    .catch(error => res.json({"message": error}))
}


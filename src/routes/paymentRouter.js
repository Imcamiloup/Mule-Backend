import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const { ACCESS_TOKEN } = process.env;
const paymentRouter = Router();

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

paymentRouter.post("/", async (req, res) => {
  const { id, title, quantity, unit_price } = req.body;

  const idempotencyKey = req.headers["x-idempotency-key"];

  try {
    const preference = new Preference(client);

    const createPreference = await preference.create({
      body: {
        payment_methods: {
          excluded_payment_types: [
            {
              id: "atm",
            },
            {
              id: "ticket",
            },
            {
              id: "bank_transfer",
            },
          ],
          installments: 12,
          default_installments: 1,
        },

        items: [
          {
            id,
            title,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
            currency_id: "COP",
          },
        ],
        back_urls: {
          success: "www.google.com",
          failure: "www.google.com",
          pending: "www.google.com",
        },
      },
      idempotencyKey,
    });

    res.status(200).json(createPreference.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default paymentRouter;

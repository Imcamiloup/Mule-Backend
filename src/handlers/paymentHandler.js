import { MercadoPagoConfig, Preference } from "mercadopago";

const { ACCESS_TOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

export const createPreferenceHandler = async (req, res) => {
  const { id, title, quantity, unit_price, payer, shipments } = req.body;

  const idempotencyKey = req.headers["x-idempotency-key"];

  try {
    const preference = new Preference(client);

    const createPreference = await preference.create({
      body: {
        payment_methods: {
          installments: 12,
          default_installments: 1,
        },
        payer,
        shipments,
        items: [
          {
            id,
            title,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "http://localhost:3000/payments/success",
          failure: "http://localhost:3000/payments/failure",
          pending: "http://localhost:3000/payments/pending",
        },
      },
      idempotencyKey,
    });

    res.status(200).json(createPreference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw Error("Missing id field");

    const paymentById = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (!paymentById) throw Error("Error getting payment");

    const response = await paymentById.json();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPayments = async (req, res) => {
  const { sort, criteria, external_reference, range, begin_date, end_date } =
    req.query;
  try {
    const queryParams = new URLSearchParams();

    if (sort) queryParams.append("sort", sort);
    if (criteria) queryParams.append("criteria", criteria);
    if (external_reference)
      queryParams.append("external_reference", external_reference);
    if (range) queryParams.append("range", range);
    if (begin_date) queryParams.append("begin_date", begin_date);
    if (end_date) queryParams.append("end_date", end_date);

    const queryString = queryParams.toString();

    const payments = await fetch(
      `https://api.mercadopago.com/v1/payments/search${
        queryString ? "?" + queryString : ""
      }`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const response = await payments.json();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const successPayment = (req, res) => {
  res.json("Payment succes");
};
export const FailurePayment = (req, res) => {
  res.json("Payment failure");
};
export const pendingPayment = (req, res) => {
  res.json("Payment pending");
};

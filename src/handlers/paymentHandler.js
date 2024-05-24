import { MercadoPagoConfig, Preference } from "mercadopago";

const { ACCESS_TOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

export const createPreferenceHandler = async (req, res) => {
  const {
    id,
    title,
    quantity,
    unit_price,
    description,
    name,
    surname,
    number,
    dni,
    dimensions,
    street_name_buyer,
    street_number_buyer,
    street_name_receiver,
    city_name_receiver,
    state_name_receiver,
    street_number_receiver,
    shipment_cost,
  } = req.body;

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
        payer: {
          name,
          surname,
          phone: {
            area_code: "54",
            number,
          },
        },
        cost: shipment_cost,
        identification: {
          type: "DNI",
          number: dni,
        },
        dimensions,

        address: {
          street_name: street_name_buyer,
          street_number: street_number_buyer,
        },

        receiver_address: {
          street_name: street_name_receiver,
          city_name: city_name_receiver,
          state_name: state_name_receiver,
          street_number: street_number_receiver,
        },
        items: [
          {
            id,
            title,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
            currency_id: "COP",
            description,
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

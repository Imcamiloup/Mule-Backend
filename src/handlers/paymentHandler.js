import { MercadoPagoConfig, Preference } from "mercadopago";

const { ACCESS_TOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN,
});

export const createPreferenceHandler = async (req, res) => {
  const { id, title, quantity, unit_price, payer, pay_method, shipments } =
    req.body;

  const idempotencyKey = req.headers["x-idempotency-key"];

  function excludePaymentTypes(pay_method) {
    if (pay_method === "Credito") {
      return [{ id: "debit_card" }, { id: "bank_transfer" }, { id: "ticket" }];
    } else if (pay_method === "Debito") {
      return [{ id: "credit_card" }, { id: "bank_transfer" }, { id: "ticket" }];
    } else if (pay_method === "Efectivo") {
      return [
        { id: "credit_card" },
        { id: "bank_transfer" },
        { id: "debit_card" },
      ];
    }
  }

  try {
    const preference = new Preference(client);

    const createPreference = await preference.create({
      body: {
        payment_methods: {
          excluded_payment_types: excludePaymentTypes(pay_method),
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
          success: "https://mule-front.onrender.com",
          failure: "https://mule-front.onrender.com",
          pending: "https://mule-front.onrender.com",
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

export const getPaymentTypes = async (req, res) => {
  const petition = await fetch(
    "https://api.mercadopago.com/v1/payment_methods",
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  const data = await petition.json();

  const payMethods = data.map((elem) => {
    return {
      name: elem.name,
      payment_type_id: elem.payment_type_id,
    };
  });

  res.status(200).json(payMethods);
};

export const getPaymentsByEmail = async (req, res) => {
  const { email } = req.params;
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

    const { results } = response;

    const resultsFiltered = results.filter((result) => {
      return result.payer.email === email;
    });

    if (resultsFiltered.length === 0)
      throw Error(`Not payments found with email: ${email}`);

    res.status(200).json(resultsFiltered);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const { Client } = require("pg");

const allowedOrigins = [
  "https://docs.aiven.io",
  "http://localhost:[0-9]*",
  "https://devportal.pages.dev",
  "https://[a-zA-Z0-9]*.devportal.pages.dev",
  "https://[a-zA-Z0-9]*developer-aiven-io-preview.netlify.app", //temporary before DNS switch
];

const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
};

exports.handler = async function (event) {
  // Postgresql connection
  console.log("process.env", JSON.stringify(process.env));
  const cert = `-----BEGIN CERTIFICATE-----\n${process.env.CA_CERT}\n-----END CERTIFICATE-----\n`;
  const client = new Client({
    // Don't include sslmode=require
    connectionString: process.env.PG_URL,
    ssl: {
      ca: cert,
    },
  });

  try {
    await client.connect();
    const payload = JSON.parse(event.body);

    // doesn't do anything if honeypot is triggered
    if (!payload.honeypot_password) {
      await client.query(
        `
      INSERT INTO feedback (referrer, vote, message, created_at)
      VALUES ($1, $2, $3, $4)
      `,
        [payload.url, payload.vote, payload.message, new Date()]
      );

      await client.end();
    }
    const origin = (event.headers && event.headers.origin) || "";
    let isValidOrigin = false;
    if (origin) {
      isValidOrigin = allowedOrigins.some((item) => origin.match(item));
    }
    return {
      statusCode: 201,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: JSON.stringify(err),
        cert: JSON.stringify(cert),
      }),
    };
  }
};

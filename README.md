# Excel plugin

## Quickstart

```sh
git clone git@github.com:bitworkers-official/proplant-report-generator.git &&
npm install &&
npm run dev
```

## ❗ Important: Generate ssl certificate

For local development you need to generate a ssl certificate:

```sh
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
```

This will generate a `cert.pem` file and a `key.pem` file.

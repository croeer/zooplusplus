# Zooplusplus

Invoice management with qr code generation for zooplus invoices

![Girocode generation screenshot](/screenshots/qrcode-generation.png?raw=true "Girocode Code Generation")

## Usage

Upload zooplus invoices to create a girocode qr code, that can be used in online banking to directly create the payment without the hazzle of manually entering the invoice number and amount.

## Architecture

### .net 6 core Web Api Backend

Dependencies

- [PdfPig](https://github.com/UglyToad/PdfPig)
- [QRCoder](https://github.com/codebude/QRCoder)

### React/Typescript Frontend

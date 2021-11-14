# URL Shortener

Simple URL Shortener service made with:

- NextJS
- Firebase Firestore
- Chakra UI

## How this works

Paste any valid URL on the "**Lengthy URL**" field and click the "**Shorten ✂️**" button.

The URL will be saved in Firebase Firestore as a new document inside the "**urls**" collection.

Then, the updated saved urls list will be fetched and shown inside the table.

You can choose any slug by typing it inside the "**Slug**" field. It has to be unique as it will be used as the document's ID in Firestore.

## How to run the app locally

- Clone [this](https://github.com/JMRBDev/url-shortener) repository.
- Open the project folder with your favorite IDE and run `npm install`.
- Create a new Firebase project and activate the Firestore section.
- Get Firebase's Admin SDK credentials .json file:
  - Project settings.
  - Service accounts.
  - Firebase Admin SDK.
  - Generate new private key.
- Create a `.env` file and add the next environment variables:
  - `FIREBASE_PROJECT_ID`: Can be found inside the downloaded .json file as `"project_id"`.
  - `FIREBASE_CLIENT_EMAIL`: Can be found inside the downloaded .json file as `"client_email"`.
  - `FIREBASE_PRIVATE_KEY`: Can be found inside the downloaded .json file as `"private_key"`.
    - This one has to be a bit modified for it to work properly when deployed in Vercel.<br>*Example*: `FIREBASE_PRIVATE_KEY={"privateKey": "<actual key>"}`.

<br>
<br>

`Made with 💚 by JMRBDev`

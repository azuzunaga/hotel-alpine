# Hotel Alpine
## An Employee Directory Web Application

### Working on Hotel Alpine Locally

#### Linting
1. Run `npm install` in the main directory.

#### Setting-up
1. Make sure you are using node version `10.13.0`.
    * Note: Using a version manager like [`nvm`](https://github.com/creationix/nvm#installation) will make your life easier.
2. [Install Prisma](https://github.com/prisma/prisma#quickstart)
    1. If you don't have one already, [create a Prisma account](https://app.prisma.io/login)
    2. In your terminal, run `prima init`. Configure as you wish, but I recommend option `Demo server` to get going the fastest.
        1. If you chose demo server, choose the region with the smallest latency, accept defaults for `service name` and `stage name`, and finally, don't generate a Prisma client.
        2. Run `prisma deploy` and make note of the HTTP database endpoint.
3. Install [`graphql-cli`](https://github.com/creationix/nvm#installation) globally.
4. In the `backend` directory, make a copy of the environment variables file by running `cp .env.sample .env`. Fill in the `.env` file with your prisma secret (generate by running `prisma token`) and the HTTP db endpoint.
5. In the `frontend` directory, make a copy of the `.env.sample.js` and fill in your cloudinary upload URL.
    * *Note: This URL will be public once you deploy your site. However, it won't be checked into version control*.
    1. To get going with cloudinary, [create or login](https://cloudinary.com/users/login) into your account. Go to *Settings*, *Upload*, and scroll down to *Upload presets*. Click on *Add upload preset*.
    2. Under *Storage and access*, add a *Folder* name. Under *Signing Mode*, select `Unsigned`. Under *Access Mode*, select `Public`.
    3. Under *Upload manipulations*, click *Edit* under *Incoming Transformation*.
    4. Set *Mode* to `Crop`, set *Width* and *Height* to `400`, set *Gravity* to `Face`, and set *Corner radius* to `max`.
    5. Click on *Chain Transformation*. In the new fields, set *Mode* to `Scale`, and set *Width* and *Height* to 200.
    6. Click *OK*, and *Save*.
    7. Back in your Cloudinary dashboard, click *More* in the *Account Details* section, and write down your *API Base URL*.
    8. In your .env.js file, paste the cloudinary API url, and add `/yourfoldernamefromstep2` to the end of it.

#### Running the app locally
1. In your terminal, `cd` into the `frontend` directory and run `npm install`. Do the same with the `backend` directory.
2. In your terminal, run `npm run dev` in the `backend` directory. Do the same in the `frontend` directory.
3. You can now see the site on `localhost:8000`🎉.

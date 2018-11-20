# Hotel Alpine
## An Employee Directory Web Application
Made using Next.js, React.js, and Apollo on the frontend and GraphQL Yoga/Prisma on the backend.

## Contents
* [Working on the app](#working-on-hotel-alpine-locally)
* [Running it locally](#running-the-app-locally)
* [Features](#features)

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

### Running the app locally
1. In your terminal, `cd` into the `frontend` directory and run `npm install`. Do the same with the `backend` directory.
2. In your terminal, run `npm run dev` in the `backend` directory. Do the same in the `frontend` directory.
3. You can now see the site on `localhost:8000`🎉.

### Features

Hotel Alpine's site allows users to view, create, update, and delete employees. Additionally, users can search for employee by name or across employee fields such as department, title, or location.

The application was built using Next.js, React.js and Apollo on the frontend. Next.js renders the application server-side, which simplifies routing, speeds-up page load times, and in the case of production applications, optimizes for SEO by serving the initial HTML from the server. Additionally, by using Apollo, the application data is managed client-side, reducing database queries and ensuring a single source of truth.

On the backend, Prisma and GraphQL Yoga were chosen for the ease of database deployment and server configuration, respectively. An added benefit of Prisma is that it generates a GraphQL schema to which application requests can be forwarded directly, or modified to adapt to any custom data handling.

#### Employee directory and search
Employee search narrows down results by all available text fields, from Name to Location.

![User search](https://res.cloudinary.com/lucha/image/upload/v1542738412/hotelalpine/ha_user_search.gif)

#### Employee creation, updating and deleting
Users can input employee information directly, or use the *Generate Random User* button to prefill user information. User uploaded images are modified to center on a person's face and cropped.

![User creation](https://user-images.githubusercontent.com/17498598/48795954-2d69a700-ecb3-11e8-98e0-04e20ce0a809.gif)


### Missing features and improvements
Some of the missing features and improvements that could be made to this application are:
* Authentication, permission-based creation, deletion, and updating.
* Debouncing user search input to reduce db queries.
* Ability to edit and delete Locations and Departments.
* Styling, in particular, making the site layout more responsive.

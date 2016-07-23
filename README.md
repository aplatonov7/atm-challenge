## Simple react-redux-webpack-express boilerplate

Minimal (not really) setup for small-scoped frontend challenges. Contains:
* React
* Redux (with thunk and redux-forms)
* Webpack (with HMR setup)
* Express (serving webpack in dev and static files in prod)
* CSS modules with SASS
* ES6, obviously

Run in development via "npm run dev"

Run in production via "npm start"

As a bonus, there is also "npm run gen name=ComponentName container(optional)" script, that can be used to generate React components\containers.

Also has a Dockerfile in it, because why not.
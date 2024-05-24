# voosh-assignment

<a href="https://documenter.getpostman.com/view/25047149/2sA3QqfsSo">POSTMAN DOCUMENTATION</a>

<a href="https://github.com/aritrasen12345/voosh-assignment">GitHub Repo</a>

<a href="https://voosh-assignment-1in7.onrender.com/">Render Deploy Link</a>

```bash
// .env for API

MONGODB_CONNECTION_STRING=xxxxxxxxxxxxxxxxxxxxxxxxxx
BACKEND_BASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=xxxxxxxxxxxxxx
NODE_ENV=xxxxxxxxx
ACCESS_TOKEN_SECRET_KEY=xxxxxxxxxxxxx
SALT=xxxxxxx
```

## Start Server

```bash
git clone https://github.com/aritrasen12345/voosh-assignment.git
cd voosh-assignment
npm install
npm start
```

## Test Endpoint

- Test - GET /

## Auth Endpoint

- Login - POST /auth/login
- SignOut - GET /auth/signout
- Register - POST /auth/register

## Profile Endpoint

- Get Profiles - Get /profile/all
- Get Profile Details - Get /profile
- Toggle User Profile View - GET /profile/toggle
- Update User Profile - PUT /profile/
- Update Profile Pic - PUT /profile/photo

## Dummy User(For Login)

- email: test@email.com
- password: Test@12345

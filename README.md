# Auth Test Task API

**Stack**

- NestJS
- Node.js `v22+`
- MongoDB
- Mongoose

**Features**

- POST `/api/v1/add-user` to create a user and log the record.
- GET `/api/v1/get-users` with pagination and optional filters by `name`, `email`, `phone`.
- GET `/api/v1/get-user/:id` to fetch a user by id.
- JWT auth via `Authorization: Bearer <token>`.
- Auto-seeding of `2,000,000` users on startup if DB is empty.

**Environment**
Create `.env` from the example and set values.

```bash
cp .env.example .env
```

**Docker (MongoDB)**

```
docker-compose up --build
```

**Install**

```bash
npm install
```

**Run**

```bash
npm run start
```

**Auth Token**

```bash
curl -X POST http://localhost:3000/api/v1/auth/token
```

**Swagger**
Open `http://localhost:3000/api/docs`

**Add User**

```bash
curl -X POST http://localhost:3000/api/v1/add-user \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"+380501234567","birthDate":"1990-01-01"}'
```

**Get Users**

```bash
curl "http://localhost:3000/api/v1/get-users?page=1&limit=50&email=john@example.com" \
  -H "Authorization: Bearer <token>"
```

**Get User By Id**

```bash
curl "http://localhost:3000/api/v1/get-user/<id>" \
  -H "Authorization: Bearer <token>"
```

**Notes**

- Filtering uses exact matches on normalized fields.
- Pagination defaults: `page=1`, `limit=50`. Max `limit=200`.

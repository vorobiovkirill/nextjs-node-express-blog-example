## Getting Started

#### Install npm dependencies:

Install dependencies for your [`backend`](./backend). Open a terminal window and install the `backend`'s dependencies

```bash
cd backend
npm install
```

Open a separate terminal window and navigate to your [`frontend`](./frontend) directory and install its dependencies

```bash
cd frontend
npm install
```

### 2. Create and seed the database (backend)

On the terminal window used to install the backend npm dependencies, run the following command to create your SQLite database file. This also creates the `User` and `Posts` tables that are defined in [`prisma/schema.prisma`](./backend/prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./backend/prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Start the server (backend)

On the same terminal used in step 2, run the following command to start the server:

```bash
npm run dev
```

The server is now running at [`http://localhost:3001/`](http://localhost:3001/).

### 4. Start the app (frontend)

On the terminal window used to install frontend npm dependencies, run the following command to start the app:

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

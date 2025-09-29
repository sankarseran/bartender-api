# Bartender API

A simple Node.js + TypeScript HTTP API that simulates a bartender serving drinks.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sankarseran/bartender-api.git
cd bartender-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

* Uses **nodemon + ts-node** for automatic reloads on changes.

### 4. Build the project

```bash
npm run build
```

* Compiles TypeScript into JavaScript inside the `dist/` folder.

### 5. Run in production

```bash
npm start
```

### API Documentation

Once the server is running, Swagger UI is available here [http://localhost:3000/docs/](http://localhost:3000/docs/)


## Assumptions & Design Decisions

### 1. Idempotency
- Duplicate order submissions are prevented using **customer-specific checks**:
  - For the same `customerId` and `drinkType`, if there is an active order with status `PREPARING`, a new order is **rejected**.
- This ensures **retries or accidental duplicates** do not result in multiple servings.

### 2. Concurrency Rules
- **Global bartender capacity**:
  - Maximum 2 beers at the same time or 1 non-beer drink at the same time (across all customers). orders exceeding these limits are rejected immediately.

### 3. Drink Preparation Time and Avilable Bartender
- Default drink preparation time 5 seconds and bartender is count is 1.
- Configurable via environment variable `PREP_TIME` (in seconds) and `BARTENDERS` in number

  ```bash
  PREP_TIME=10 BARTENDERS=2 npm run dev
  ```

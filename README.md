# Notification Service

## How to run the project

0. Create `.env` file and use the correct node version:

```bash
cp .env.dist .env
nvm use
```

Make sure you’re using the correct Node.js version as specified in `.nvmrc`.

#### 1. Run local database:

```bash
docker compose up -d
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Migrate database:

```bash
npm run db:migrate
```

4. Run server:

```bash
npm start
```

#### 5. Run tests (optional):

```bash
npm run test
```

This will run both unit and integration tests using an in-memory database setup.

#### 6. Import insomnia

You can import the Insomnia workspace from the `docs/` directory to explore and test available endpoints.

## Database Schemas

#### Table Name: UserPreferences

##### Purpose

This table stores user-specific notification preferences including:

- Which event types the user wants to receive notifications for
- Which notification channels (email, SMS, push) are enabled for each event
- The user’s “Do Not Disturb” (DND) time windows to suppress notifications

**Primary Key**

Partition Key (PK): userId (string)
This uniquely identifies each user’s preferences document.
Each item represents all preferences for one user.

**Attributes**

userId (uuid)
Unique identifier for the user.
Serves as the partition key for fast lookup of a user’s preferences.

preferences (map / object)
Stores per-event notification settings as a map of eventType → Preference object:

```json
{
  "item_shipped": {
    "enabled": true,
    "channels": ["email", "sms"]
  },
  "order_delivered": {
    "enabled": false,
    "channels": []
  }
}
```

dndWindows (list of maps / array of objects)
Represents the user’s “Do Not Disturb” schedule as a list of time windows:

````json
[
  { "dayOfWeek": "0", "start": "22:00", "end": "06:00" },
  { "dayOfWeek": "6", "start": "00:00", "end": "23:59" }
]```
````

---

#### Table Name: Events

**Primary Key**

Partition Key (PK): eventId (uuid)
Unique identifier for the event.

Events are immutable and append-only, so a simple primary key is sufficient.

**Global Secondary Index (GSI)**

Index Name UserIdIndex
Partition Key userId
Sort Key timestamp
Projection KEYS_ONLY

**Attributes**

eventId
Unique ID for the event (PK)

userId
ID of the user associated with the event

timestamp
ISO 8601 timestamp when the event occurred

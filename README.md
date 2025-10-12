# Content API Documentation

This repository provides a simple Node.js backend for content management, including endpoints to **fetch**, **update**, and **delete** content from a database.

---

## 🗄️ About `packlydb.sql`

The `packlydb.sql` file in this repository contains the complete SQL schema for the application's database. It is intended for initializing the MySQL database used by the backend.

### What's inside?

- **Table Definitions**:

  - `auth`: Stores user authentication info like username, email, password, role, and pins.
  - `content`: Stores content types (text, banners, cards, etc.) with title, image, order, ability.
  - `login_activity`: Tracks user logins for audit and security purposes.
  - `users`: Stores user profile information linked to `auth`.

- **Indexes**: Each table includes indexes or primary keys for fast lookup and data integrity.

- **Auto-increment Settings**: Ensures unique IDs are automatically generated for new records.

- **Example Data**: May include sample rows to populate your database with demo data.

### How To Use

1. Create a new MySQL database if you don’t have one already.
2. Run the contents of `packlydb.sql` using a MySQL client or through phpMyAdmin. This will set up the whole database schema and initial data.
   ```bash
   mysql -u your_db_user -p your_database < packlydb.sql
   ```
3. Update your connection settings in `src/utils/setting.js` to point to your running database.

> **Tip:** This database file is crucial for local development and first setup of the backend API!

## 🚀 How to Run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure your database**

   - Update your database connection settings in `src/utils/setting.js` as needed.

3. **Start the server**
   ```bash
   npm start
   ```

---

## Project Feature Overview

This project fully implements a content management backend with the following requirements:

### Content Management

- **Support multiple content types**: The backend handles different content types (text, banner, card, etc.) via the `content` table (see database schema in `packlydb.sql`).
- **Order/Sequence Handling**: Each content item includes an `order` field to control its display sequence in the UI and APIs.
- **Activate/Deactivate Content**: Each item has an `ability` (or similar) field allowing it to be activated/deactivated.

### API Endpoints

All endpoints are defined in [`/src/controller/routes.js`](src/controller/routes.js), exposed via the Express app (`app.js`):

- **Retrieve all content**
  - `GET /content/all`
  - Fetches all content items, ordered by their `order` field.
  - Supports query parameters for pagination (`?page=1&limit=10`), filtering by type (`?type=text`) and ability (`?ability=active`).
- **Retrieve a single content item**
  - `GET /content/:id`
  - Fetches a content item by its unique identifier. If the ID does not exist or is invalid, returns 404 with a meaningful error message.
- **Create new content**
  - `POST /content/add`
  - Accepts content data in the request body. Validates all required fields; returns status code with missing/invalid inputs.
- **Update an existing content item**
  - `PUT /content/:id`
  - Updates a given content item by its identifier. Validates input and returns appropriate errors for non-existent items or invalid data.
- **Delete content**
  - `DELETE /content/:id`
  - Deletes a content item. Returns a 404 error if the item does not exist.

### Ordering and Bulk Reordering

- **Dynamic reordering**
  - `PATCH /content/reorder`
  - Supports bulk reordering of multiple content items by accepting an array of `{id, order}` pairs in the request body. Ensures no conflicts (e.g., duplicate orders) and adjusts sequences as needed.
- **Conflict and Sequence Handling**
  - All order change endpoints ensure that after reorder operations, the sequence is continuous and free of duplicates or gaps.

### Edge Case Handling

- **Invalid identifiers**: Endpoints like `GET /content/:id`, `PUT /content/:id`, and `DELETE /content/:id` validate the identifier and return 400/404 on error.
- **Invalid query parameters**: Listing endpoints validate query/sort options, rejecting invalid sort directions or unknown parameters with a 400 error.
- **Validation**: Creation and update endpoints return a 422 status for empty or missing required fields, with clear error feedback.
- **Non-existent deletions**: `DELETE /content/:id` returns 404 if the item does not exist.

### Pagination and Filtering

- The `GET /content/all` endpoint accepts pagination via `page` and `limit` query parameters, as well as filtering (e.g., by content type, ability).

### Role-Based Access Control

- Middleware in [`/src/hooks/checkUser.js`](src/hooks/checkUser.js) restricts certain endpoints (e.g., creation, update, delete, reorder) to users with the appropriate roles/permissions.

### Industry Standards & API Documentation

- **RESTful design**: HTTP verbs and resource URIs follow REST best practices.
- **Status codes**: Returns 200 for success, 201 for creation, 400 for bad requests, 404 for not found, 422 for validation errors, etc.
- **Error messages**: All errors include meaningful, user-friendly messages.
- **Clean code**: Modular Express design using controllers and middleware (see `app.js` and `/src/controller/routes.js`).
- **Swagger/OpenAPI documentation**: Complete, up-to-date docs available at [`GET /api-docs`](http://localhost:5000/api-docs) or the deployed base URL, with details and try-it-out features for every endpoint.

---

Refer to the source in [`app.js`](app.js), [`src/controller/routes.js`](src/controller/routes.js), and the included Swagger/OpenAPI docs (`/api-docs`) to explore and test each endpoint and feature.

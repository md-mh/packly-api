# Content API Documentation

This repository contains a Node.js backend for content management, providing endpoints to **fetch**, **update**, **reorder**, and **delete** content stored in a MySQL database.

---

## 📝 Content Structure & Design Decisions

- **Content Type (`type` as ENUM)**: The `type` field determines the content category. Currently, supported types are `text`, `banner`, and `card`. This allows consistent handling and easy extension of content categories.
- **Type-Specific Requirements**:
  - `text`: Requires a `title`.
  - `banner`: Requires an `image`.
  - `card`: Requires both `title` and `image`.
- **Extra Data (`extra_data`)**: The optional `extra_data` field (stored as JSON) enables future extensibility, accommodating additional properties without altering the main schema.
- **Display Order**: `order` field defines the sequence for displaying content.
- **Ability Flag**: `ability` (boolean or integer) flags content as enabled or disabled for toggling and status management.
- **Ownership (`auth_id`)**: Tracks the user responsible for creating each content item, supporting attribution and auditing.

This structure ensures strong validation, type awareness, and future scalability.

## 🗄️ Database: `packlydb.sql`

The `packlydb.sql` file provides the full MySQL database schema for this backend.

#### Included Tables:

- `auth`: Handles user authentication — username, email, password, role, pins.
- `content`: Manages all content items, with fields for type, title, image, order, ability, extra_data, etc.
- `login_activity`: Logs user login history for security review.
- `users`: Stores additional profile info for each user, linked to `auth`.

- **Table Definitions**:

#### Database Setup

1. Create a new MySQL database.
2. Import `packlydb.sql` (use a MySQL command-line client or phpMyAdmin).
3. Edit your connection settings in `src/utils/setting.js` to match your local environment.

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Database configuration**
   - Update `src/utils/setting.js` with your MySQL credentials.
3. **Run the server**
   ```bash
   npm start
   ```

---

## Feature Overview

### Content Management

- **Supports Multiple Types**: Handles `text`, `banner`, `card`, and easily extendable for more.
- **Flexible Ordering**: The `order` field sets display sequence for all content items.
- **Enable/Disable**: Use the `ability` field to toggle visibility or status.

### API Endpoints Overview

_All endpoints implemented in [`src/controller/routes.js`](src/controller/routes.js) and registered by the Express app (`app.js`)._

- **GET /content/all**  
  Returns all content items, ordered by `order`.
  - Supports: `?page`, `?limit`, `?type`
- **GET /content/:id**  
  Returns a single content item by its ID.
  - 404 returned if not found or invalid.
- **POST /content/add**  
  Creates new content.
  - Requires valid fields depending on type.
- **PUT /content/:id**  
  Updates an existing content item.
  - 404 if not found; 422 for invalid input.
- **DELETE /content/:id**  
  Deletes an item by ID.
  - 404 if not found.
- **PATCH /content/bulk-orders**  
  Bulk update the `order` of multiple items by `{id, order}` in request body.
  - Handles gaps and duplicates, enforces continuous sequence.

### Ordering & Reordering

- Bulk ordering ensures no duplicate or missing `order` values post-operation.
- Backend checks prevent conflicts.

### Edge Case & Error Handling

- Clear 400/404 errors for invalid or missing IDs.
- 400 for bad query params (e.g., invalid sort).
- 422 for failed validation (missing required fields).
- Non-existent resource on deletion yields 404.

### Pagination & Filtering

- `GET /content/all` supports `page`, `limit`, and filtering by content type or title.

### Role-Based Access Control

- Middleware in [`/src/hooks/checkUser.js`](src/hooks/checkUser.js) restricts certain endpoints (e.g., creation, update, delete, reorder) to users with the appropriate roles/permissions.

### API Documentation

- Complete and self-updating Swagger/OpenAPI docs at [`GET /api-docs`](http://localhost:5000/api-docs).

---

Refer to the source in [`app.js`](app.js), [`src/controller/routes.js`](src/controller/routes.js), and the included Swagger/OpenAPI docs [`/api-docs`](http://localhost:5000/api-docs) to explore and test each endpoint and feature.

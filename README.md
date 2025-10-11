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

## 📖 API Endpoints

### Fetch All Content (with pagination and filtering)

**GET** `/content/all`

- **Query params:**
  - `type`: filter by type (optional)
  - `search`: keyword to search in titles (optional)
  - `page`: page number (default: 1)
  - `limit`: number of items per page (default: 12)
- **Response**:
  - `success` (boolean)
  - `message` (string)
  - `data` (array of content)
  - `pagination` (pagination info)

---

### Fetch Content by ID

**GET** `/content/:id`

- **Path params:**
  - `id`: content ID
- **Response**:
  - `success` (boolean)
  - `message` (string)
  - `data` (content object)

---

### Add New Content

**POST** `/content/add`

- **Body:**

  - `type` (required): The type of content (`text`, `banner`, or `card`)
  - `title` (required): Title of the content
  - `image` (optional): Image URL (for banners/cards)
  - `order` (optional): Order or position of the content
  - `ability` (optional): Additional data or permissions (if applicable)
  - `extra_data` (optional): Any extra JSON data

- **Response:**
  - `success` (boolean)
  - `message` (string)
  - `result` (created content object)

---

### Update Content

**PUT** `/content/update`

- **Body:**
  - `id` (required)
  - `type` (required)
  - `title`, `image`, `order`, `ability`, `extra_data` (as required by type)
- **Response**:
  - `success` (boolean)
  - `message` (string)
  - `result` (update result info)

---

### Delete Content

**DELETE** `/content/:id`

- **Path params:**
  - `id`: content ID
- **Response**:
  - `success` (boolean)
  - `message` (string)
  - `result` (delete result info)

---

### Bulk Update Content Orders

**PUT** `/content/bulk-orders`

- **Body:**  
  An array of objects, each with:
  - `id` (string): The content entry's ID (required)
  - `order` (number): The new order value (required)
  ```
  [
    { "id": "content_id_1", "order": 2 },
    { "id": "content_id_2", "order": 1 }
  ]
  ```
- **Response:**
  - `success` (boolean)
  - `message` (string)
  - `result` (database update result info)
  - `invalidItem` (if any invalid item is found in the input; for 400 response)

## ⚠️ Notes

- Ensure your database is running and accessible with the correct schema/table.
- All routes return clear messages and error information where appropriate (e.g., 404 or 500 errors).

For further customization, review code in `/src/controller/content/`.

---

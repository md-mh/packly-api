# Content API Documentation

This repository provides a simple Node.js backend for content management, including endpoints to **fetch**, **update**, and **delete** content from a database.

---

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
   Or, for development with restart on changes:
   ```bash
   npm run dev
   ```

---

## 📖 API Endpoints

### Fetch All Content (with pagination and filtering)

**GET** `/content`

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

### Update Content

**PUT** `/content`

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

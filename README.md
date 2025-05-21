# Book Management App

A simple React + Vite application for managing a collection of books. Features include searching, filtering, pagination, and CRUD operations using modals.

## Features

- View a paginated list of books
- Search books by title
- Filter by genre and status
- Add, edit, and delete books (modals)
- Responsive UI with Tailwind CSS and Material UI
- State management with Redux Toolkit
- Toast notifications for actions

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd BookManagementApp
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

### Lint the Code

```sh
npm run lint
```

## Changing the API

All API logic (such as fetching, adding, updating, and deleting books) is handled in the `src/store/features/books` folder.  
You can change the API endpoints or logic by editing the files in this directory.

## Project Structure

```
src/
  components/      # UI and modal components
  dummyData/       # Sample book data
  layouts/         # Layout components
  pages/           # Page components (Dashboard)
  store/           # Redux store and features (API logic here)
  assets/          # Static assets
  App.jsx          # Main app component
  main.jsx         # Entry point
```

## Dependencies

- React
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- Material UI
- Tailwind CSS
- React Toastify

---

Feel free to customize the API logic in [`src/store/features/books`](src/store/features/books) as needed for your backend or data source.

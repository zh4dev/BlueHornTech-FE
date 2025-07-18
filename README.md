## Setup Instructions to Run the App Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/zh4dev/BlueHornTech-FE.git
   cd BlueHornTech-FE
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup .env \***

   ```bash
   Create a .env file in the root directory with the following example values:

   # Application port
   VITE_API_URL=http://localhost:3005
   VITE_PORT=3003
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. The API will be available at `http://localhost:3003` (or your defined port).

---

## Tech Stack & Key Decisions

- **React (Vite) + TypeScript**
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Zustand** for global state management
- **mitt** for event-based communication
- **Leaflet.js** for map integration and geolocation visualization
- **SweetAlert2** for alert/confirmation dialogs
- **React Router** for page routing
- **eventBus** to call a function on another page

### Why this stack?

- **React + Vite + TypeScript** React gives us a solid foundation for building interactive UIs, while Vite makes development lightning-fast with instant reloads. TypeScript adds type safety, reducing bugs and making the codebase easier to scale.
- **Tailwind CSS** With its utility first approach, Tailwind helps us build clean, responsive layouts quickly without having to write tons of custom CSS.
- **Axios** Easy to use that it offers easy request cancellation, response interception, and error handling, making data fetching more maintainable and consistent.
- **Zustand** A simple yet powerful state management library. It’s perfect for managing things like visit states and task flows without the bloat of larger solutions like Redux.
- **mitt** This tiny event library makes it easy to trigger global events—like refreshing schedules without passing props through multiple layers of components.
- **Leaflet.js** Lightweight and mobile-friendly, Leaflet is a great choice for displaying location on a map.
- **SweetAlert2** Handles success and error feedback from the backend with clean, customizable alert dialogs that improve user interaction.
- **React Router** It helps manage navigation, nested routes, and route guards, providing a smooth SPA (Single Page Application) experience.
- **eventBus** allowing decoupled components to communicate easily.

---

## Assumptions Made

- **Reusable Code**
  Since i really love that if the code that easily to maintenance and manage, i made a code to be less duplicated code, so i create a components, helpers, constants that can be used
  on another pages

- **No Authentication Required**
  The app assumes the user is always acting as a caregiver or client. There's no login, so user identity (e.g., caregiverId) is passed manually or preloaded.

- **Geolocation Access is Available**
  The browser must allow access to the Geolocation API. If permission is denied, map features and visit logging will not work correctly. A fallback is not implemented.

- **All Errors Are User-Facing**
  API errors and validation issues are shown to the user using SweetAlert2 for clarity and immediate feedback.

---

## If Given More Time, I Would...

- Implement Authentication & Role Management
- Add Unit and Integration Testing
- Use Google Maps
- Add Offline Mode
- Optimize Geolocation Fallback
- Improve UI
- Admin Dashboard
- Create separate production and development env

# CTF Platform Frontend

This is the frontend for the CTF Platform, built with React, TypeScript, and Vite.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Common/
│   │   │   ├── NotFound.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── Layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── Home.tsx
│   │   └── ... (other components)
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Features

- User authentication (login/register)
- Protected routes for authenticated users
- Profile management
- Team management
- Challenge viewing and flag submission
- Leaderboard

## API Integration

The frontend communicates with the Django REST API backend. API requests are handled by the `api.js` service, which uses Axios for HTTP requests.

### Available Endpoints

The following API endpoints are available for integration:

#### Authentication
- `POST /api/token/` - Login and obtain JWT token
- `POST /api/register/` - Register a new user

#### Profile
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/edit/` - Update user profile

#### Teams
- `GET /api/teams/` - Get all teams
- `GET /api/teams/{id}/` - Get a specific team
- `POST /api/teams/` - Create a new team
- `POST /api/team/join/` - Join a team using invite code

#### Challenges
- `GET /api/challenges/` - Get all challenges
- `POST /api/challenges/{id}/submit/` - Submit a flag for a challenge

#### Leaderboard
- `GET /api/leaderboard/` - Get the leaderboard

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, which can be served by any static file server.

## Development

### Docker Development

You can run the frontend in a Docker container with hot reloading enabled:

1. Make sure Docker and Docker Compose are installed on your system
2. From the root directory of the project, run:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will start both the backend and frontend containers. The frontend will be available at http://localhost:5173 with hot reloading enabled.

### TypeScript

This project uses TypeScript for type safety. When adding new code, make sure to:

1. Use appropriate type annotations for variables, function parameters, and return types
2. Create interfaces for component props and state
3. Use React.FC type for functional components

### Adding New Components

1. Create a new component in the appropriate directory under `src/components/` with a `.tsx` extension
2. Define interfaces for component props and state
3. Import and use the component in other components or add it to the routing in `App.tsx`

### Adding New API Services

1. Add new API service functions in `src/services/api.ts` with appropriate type annotations
2. Import and use the service functions in your components

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in localStorage and included in API requests via an Axios interceptor.

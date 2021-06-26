# ProjectHub

Place where developers manage and share their projects

Visit [WebApp](https://projecthub.vercel.app)
Visit [API Documentation](https://projecthub-express.herokuapp.com/api)

---

## Tech stack

- Frontend
  - Angular
    - NgRx (Redux) State Management
    - Angular Material (UI Components)
- Backend
  - Express (NodeJS) with TypeScript
  - Swagger/Open API Specification (API Documentation)
  - JWT (JSON Web Token) Authentication
- Database
  - MongoDB (Mongoose)
- Design/Prototype
  - Figma

## Hosting

- Vercel (Frontend)
- Netlify (Frontend [dev])
- Heroku (Backend)
- MongoDB Atlas (DBaaS)

## CI/CD

- GitHub Actions
- Vercel auto-deploy
- Netlify auto-deploy

---

## Local setup

- Rename `.env.example` to `.env`
- MongoDB
  - Run MongoDB in your local system (OR) set URI in `.env` file

- Express API

```bash
cd api-express
npm run dev
```

- Angular UI

```bash
cd ui-angular
ng serve --open
```

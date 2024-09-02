# Parcel Labs Assignment
https://parcellab.notion.site/parcelLab-Challenge-Frontend-77d17700118b44dab94ca4a5b5ecf292

### Run locally
```bash
npm i
npm run dev
```

### Project Setup And Dependencies
1. Uses `vite` for bundling and development. `react-ts` template was used to scaffold the project
2. Uses `@tanstack/react-router` routing, data loading and caching
3. Uses `zod` for validating url search query params and form validation
4. Uses `react-hook-form` for form management
5. Uses `tailwind, clsx` for styling
6. Uses `date-fns` for date formatting
7. Uses `vitest, @testing-library/react` for unit/integration tests
8. Uses `msw` for API mocking for development and tests
9. Uses `typescript` for type checking
10. Uses `eslint` for linting

### Application Flow

1. The app uses the url query params for state management
2. The tracking page is only responsible for collecting user input. By default, the `Track` button is disabled. It will be enabled once user enters the input for 2 fields.
3. Once the `Track` button is clicked, user is routed to the details page with the `orderNumber` and `zipCode` as query params
4. The details page, uses the query params to fetch the order information
5. If order is found, the order information is displayed
6. If the order cannot be found, an error message is shown with the ability for the user to navigate to the tracking page to try again

### Out of scope
1. e2e testing
2. a11y
3. Unit/Integration tests are not exhaustive of all possible cases
# Parcel Labs Assignment

### Project Setup And Dependencies
1. This project was scaffolded with vite with the `react-ts` template
2. `@tanstack/react-router` is used for routing, data loading and caching
3. `zod` is used for validating the url search query params and tracking form
4. `react-hook-form` is used for form management
5. `tailwind, clsx` used for styling
6.  `date-fns` used for date manipulation
7. `vitest, @testing-library/react` is used for writing unit/integration tests
8. `msw` for API mocking

### Architecture/Flows

1. The app is url driven, meaning the required state is store as query params
2. The tracking page is responsible for collecting user input and redirecting to the order details page with the user input as query params
3. The track button in the tracking page is only enabled if there is user input
4. The details page uses the data in query param to make an API call to render the details
5. If the order cannot be found, an error state is shown with the ability for the user to navigate to the tracking page to try again

### Considering additional points
1. e2e testing with playwright
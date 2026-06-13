# Edit User Page Prototype

Angular 21 prototype feature page for editing a user's profile and location access.

## Running locally

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Open the local URL printed by the Angular CLI, usually `http://localhost:4200/`.

## Building locally

Build the app with the same base href used by GitHub Pages:

```bash
npm run build -- --base-href /edit-user-page-prototype/
```

The production build is written under `dist/edit-user-page-prototype/`. Depending on the Angular builder output format, the deployable static files may be directly in that folder or in `dist/edit-user-page-prototype/browser/`.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

- runs on pushes to the `main` branch and can also be started manually with `workflow_dispatch`;
- installs dependencies with `npm install`;
- builds Angular with `npm run build -- --base-href /edit-user-page-prototype/`;
- copies `index.html` to `404.html` so Angular routes can refresh correctly on GitHub Pages;
- uploads the Angular build output as the GitHub Pages artifact;
- deploys the artifact with the official GitHub Pages Actions.

## Enabling GitHub Pages

1. Push these files to the repository's `main` branch.
2. In GitHub, open the repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Save the setting if prompted.
6. Push a new commit to `main` or manually run the **Deploy Angular app to GitHub Pages** workflow from the **Actions** tab.

## Finding the deployed demo URL

After the workflow completes, the demo URL is shown in the workflow run summary and in the deployment environment named `github-pages`.

For a repository named `edit-user-page-prototype`, the URL usually follows this format:

```text
https://<github-username-or-organization>.github.io/edit-user-page-prototype/
```

Replace `<github-username-or-organization>` with the GitHub account or organization that owns the repository.

## Feature interaction notes

- `EditUserProfileModule` owns the feature route and keeps the feature folder modular while the reusable UI pieces are standalone components.
- `EditUserProfilePageComponent` owns the reactive form and delegates loading, saving, typeahead searches, pagination, and location link toggles to `EditUserProfileFacade`.
- `EditUserProfileFacade` exposes RxJS state, transforms UI events into typed service calls, applies loading/saving/error state, and falls back to mock data so the page can render without a backend.
- `EditUserProfileService` is the only backend access layer. It contains typed calls for user profile persistence, location typeahead search, grouped accessible locations, and add/remove user-location links.
- Mock data under `src/app/edit-user-profile/mocks` demonstrates parent locations, sublocations, a selected primary location, and linked/unlinked accessible locations for a sample user.

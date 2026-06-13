# Edit User Page Prototype

Angular 21 enterprise-style feature page for editing a user's profile and location access.

## Feature interaction notes

- `EditUserProfileModule` owns the feature route and keeps the feature folder modular while the reusable UI pieces are standalone components.
- `EditUserProfilePageComponent` owns the reactive form and delegates loading, saving, typeahead searches, pagination, and location link toggles to `EditUserProfileFacade`.
- `EditUserProfileFacade` exposes RxJS state, transforms UI events into typed service calls, applies loading/saving/error state, and falls back to mock data so the page can render without a backend.
- `EditUserProfileService` is the only backend access layer. It contains typed calls for user profile persistence, location typeahead search, grouped accessible locations, and add/remove user-location links.
- Mock data under `src/app/edit-user-profile/mocks` demonstrates parent locations, sublocations, a selected primary location, and linked/unlinked accessible locations for a sample user.

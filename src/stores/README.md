Zustand stores for client/UI/booking state only — never for server data. Keep stores thin; use selectors at call sites, not whole-store subscriptions.

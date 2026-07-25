
export const ROLE_PERMISSIONS = {
  ADMIN: ['Dashboard', 'Analytics', 'Ledgers', 'Rider Fleet', 'Profile', 'Settings'],
  DELIVERY: ['Dashboard', 'Rider Fleet', 'Profile'],
  CUSTOMER: ['Dashboard', 'Analytics', 'Profile'],
  VIEWER: [] // Handled via PublicWebsiteView
};
export const ROLE_PERMISSIONS = {
  ADMIN: {
    canViewDashboard: true,
    canViewAnalytics: true,
    canViewLedgers: true,
    canViewCustomerWallets: true,
    canViewRiderFleet: true,
    canViewSubscriptions: true,
    canManageSettings: true,
  },
  DELIVERY: {
    canViewDashboard: false,
    canViewAnalytics: false,
    canViewLedgers: false,
    canViewCustomerWallets: false,
    canViewRiderFleet: true,
    canViewSubscriptions: false,
    canManageSettings: false,
  },
  CUSTOMER: {
    canViewDashboard: true,
    canViewAnalytics: false,
    canViewLedgers: false,
    canViewCustomerWallets: false,
    canViewRiderFleet: false,
    canViewSubscriptions: false,
    canManageSettings: false,
  },
  VIEWER: {
    canViewDashboard: false,
    canViewAnalytics: false,
    canViewLedgers: false,
    canViewCustomerWallets: false,
    canViewRiderFleet: false,
    canViewSubscriptions: false,
    canManageSettings: false,
  }
};

// Helper function to check role permissions safely
export const hasPermission = (role, permissionKey) => {
  if (!role || !ROLE_PERMISSIONS[role]) return false;
  return ROLE_PERMISSIONS[role][permissionKey] === true;
};
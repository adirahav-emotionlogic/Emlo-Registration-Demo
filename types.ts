
export interface User {
  externalId: string;
  organizationExternalId: string;
  token: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  permissions: Record<string, { rules: any[] }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  user?: T;
  message?: string;
}

export interface Role {
  technicalId: string;
  displayName: string;
}

export interface ManagedUser {
  externalId: string;
  email: string;
  status: string;
  isOrganizationOwner: boolean;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

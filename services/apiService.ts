
import { ApiResponse, Role, ManagedUser, User } from '../types';

// Simulated delay to mimic network latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Local state for mocked users list during session
let mockUsersList: ManagedUser[] = [
  {
    externalId: "admin-id-001",
    email: "admin@emlo.com",
    status: "active",
    isOrganizationOwner: true,
    firstName: "System",
    lastName: "Admin"
  }
];

export const apiService = {
  async register(data: any): Promise<ApiResponse<{ email: string }>> {
    console.log('Mock Register Request:', data);
    await sleep(800);
    return {
      success: true,
      data: { email: data.user.email }
    };
  },

  async verifyEmail(data: any): Promise<ApiResponse<User>> {
    console.log('Mock Verify Request:', data);
    await sleep(1000);
    
    // Return a user with full permissions for testing
    return {
      success: true,
      user: {
        externalId: "mock-user-123",
        organizationExternalId: "mock-org-456",
        token: "mock-jwt-token-xyz",
        email: data.email,
        permissions: {
          'users_management': { rules: [] },
          'user_read': { rules: [] },
          'user_add_delete': { rules: [] },
          'user_edit': { rules: [] }
        }
      }
    };
  },

  async getManagementMetadata(token: string): Promise<ApiResponse<{ roles: Role[] }>> {
    await sleep(500);
    return {
      success: true,
      data: {
        roles: [
          { technicalId: "organization_admin", displayName: "Organization Admin" },
          { technicalId: "organization_user", displayName: "Organization User" }
        ]
      }
    };
  },

  async inviteUser(orgId: string, token: string, userData: any): Promise<ApiResponse<ManagedUser>> {
    console.log('Mock Invite Request:', userData);
    await sleep(800);
    
    const newUser: ManagedUser = {
      externalId: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      status: "active",
      isOrganizationOwner: false,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
    
    mockUsersList.push(newUser);
    
    return {
      success: true,
      data: newUser
    };
  },

  async listUsers(orgId: string, token: string): Promise<ManagedUser[]> {
    await sleep(600);
    return [...mockUsersList];
  }
};

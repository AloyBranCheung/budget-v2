export type GetUserType = {
  auth0User: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  dbUser: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    auth0Id: string;
    image: string;
  };
} | null;

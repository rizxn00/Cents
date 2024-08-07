// types/request.d.ts
import { Request } from 'express';

interface User {
  userId?: string;
}

interface AuthenticatedRequest extends Request {
  user?: User; 
}

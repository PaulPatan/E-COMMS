export { }

type User = {
  id: string;
  role: 'seller' | 'buyer' | 'admin';
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
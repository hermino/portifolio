export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SendContactMessage {
  name: string;
  email: string;
  message: string;
}

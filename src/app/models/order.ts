import { Address } from './address';
import { Cart } from './cart';
import { Payment } from './payment';

export interface Order {
  address?: Address;
  payment?: Payment;
  cart?: Cart;
  id?: number;
  date?: string;
  userEmail?: string;
}

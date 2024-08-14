import { v4 } from 'uuid';

export const generateProductId = () => `prd-${v4().slice(0, 8)}`;
export const generateUserId = () => `usr-${v4().slice(0, 8)}`;

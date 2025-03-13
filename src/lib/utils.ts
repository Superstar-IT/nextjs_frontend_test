import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Address } from "@/app/users/components/user-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: Address): string {
  return `${address.suite} ${address.street}, ${address.city}, ${address.zipcode}`;
}

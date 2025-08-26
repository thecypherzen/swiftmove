import { randomImages } from "@/mock_data/RandomImages";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomImageUrl = () => {
  const index = Math.floor(Math.random() * 100) % randomImages.length;
  return randomImages[index];
};

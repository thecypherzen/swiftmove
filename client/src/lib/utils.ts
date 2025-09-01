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

export const getDateString = (
  date: Date,
  locale: Intl.LocalesArgument = "en-GB",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
) => {
  return date.toLocaleDateString(locale, { ...options });
};

export const getTimeStringFromDate = (date: Date, options = { digits: 2 }) => {
  const mstr = String(date.getMinutes()).padStart(options.digits, "0");
  const hstr = String(date.getHours()).padStart(options.digits, "0");
  return `${hstr}:${mstr}`;
};

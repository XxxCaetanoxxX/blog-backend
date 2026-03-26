import { generateRandomSuffix } from "./generate-random-suffix";
import { slugiy } from "./slugify";

export function createSlugFromText(text: string) {
    const slug = slugiy(text);
    return `${slug}-${generateRandomSuffix()}`
}
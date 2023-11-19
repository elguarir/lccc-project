export function extractInitialsFromName(name: string | null | undefined): string {
  // Split the name into words
  if (!name) return "";
  const words = name.trim().split(/\s+/);

  // Initialize an array to store the initials
  const initials: string[] = [];

  // Iterate through the words to extract initials
  for (const word of words) {
    // Check if the word is not empty and consists of letters
    if (word && /^[A-Za-z]+$/.test(word)) {
      // Add the uppercase initial of the word to the initials array
      initials.push(word[0].toUpperCase());
    }
  }

  // Return the first two initials as a string
  return initials.slice(0, 2).join("");
}

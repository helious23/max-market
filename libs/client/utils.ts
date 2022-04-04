export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

type Variants = "avatar" | "product" | "list" | "public";

export function makeImageUrl(imageId: string, variant: Variants) {
  return `https://imagedelivery.net/d55zduLA8eIYW_0FqFpUmQ/${imageId}/${variant}`;
}

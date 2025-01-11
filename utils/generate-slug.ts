const generateSlug = (input: string): string =>
  input.trim().replace("_", "-").replace(" ", "-").toLowerCase();

export default generateSlug;

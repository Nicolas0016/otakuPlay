export const formatName = (
  name: string,
  length: number = 25,
  format: boolean = true
) => {
  name = name.substring(0, length);
  if (name.length > length && format) name + "...";
  return name.split("-").join(" ");
};

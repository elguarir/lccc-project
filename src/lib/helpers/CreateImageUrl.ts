export const createImageUrl = (key: string) => {
  const url = `https://lccc-project.s3.amazonaws.com/${key}`;
  return url;
};

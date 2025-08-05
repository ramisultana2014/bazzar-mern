export const formateDate = (date: Date) => {
  const dateFormate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
  return dateFormate;
};

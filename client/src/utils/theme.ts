export const checkDefaultTheme = () => {
  //here we check if isDarkTheme true or false
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  // then if isDarkTheme is true will add class dark-theme to body , if false it will remove it
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

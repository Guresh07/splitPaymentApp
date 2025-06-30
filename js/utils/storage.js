export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const mainUser = {
  name: "guresh",
  email: "guresh@gmail.com"
};

localStorage.setItem("mainUser", JSON.stringify(mainUser));


// reduxLocalStorageMiddleware.js

export const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === "LOGIN") {
    // При успешном входе пользователя сохраняем токен в localStorage
    localStorage.setItem("token", action.payload.token);
  } else if (action.type === "LOGOUT") {
    // При выходе пользователя удаляем токен из localStorage
    localStorage.removeItem("token");
  }

  // Продолжаем передачу действия по цепочке middleware
  return next(action);
};

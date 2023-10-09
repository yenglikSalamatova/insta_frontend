export const modalScrollBlocking = () => {
  document.body.style.overflowY = "scroll";
  document.body.style.overflowX = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
};

export const modalScrollUnblocking = () => {
  document.body.style.overflow = "auto";
  document.body.style.position = "static";
  document.body.style.width = "100%";
};

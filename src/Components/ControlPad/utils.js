export const tabWalk = (direction) => {
  if (direction != -1 && direction != 1)
    throw new Error("invalid tab direction");
  const current = document.activeElement;
  if (!current || current.tabIndex < 0) return;
  const nextTabIndex = current.tabIndex + direction;
  const nextElement = document.querySelector(`[tabindex="${nextTabIndex}"]`);
  if (nextElement) {
    nextElement.focus();
  }
};
export const nextTab = () => {
  tabWalk(1);
};

export const previousTab = () => {
  tabWalk(-1);
};

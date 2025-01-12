const useIsDarkMode = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default useIsDarkMode;

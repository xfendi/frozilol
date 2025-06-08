const handleScroll = (e: React.MouseEvent, name: string) => {
  e.preventDefault();

  setTimeout(() => {
    const element = document.getElementById(name);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
    });
  }, 300);
};

export default handleScroll;

export const heroWords = (duration, delay) => ({
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration, delay },
  },
});

export const container = (direction, transDelay = 0, duration = 0.3) => ({
  initial: {
    x: direction === "LTR" ? "-30%" : direction === "RTL" ? "30%" : 0,
    y: direction === "TTB" ? "-30%" : direction === "BTT" ? "30%" : 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration,
      delay: transDelay,
    },
  },
});

export const socialIcons = () => ({
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: 1.1,
    opacity: 1,
  },
  whileTap: {
    scale: 0.9,
    y: 2,
  },
});

export const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    overflow: "visible",
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

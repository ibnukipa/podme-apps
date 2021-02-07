export const routeAnimationFading = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const routeAnimationConfig = {
  animation: 'spring',
  config: {
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
};

export const routeAnimationSpec = {
  open: routeAnimationConfig,
  close: routeAnimationConfig,
};

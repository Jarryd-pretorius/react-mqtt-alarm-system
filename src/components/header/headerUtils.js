export const getR010State = (state) => {
  switch (state) {
    case 0:
      return "E-Stop Pressed";
    case 1:
      return "Gates Unlocked";
    case 10:
      return "Stopped";
    case 20:
      return "Starting";
    case 30:
      return "Running";
    case 40:
      return "Stopping";
    case 50:
      return "Stopped";
    default:
      return "unknown";
  }
};

export const getModeState = (state) => {
  switch (state) {
    case 0:
      return "Manual";
    case 1:
      return "Automatic";
    case 2:
      return "HMI Manual Control";
    default:
      return "unknown";
  }
};

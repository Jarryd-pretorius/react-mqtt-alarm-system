export const machineStates = [
  {
    name: "initialize",
    code: "R20",
  },
  {
    name: "Ready waiting to start",
    code: "R30",
  },
  {
    name: "Move to start position",
    code: "R40",
  },
  {
    name: "Load Request and Home Winder Servo",
    code: "R50",
  },
  {
    name: "Handshake R220, R320 and R110",
    code: "R60",
  },
  {
    name: "Advance spanner carriage",
    code: "R70",
  },
  {
    name: "Advance spanner to insert nut and washer",
    code: "R80",
  },
  {
    name: "Lower winder to engage pier head",
    code: "R90",
  },
  {
    name: "Open clamps",
    code: "R100",
  },
  {
    name: "Request winder to bottom position",
    code: "R110",
  },
  {
    name: "Request winder to final pos",
    code: "R120",
  },
  {
    name: "Retract spanner and raise winder",
    code: "R130",
  },
  {
    name: "Winder Servo Home",
    code: "R140",
  },
  {
    name: "Handshake R110",
    code: "R150",
  },
  {
    name: "Open Door",
    code: "R150",
  },
];

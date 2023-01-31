export const success = (ctx) => {
  console.log("\x1b[32m", ctx);
};

export const warn = (ctx) => {
  console.log("\x1b[33m", ctx);
};

export const error = (ctx) => {
  console.log("\x1b[31m", ctx);
};

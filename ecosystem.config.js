module.exports = {
  apps: [
    {
      name: "adminnode",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3022
      }
    }
  ]
};

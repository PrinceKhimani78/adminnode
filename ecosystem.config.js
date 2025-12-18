module.exports = {
  apps: [
    {
      name: "adminnode",
      cwd: "/home/admin.rojgariindia.com/release",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3022
      }
    }
  ]
};

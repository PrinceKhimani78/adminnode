module.exports = {
  apps: [
    {
      name: "rojgari-next",
      cwd: "/home/demo.rojgariindia.com/current",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production"
      },
      max_memory_restart: "300M"
    }
  ]
};

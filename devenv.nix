{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript.enable = true;
  languages.javascript.npm = {
    enable = true;
    install.enable = true;
  };

  process.proxy.enable = true;

  # https://devenv.sh/processess
  processes.vite = {
    exec = "npx vite --port ${toString config.processes.vite.ports.http.value}";
    ports.http.allocate = 8000;

  };
}

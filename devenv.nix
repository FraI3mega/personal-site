{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript.enable = true;

  git-hooks.hooks = {
    oxfmt.enable = true;
  };
}

import { Command } from "commander";
import { version } from "../package.json";
import { create } from "./command/create";
import { input } from "@inquirer/prompts";

const program = new Command("bdguy-cli");
program.version(version, "-v , --version");

program
  .command("create")
  .description("创建一个新项目")
  .argument("[name]", "项目名称")
  .action(async (name) => {
    create(name);
  });

program.parse(); // 解析指令

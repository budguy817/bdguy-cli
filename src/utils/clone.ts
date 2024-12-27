import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import log from "./log";
import chalk from "chalk";
const logger = createLogger({
  spinner: {
    interval: 300, // 变换时间 ms
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
      chalk.blue(item)
    ), // 设置加载动画
  },
});
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 根目录
  binary: "git",
  maxConcurrentProcesses: 6, // 最大并发进程数
};
export const clone = async (url: string, name: string, options: string[]) => {
  const git = simpleGit();
  try {
    await logger(git.clone(url, name, options), "代码下载中...", {
      estimate: 7000, // 预计下载时间
    });
    log.success(`项目创建成功 ${chalk.blueBright(name)}`);
    log.success(`执行以下命令启动项目：`);
    log.info(`cd ${chalk.blueBright(name)}`);
    log.info(`${chalk.yellow("pnpm")} install`);
    log.info(`${chalk.yellow("pnpm")} run dev`);
  } catch (error) {
    log.error("下载失败");
    console.log(error);
  }
};

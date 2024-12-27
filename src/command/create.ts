import { select, input } from "@inquirer/prompts";
import { clone } from "src/utils/clone";
import path from "path";
import fs from "fs-extra";

export interface TemplateItem {
  name: string; // 项目名称
  downloadUrl: string; // 下载地址
  desc: string; // 描述信息
  branch: string; // 代码分支
}

export const templates: Map<string, TemplateItem> = new Map([
  [
    "vite-vue-ts-tem",
    {
      name: "vite+vue+ts",
      downloadUrl: "https://gitee.com/Badguy_zzy/vue-next-admin.git",
      desc: "基于vite+ts创建的vue3模板",
      branch: "master",
    },
  ],
  [
    "vite-react-ts-tem",
    {
      name: "vite+react+ts",
      downloadUrl: "https://gitee.com/Badguy_zzy/react-vite-ts.git",
      desc: "基于vite+ts创建的react模板",
      branch: "master",
    },
  ],
]);

export const isOverWrite = (name: string) => {
  console.warn(`${name}已经存在`);
  return select({
    message: "是否选择覆盖原文件?",
    choices: [
      { name: "覆盖", value: true },
      { name: "取消", value: false },
    ],
  });
};

export const create = async (name?: string) => {
  if (!name) name = await input({ message: "请输入项目名称" });

  const filePath = path.resolve(process.cwd(), name);
  if (fs.existsSync(filePath)) {
    const run = await isOverWrite(name);
    if (run) {
      await fs.remove(filePath);
    } else {
      return;
    }
  }
  const templateList = [...templates.entries()].map((item) => {
    const [prjName, options] = item;
    return {
      prjName,
      value: prjName,
      desc: options.desc,
    };
  });
  const templateName = await select({
    message: "请选择初始化模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    clone(info.downloadUrl, name, ["-b", info.branch]);
  }
};

import "dotenv/config";
import { existsSync, promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import gradient from "gradient-string";
import { toBlock, toBlockString } from "terminal-block-fonts";
import { Command } from "commander";
import ora from "ora";
import { execa } from "execa";
import prompts from "prompts";
import { FARMUI_GRAFFITI } from "../utils/ascii-arts";
import { logger } from "../utils/logger";
import { z } from "zod";


process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));



const COMPONENT_REGISTERY_URL = "" ?? "https://farmui-api.vercel.app/api/components";
type CompToAddProps = {
  comp_path: string;
  comp_content: string;
};
const addCommandInput = z.object({
  id: z.string(),
  cwd: z.string(),
});

console.log(gradient("pink", "blue")(FARMUI_GRAFFITI));

export const add = new Command()

  .name("add")
  .description("add a new component or UI from farmui")
  .argument("<string>", "id of the component from https://farmui.com")
  // .option("--id", "id of the component")
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (id, opts) => {
    const options = addCommandInput.parse({
      id,
      ...opts,
    });

    const custom_cwd = path.resolve(options.cwd);
    if (!existsSync(custom_cwd)) {
      logger.error(`There is no ${custom_cwd} exists your paths.`);
      process.exit(0);
    }
    let defaultDir = "components";
    const custom_cwd_flag = process.cwd() === options.cwd
    // already found the id and next will be finding the component id
    try {
      if (!custom_cwd_flag) {
        logger.info(`We are dumping the component inside of ${custom_cwd} `)
      } else {

        const { dir } = await prompts({
          type: "text",
          name: "dir",
          message: `A directory to dump the components? `,
          hint: "components ",

        });
        if (dir) {
          defaultDir = dir;
        }
      }
      // should be prompting it for the component place to be stored
      const path_ = path.join(custom_cwd, defaultDir);
      const root_dir = path.join(path_, "/farmui");
      const comp_fetch = await fetch(COMPONENT_REGISTERY_URL!);
      let comp_db: any[] = await comp_fetch.json();
      const select_files_by_id = comp_db.find((x) => x.id === options.id);
      if (!select_files_by_id) {
        logger.error("No such component exists with in this ID.");
        process.exit(0);
      }

      const exist = existsSync(root_dir);

      if (exist) {
        // logic for existed
        const { proceed } = await prompts({
          type: "confirm",
          name: "proceed",
          message: `Ready to install components and dependencies. Proceed?`,
          initial: true,
        });

        if (!proceed) {
          logger.info(
            "Make sure you have the right path to dump the components"
          );
          process.exit(0);
        }
      } else {
        await fs.mkdir(root_dir, { recursive: true });
      }
      const path_to_add: CompToAddProps[] = [];
      // for now , the content we will support will be react based , toll we have updated the ednpoint
      const root_comp_name = select_files_by_id.files[0].root.name;
      const root_comp_content =
        select_files_by_id.files[0].root.contents[0].content;
      const root_comp_path = path.join(root_dir, root_comp_name);
      const child_comp = select_files_by_id.files[1].child;
      path_to_add.push({
        comp_content: root_comp_content,
        comp_path: root_comp_path,
      });

      const child_path: string[] = [];
      const depends_on: any[] = child_comp;
      depends_on.map((dep) => {
        const child_comp_name = dep.name;
        const child_comp_content = dep.contents[0].content;
        const child_comp_path = path.join(root_dir, child_comp_name);
        path_to_add.push({
          comp_content: child_comp_content,
          comp_path: child_comp_path,
        });
      });
      const spinner = ora(`Dumping your components...`);
      spinner.start();
      const dependencies: string[] = select_files_by_id.dependencies;
      if (!path_to_add) {
        logger.warn("No component to add");
      } else {
        path_to_add.map(async ({ comp_content, comp_path }) => {
          await fs.writeFile(`${comp_path}.tsx`, comp_content);
        });
      }
      if (dependencies?.length) {
        await execa("pnpm", ["install", ...dependencies], {
          cwd: process.cwd(),
        });
      }
      spinner.stop();
      if (dependencies.length) {
        logger.info(`Dependencies - ${dependencies.length} added`)
        dependencies.map((dep) => {
          logger.success(` + ${dep}`)
        })

      }
      if (path_to_add) {
        const path_for_comp = root_dir.split("/")
        const last_two = path_for_comp[path_for_comp.length - 2] + path_for_comp[path_for_comp.length - 1]

        logger.info(`Components - ${path_to_add.length} added inside of ${last_two}`)
        path_to_add.map((comps) => {
          const comp_names = comps.comp_path.split("/")
          const comp_name = comp_names[comp_names.length - 1]
          logger.success(` + ${comp_name}`)
        })
      }
      spinner.succeed("Successfully installed");
    } catch (err) {
      logger.error("Error has occured!")
      console.log("Error: ", err);
    }
  });
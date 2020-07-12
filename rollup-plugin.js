/* eslint-disable import/no-extraneous-dependencies */
const glob = require("glob")
const fs = require("fs")
const { ESLint } = require("eslint")
const ttp = require("typescript-to-proptypes")
const path = require("path")

// https://rollupjs.org/guide/en/#plugins-overview
// https://github.com/merceyz/typescript-to-proptypes/blob/master/test/index.test.ts
// https://github.com/merceyz/typescript-to-proptypes/blob/66f228715a14dd5883d7c06a2b19e6439938973f/test/index.test.ts
// https://github.com/mui-org/material-ui/blob/2231349c302a089cc556614ff562b02a729b1e77/scripts/generateProptypes.ts
// eslint-disable-next-line jsdoc/require-returns
/**
 * @returns {{}} rollup plugin
 */
export default function propTypesFromTS() {
  return {
    name: "create-proptypes-from-ts-definition", // this name will show up in warnings and errors
    writeBundle() {
      ;(async () => {
        const tsOptions = ttp.loadConfig(
          path.resolve(__dirname, "./tsconfig.json")
        )

        const definitionFiles = glob.sync("./dist/src/**/*.d.ts", {
          absolute: true,
          cwd: __dirname,
        })

        // Create program for all files to speed up tests
        const program = ttp.createProgram(definitionFiles, tsOptions)

        definitionFiles.forEach(async (testCase) => {
          if (!testCase.includes("index")) {
            const outputPath = testCase.replace(".d.ts", ".js")

            const ast = ttp.parseFromProgram(testCase, program, {})

            let builtFiles = fs.readFileSync(outputPath, "utf8")

            const result = ttp.generate(ast, {})

            // append propTypes import after react import
            const ex = /(import .* from 'react';?)/
            builtFiles = builtFiles.replace(
              ex,
              `${builtFiles.match(ex)[0]}\nimport PropTypes from 'prop-types'`
            )

            // 1. Create an instance with the `fix` option.
            const eslint = new ESLint({
              fix: true,
              ignore: false,
              overrideConfig: { rules: { "no-undef": "off" } },
            })

            // 2. Lint and modify text.
            const lintResults = await eslint.lintText(result)

            fs.writeFileSync(
              outputPath,
              `${builtFiles}\n${lintResults[0].output}`
            )
          }
        })
      })().catch((error) => {
        process.exitCode = 1
        console.error(error)
      })
    },
  }
}

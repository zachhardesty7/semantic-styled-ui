/* eslint-disable import/no-extraneous-dependencies */
// much inspiration from MUI -- https://github.com/mui-org/material-ui/blob/next/scripts/generateProptypes.ts
const glob = require("glob")
const fs = require("fs")
const ttp = require("typescript-to-proptypes")
const path = require("path")
const prettier = require("prettier")

// https://rollupjs.org/guide/en/#plugins-overview
// https://github.com/merceyz/typescript-to-proptypes/blob/master/test/index.test.ts
// https://github.com/merceyz/typescript-to-proptypes/blob/66f228715a14dd5883d7c06a2b19e6439938973f/test/index.test.ts
// https://github.com/mui-org/material-ui/blob/2231349c302a089cc556614ff562b02a729b1e77/scripts/generateProptypes.ts
// https://www.npmjs.com/package/@rollup/pluginutils
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

        const definitionFiles = glob.sync("./src/**/*.d.ts", {
          absolute: true,
          cwd: __dirname,
        })

        // Create program for all files to speed up tests
        const program = ttp.createProgram(definitionFiles, tsOptions)

        definitionFiles.forEach(async (definitionFile) => {
          if (
            !definitionFile.includes("index") &&
            !definitionFile.includes("types")
          ) {
            // SRC FILES where we want to inject propTypes import
            const outputPath = definitionFile.replace(".d.ts", ".jsx")

            // https://github.com/merceyz/typescript-to-proptypes/blob/2f90fe845bd8f1e500aa16f36d5bf5184111b38d/src/parser.ts#L27-L32
            const proptypes = ttp.parseFromProgram(definitionFile, program, {
              checkDeclarations: true,
            })

            // insert prop types in src files
            const jsContent = fs.readFileSync(outputPath, "utf8")
            const result = ttp.inject(proptypes, jsContent, {
              removeExistingPropTypes: true,
              babelOptions: {
                filename: outputPath,
              },
              comment: [
                "----------------------------- Warning --------------------------------",
                "| These PropTypes are generated from the TypeScript type definitions |",
                '|     To update them, edit the d.ts file and run any "yarn build"    |',
                "----------------------------------------------------------------------",
              ].join("\n"),
              // getSortLiteralUnions,
              reconcilePropTypes: (prop, previous, generated) => {
                const usedCustomValidator =
                  previous !== undefined && !previous.startsWith("PropTypes")
                const ignoreGenerated =
                  previous !== undefined &&
                  previous.startsWith(
                    "PropTypes /* @typescript-to-proptypes-ignore */"
                  )

                if (
                  ignoreGenerated &&
                  // `ignoreGenerated` implies that `previous !== undefined`
                  previous
                    .replace(
                      "PropTypes /* @typescript-to-proptypes-ignore */",
                      "PropTypes"
                    )
                    .replace(/\s/g, "") === generated.replace(/\s/g, "")
                ) {
                  throw new Error(
                    `Unused \`@typescript-to-proptypes-ignore\` directive for prop '${prop.name}'.`
                  )
                }

                if (usedCustomValidator || ignoreGenerated) {
                  // `usedCustomValidator` and `ignoreGenerated` narrow `previous` to `string`
                  return previous
                }

                return generated
              },
              shouldInclude: ({ component, prop }) => {
                if (prop.name === "children") {
                  return true
                }
                let shouldDocument

                prop.filenames.forEach((filename) => {
                  const isExternal = filename !== definitionFile
                  if (!isExternal) {
                    shouldDocument = true
                  }
                })

                return shouldDocument
              },
            })

            const formattedResult = prettier.format(result, {
              semi: false,
              parser: "babel",
            })

            fs.writeFileSync(`${outputPath}`, formattedResult)
          }
        })
      })().catch((error) => {
        process.exitCode = 1
        console.error(error)
      })
    },
  }
}

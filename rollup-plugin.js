/* eslint-disable import/no-extraneous-dependencies */
// much inspiration from MUI -- https://github.com/mui-org/material-ui/blob/next/scripts/generateProptypes.ts
const glob = require("glob")
const fs = require("fs")
const ttp = require("typescript-to-proptypes")
const path = require("path")
const prettier = require("prettier")

const TSCONFIG_PATH = "./tsconfig.json"
const TYPE_DEF_FILES_EXT = "d.ts"
const ALL_TYPE_DEF_FILES_GLOB = `./src/**/*.${TYPE_DEF_FILES_EXT}`
const REACT_FILE_EXT = "@(js|jsx)"

let hasRun = false

const getFilename = (filePath) => filePath.slice(0, filePath.indexOf(".d.ts"))

export const generatePropTypesFromGlob = (target) => {
  const tsOptions = ttp.loadConfig(path.resolve(__dirname, TSCONFIG_PATH))

  let definitionFiles = glob.sync(target, {
    cwd: __dirname,
  })

  // if there is a type def file (.d.ts) without React equivalent, generate ALL proptypes
  // TODO: add typescript and tsx support
  if (
    definitionFiles.some(
      (definitionFile) =>
        glob.sync(`${getFilename(definitionFile)}.${REACT_FILE_EXT}`).length ===
        0
    )
  ) {
    // console.log("generating all proptypes")
    definitionFiles = glob.sync(ALL_TYPE_DEF_FILES_GLOB, {
      cwd: __dirname,
    })
  }
  // console.log("definitionFiles", definitionFiles)

  // Create program for all files to speed up tests
  const program = ttp.createProgram(definitionFiles, tsOptions)

  definitionFiles.forEach((definitionFile) => {
    const possibleComponentPaths = glob.sync(
      `${getFilename(definitionFile)}.${REACT_FILE_EXT}`
    )
    // console.log("definitionFile", definitionFile)
    // console.log("getFilename(definitionFile)", getFilename(definitionFile))
    // console.log("possibleComponentPaths", possibleComponentPaths)

    if (possibleComponentPaths.length === 0) return

    // SRC FILES where we want to inject propTypes import
    const outputPath = possibleComponentPaths[0]

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
        "-------------------------------- Warning -----------------------------------",
        "|    These PropTypes are generated from the TypeScript type definitions    |",
        "| To update them, edit the .d.ts file and run any yarn dev / build command |",
        "----------------------------------------------------------------------------",
      ].join("\n"),
      // getSortLiteralUnions,
      reconcilePropTypes: (prop, previous, generated) => {
        const usedCustomValidator =
          previous !== undefined && !previous.startsWith("PropTypes")
        const ignoreGenerated =
          previous !== undefined &&
          previous.startsWith("PropTypes /* @typescript-to-proptypes-ignore */")

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
      shouldInclude: ({ prop }) => {
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

    fs.writeFileSync(outputPath, formattedResult)
  })
}

// https://github.com/merceyz/typescript-to-proptypes/blob/master/test/index.test.ts
// https://github.com/merceyz/typescript-to-proptypes/blob/66f228715a14dd5883d7c06a2b19e6439938973f/test/index.test.ts
// https://github.com/mui-org/material-ui/blob/2231349c302a089cc556614ff562b02a729b1e77/scripts/generateProptypes.ts
const propTypesFromTS = () => {
  return {
    name: "create-proptypes-from-ts-definition", // name for warnings and errors
    buildStart() {
      // add all `.d.ts` files to rollup to watch for changes on each build
      glob.sync(ALL_TYPE_DEF_FILES_GLOB).forEach((definitionFile) => {
        this.addWatchFile(definitionFile)
      })

      if (!hasRun) {
        console.log("generating proptypes from TS due to first build")
        generatePropTypesFromGlob(ALL_TYPE_DEF_FILES_GLOB)
        hasRun = true
      }
    },
    /** @param {string} id - file path */
    watchChange(id) {
      if (id.endsWith(TYPE_DEF_FILES_EXT)) {
        console.log(`generating proptypes from TS due to change in ${id}`)
        generatePropTypesFromGlob(id)
      }
    },
  }
}

export default propTypesFromTS

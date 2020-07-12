import path from "path"
import * as ttp from "typescript-to-proptypes"
import * as ts from "typescript"

// Create program for all files to speed up tests
// const program = ttp.createProgram(
//   testCases,
//   ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json')),
// )

const testCase = "./src/components/Title.jsx"
const dirname = path.dirname(testCase)

const o = ttp.parseFile(testCase, {})
console.log("o ", o)

// const dirname = path.dirname(testCase)
// const testName = dirname.substr(__dirname.length + 1)
// const astPath = path.join(dirname, 'output.json')
// const outputPath = path.join(dirname, 'output.js')
// const optionsPath = path.join(dirname, 'options.ts')
// const inputJS = path.join(dirname, 'input.js')

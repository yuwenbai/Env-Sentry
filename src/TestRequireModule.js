// import { setFunc } from "./TestImport"

import * as a from './TestImport'
// const a = require('./TestImport')
export const cheapModuleSetFunc = () => {
    console.log('cheapModuleSetFunc ', a.getFunc())
    a.setFunc()
}
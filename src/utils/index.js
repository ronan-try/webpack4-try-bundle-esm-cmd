import * as XLSX from 'xlsx'
import { esm003 } from './test_esm'

export const excelToJson = () => {
    console.warn('@/utils/index.excelToJson is used')
    return XLSX + 'excelToJson';
}

export const test = () => {
    console.warn('@/utils/index.test is used')
    return 'test' + esm003
}

export const test2 = () => {
    console.warn('@/utils/index.test2 is used')
    return 'test2'
}

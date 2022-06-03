import type { DelimiterType } from "./types";

const mapValueToDisplay = (value: number, delimiter: DelimiterType, decimalPlaces: number) => {
    const valueStr = Math.floor(value).toString()
    return (delimiter === 'none' ?
        valueStr :
        [...valueStr].reverse().reduce((acc, char, index) => {
            acc = char + (index % 3 === 0 && index !== 0 ? (delimiter === 'EU' ? '.' : ',') : '') + acc;
            return acc;
        }, "")) + (decimalPlaces === -1 ? '' : `${delimiter === 'EU' ? ',' : '.'}${(value - Math.floor(value)).toFixed(decimalPlaces).split('.')[1]}`)
}

export { mapValueToDisplay }
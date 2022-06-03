import * as React from "react";
import type { DelimiterType } from "./types";

interface NumberInputProps {
    decimalPlaces?: number;
    delimiter?: DelimiterType;
    value?: number;
    allowNegative?: boolean;
    onValueChange: (value: number) => void;
    onDisplayChange: (display: string) => void;
}

const mapValueToDisplay = (value: number, delimiter: DelimiterType, decimalPlaces: number) => {
    const valueStr = Math.floor(value).toString()
    return (delimiter === 'none' ?
        valueStr :
        [...valueStr].reverse().reduce((acc, char, index) => {
            acc = char + (index % 3 === 0 && index !== 0 ? (delimiter === 'EU' ? '.' : ',') : '') + acc;
            return acc;
        }, "")) + (decimalPlaces === -1 ? '' : `${delimiter === 'EU' ? ',' : '.'}${(value - Math.floor(value)).toFixed(decimalPlaces).split('.')[1]}`)

}

const NumberInput = ({ onDisplayChange, onValueChange, delimiter = 'none', decimalPlaces = -1, value = 0 }: NumberInputProps) => {
    const [numericalValue, setNumericalValue] = React.useState<number>(value);
    const [displayValue, setDisplayValue] = React.useState<string>(mapValueToDisplay(value, delimiter, decimalPlaces));
    const hiddenInputRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
        setDisplayValue(mapValueToDisplay(numericalValue, delimiter, decimalPlaces))
    }, [numericalValue]);
    React.useEffect(() => {
        onDisplayChange(displayValue);
    }, [displayValue]);
    const updateDisplayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.valueAsNumber;
        if (!Number.isNaN(newValue)) {
            setNumericalValue(newValue);
            onValueChange(value);
        }
    }

    return (
        <>
            <input type="number" value={numericalValue} style={{ display: "none" }} ref={hiddenInputRef} onChange={updateDisplayValue} />
            <input type="number" value={displayValue} onFocus={(e) => {
                e.stopPropagation()
                hiddenInputRef?.current.focus()
            }} />
        </>
    )
}

export { NumberInput, NumberInputProps }
import * as React from "react";
import { mapValueToDisplay } from "./NumberMapper";
import type { NumberInputProps } from "./types";

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
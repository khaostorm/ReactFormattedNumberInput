type DelimiterType = 'none' | 'US' | 'EU';

interface NumberInputProps {
    decimalPlaces?: number;
    delimiter?: DelimiterType;
    value?: number;
    allowNegative?: boolean;
    onValueChange: (value: number) => void;
    onDisplayChange: (display: string) => void;
}

export { DelimiterType, NumberInputProps }

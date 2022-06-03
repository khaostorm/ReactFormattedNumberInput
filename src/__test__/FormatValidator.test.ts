import { mapValueToDisplay } from "../NumberMapper";

describe("Validate that the number formatter works properly", () => {
    it("No Delimiter, No Decimal Places", () => {
        expect(mapValueToDisplay(1000.00, "none", -1)).toStrictEqual("1000");
    })
    it("No Delimiter, No Decimal Places, non zero decimal value", () => {
        expect(mapValueToDisplay(1000.8, "none", -1)).toStrictEqual("1000");
    })
    it("No Delimiter, 1 Decimal Place", () => {
        expect(mapValueToDisplay(1000.00, "none", 1)).toStrictEqual("1000.0");
    })
    it("US Delimiter, No Decimal Places", () => {
        expect(mapValueToDisplay(1000.00, "US", -1)).toStrictEqual("1,000");
    })
    it("US Delimiter, No Decimal Places, non zero decimal value", () => {
        expect(mapValueToDisplay(1000.40, "US", -1)).toStrictEqual("1,000");
    })
    it("US Delimiter, 2 Decimal Places", () => {
        expect(mapValueToDisplay(1000.00, "US", 2)).toStrictEqual("1,000.00");
    })
    it("US Delimiter, 2 Decimal Places, non zero decimal value", () => {
        expect(mapValueToDisplay(1000.8, "US", 2)).toStrictEqual("1,000.80");
    })
    it("EU Delimiter, No Decimal Places", () => {
        expect(mapValueToDisplay(1000.00, "EU", -1)).toStrictEqual("1.000");
    })
    it("EU Delimiter, No Decimal Places, non zero decimal value", () => {
        expect(mapValueToDisplay(1000.09, "EU", -1)).toStrictEqual("1.000");
    })
    it("EU Delimiter, 2 Decimal Places", () => {
        expect(mapValueToDisplay(1000.00, "EU", 2)).toStrictEqual("1.000,00");
    })
    it("EU Delimiter, 2 Decimal Places, non zero decimal value", () => {
        expect(mapValueToDisplay(1000.03, "EU", 2)).toStrictEqual("1.000,03");
    })
})
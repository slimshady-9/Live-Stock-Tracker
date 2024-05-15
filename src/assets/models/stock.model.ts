export class Stock {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
    currentPrice: number;
    change: number;
    changePercentage: number;
    dailyHigh: number;
    dailyLow: number;
    openPrice: number;
    closePrice: number;
    constructor(description: string,
        displaySymbol: string,
        symbol: string, type: string,
        currentPrice: number,
        change: number,
        changePercentage: number,
        dailyHigh: number,
        dailyLow: number,
        openPrice: number,
        closePrice: number) {
        this.description = description;
        this.displaySymbol = displaySymbol;
        this.symbol = symbol;
        this.type = type;
        this.currentPrice = currentPrice;
        this.change = change;
        this.changePercentage = changePercentage;
        this.dailyHigh = dailyHigh;
        this.dailyLow = dailyLow;
        this.openPrice = openPrice;
        this.closePrice = closePrice;
    }

}
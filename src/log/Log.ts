import { ILog, ITransformedLog, LogLevel } from "../types/LogTypes";

export class Log implements ILog {
    private timestamp: string;
    private loglevel: LogLevel;
    private data: Record<string, unknown>;

    constructor({ timestamp, loglevel, data }) {
        this.timestamp = timestamp;
        this.loglevel = loglevel;
        this.data = data;        
    }

    public getTimestamp(): string {
        return this.timestamp;
    }

    public getLogLevel(): LogLevel {
        return this.loglevel;
    }

    public getData(): Record<string, unknown> {
        return this.data;
    }

    public transform(): ITransformedLog {
        const data = this.getData();
        return {
            timestamp: this.getTimestamp(),
            loglevel: this.getLogLevel(),
            transactionId: data?.transactionId as string,
        }
    }

    public isLevel(level: string): boolean {
        return this.getLogLevel() === level;
    }
}
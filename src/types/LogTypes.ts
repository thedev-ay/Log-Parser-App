export type LogLevel = Level.INFO | Level.DEBUG | Level.ERROR | Level.WARN

export enum Level {
    INFO = "info",
    DEBUG = "debug",
    ERROR = "error",
    WARN = "warn"
}
export enum ParsedGroup {
    Timestamp = 1,
    Level,
    Data
}

export type ParsedLog = {
    timestamp: string,
    loglevel: LogLevel,
    data: Record<string, unknown>
}

export interface ITransformedLog {
    timestamp: string,
    loglevel: LogLevel,
    transactionId: string;
}

export interface TransformedErrorLog extends ITransformedLog {
    err: string;
}

export interface ILog {
    transform(): ITransformedLog;
    isLevel(level: string): boolean;
}

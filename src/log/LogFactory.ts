import { ILog, Level, ParsedLog } from "../types/LogTypes";
import { ErrorLog } from "./ErrorLog";
import { Log } from "./Log";

export class LogFactory {
    public static create(log: ParsedLog): ILog {
        switch(log.loglevel) {
            case Level.ERROR:
                return new ErrorLog(log);
            default:
                return new Log(log);
        }
    }
}
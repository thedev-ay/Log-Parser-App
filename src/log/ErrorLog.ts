import { ILog, TransformedErrorLog } from "../types/LogTypes";
import { Log } from "./Log";

export class ErrorLog extends Log implements ILog {
    constructor({ timestamp, loglevel, data }) {
        super({ timestamp, loglevel, data })
    }

    transform(): TransformedErrorLog {
        const data = this.getData();
        return {
            ...super.transform(),
            err: data?.err as string
        }
    }
}
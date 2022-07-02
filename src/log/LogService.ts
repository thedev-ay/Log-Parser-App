import * as fs from 'fs';
import path from 'path';
import { ILog, ParsedGroup, LogLevel, ITransformedLog } from '../types/LogTypes';
import { LogFactory } from './LogFactory';

export class LogService {
    public read(logPath: string): string[] {
        try {
            const logData = fs.readFileSync(path.join(process.cwd(), logPath),'utf8');
            return logData.split(/\r?\n/);
        } catch (err) {
            throw new Error("Log file does not exists!");
        }
    }

    public parseAll(rawLogs: string[]): ILog[] {
        const logs: ILog[] = [];

        for (const rawLog of rawLogs) {
            const log = this.parse(rawLog);
            if (log) {
                logs.push(log);
            }
        }

        return logs;
    }

    public parse(rawLog: string): ILog | undefined {
        const regex = /^(.*) - (\w+) - ({.*})$/;
        const group = regex.exec(rawLog);

        return group && LogFactory.create({
            timestamp: group[ParsedGroup.Timestamp],
            loglevel: group[ParsedGroup.Level] as LogLevel,
            data: JSON.parse(group[ParsedGroup.Data])
        });
    }

    public filter(logs: ILog[], level: string): ITransformedLog[] {
        return logs
            .filter(log => log.isLevel(level))
            .map(log => log.transform());
    }

    public export(logs: ITransformedLog[], outputPath: string) {
        try {
            fs.writeFileSync(path.join(process.cwd(), outputPath), JSON.stringify(logs));
        } catch (err) {
            throw new Error("Cannot save output on the provided path!")
        }
    }
}
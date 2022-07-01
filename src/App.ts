import { LogService } from './log/LogService';
import { CLI } from './cli/CLI';

export class App {
    public start() {
        try {
            const cli = new CLI();
            const logService = new LogService();

            const filter = "warn";

            const args = cli.run();

            const rawLogs = logService.read(args.input);

            const logs = logService.parseAll(rawLogs);

            const filteredLogs = logService.filter(logs, filter)

            logService.export(filteredLogs, args.output)
        } catch (err) {
            console.error(err.message)
        }
    }
}
import { Command } from 'commander';

export class CLI {
    public run() {
        const cli = new Command()
            .requiredOption('-i, --input <path>', 'Specify the log file')
            .requiredOption('-o, --output <path>', 'Specify a filename for the JSON output')
            .parse(process.argv);

        const option = cli.opts();

        return { 
            input: option.input as string,
            output: option.output as string
        }
    }
}
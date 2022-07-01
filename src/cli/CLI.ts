import { Command } from 'commander';

export class CLI {
    public run() {
        let args: { input: string, output: string } | undefined;

        const cli = new Command()
            .option('-i, --input <path>', 'Specify the log file')
            .option('-o, --output <path>', 'Specify a filename for the JSON output')
            .parse(process.argv);

        const option = cli.opts();

        if (option.input && option.output) {
            args = { 
                input: option.input as string,
                output: option.output as string
            }
        }

        return args;
    }
}
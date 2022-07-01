import 'mocha';
import { expect } from 'chai';
import * as fs from 'fs';
import { LogService } from '../../src/log/LogService';
import { ILog, ITransformedLog } from '../../src/types/LogTypes';

describe("LogService", () => {
    let service: LogService;

    before(() => {
        service = new LogService();
    })

    describe("#read", () => {
        it("should return an array of logs when log file exists", () => {
            try {
                const rawLogs = service.read("logs/app.log")
                expect(rawLogs).to.be.an("array");
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })

        it("should throw an error when log file does not exists", () => {
            try {
                const rawLogs = service.read("nofile.log")
                expect(rawLogs).to.be.undefined;
            } catch (err) {
                expect(err).to.not.be.undefined;
            }
        })
    })

    describe("#parseAll", () => {
        let rawLogs: string[];
        before(() => {
            rawLogs = service.read("logs/app.log");
        })

        it("should return an array of log instances", () => {
            try {
                const instances = service.parseAll(rawLogs);
                expect(instances).to.be.an("array");
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })
    })

    describe("#filter", () => {
        let instances: ILog[];

        before(() => {
            const rawLogs = service.read("logs/app.log");
            instances = service.parseAll(rawLogs);
        })

        it("should return an array of log instances when filter matches some logs", () => {
            try {
                const filteredLogs = service.filter(instances, "error");
                expect(filteredLogs).to.be.an("array");
                expect(filteredLogs).to.have.lengthOf(1);
                expect(filteredLogs[0]).to.have.own.property("timestamp")
                expect(filteredLogs[0]).to.have.own.property("loglevel")
                expect(filteredLogs[0]).to.have.own.property("transactionId")
                expect(filteredLogs[0]).to.have.own.property("err")
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })

        it("should return an empty array when there's no match with the filter value", () => {
            try {
                const filteredLogs = service.filter(instances, "nofilter");
                expect(filteredLogs).to.be.an("array");
                expect(filteredLogs).to.have.lengthOf(0);
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })
    })

    describe("#export", () => {
        const filename = "test.json";
        let filteredLogs: ITransformedLog[];  

        before(() => {
            const rawLogs = service.read("logs/app.log");
            const instances = service.parseAll(rawLogs);
            filteredLogs = service.filter(instances, "error");
        })

        after(() => {
            fs.rmSync(filename)
        })

        it("should create an output file", () => {
            try {
                service.export(filteredLogs, filename);
                expect(fs.existsSync(filename)).to.be.true;
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })

        it("should throw an error when path is non-existent", () => {
            try {
                service.export(filteredLogs, `non-existent-path/${filename}`);
                expect(fs.existsSync(filename)).to.be.true;
            } catch (err) {
                expect(err).to.not.be.undefined;
            }
        })
    })
})
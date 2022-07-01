import 'mocha';
import { expect } from 'chai';
import { Log } from '../../src/log/Log';
import { ILog } from '../../src/types/LogTypes';

describe("Log", () => {
    describe("#transform", () => {
        let log: ILog;

        beforeEach(() => {
            log = new Log({
                timestamp: new Date().toISOString(),
                loglevel: "info",
                data: { transactionId: 1 }
            })
        })

        it("should return timestamp, log level and data properties only", () => {
            const result = log.transform();
            expect(result.loglevel).to.be.eq("info");
            expect(result.timestamp).to.not.be.undefined;
            expect(result.transactionId).to.be.eq(1);
        })
    })

    describe("#isLevel", () => {
        it("should return true when level is the same", () => {
            const log = new Log({
                timestamp: new Date().toISOString(),
                loglevel: "info",
                data: { transactionId: 1 }
            })

            const result = log.isLevel("info");
            expect(result).to.be.true;
        })

        it("should return true when level is the different", () => {
            const log = new Log({
                timestamp: new Date().toISOString(),
                loglevel: "info",
                data: { transactionId: 1 }
            })

            const result = log.isLevel("error");
            expect(result).to.be.false;
        })
    })
});
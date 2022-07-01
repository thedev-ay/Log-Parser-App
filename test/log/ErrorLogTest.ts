import 'mocha';
import { expect } from 'chai';
import { ILog } from '../../src/types/LogTypes';
import { ErrorLog } from '../../src/log/ErrorLog';

describe("ErrorLog", () => {
    describe("#transform", () => {
        let log: ILog;
        beforeEach(() => {
            log = new ErrorLog({
                timestamp: new Date().toISOString(),
                loglevel: "error",
                data: { transactionId: 1, err: "Error!" }
            })
        })

        it("should return timestamp, log level, data and err properties", () => {
            const result = log.transform();
            expect(result.loglevel).to.be.eq("error");
            expect(result.timestamp).to.not.be.undefined;
            expect(result.transactionId).to.be.eq(1);
            expect(result).to.have.own.property("err");
        })
    })
});
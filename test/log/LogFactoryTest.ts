import 'mocha';
import { expect } from 'chai';
import { LogFactory } from '../../src/log/LogFactory';
import { ErrorLog } from '../../src/log/ErrorLog';
import { Log } from '../../src/log/Log';

describe("LogFactory", () => {
    describe("#create", () => {
        let base;
        beforeEach(() => {
            base = {
                timestamp: new Date().toISOString(),
                data: { err: "Error!" }
            }
        })

        it("should create an error log instance when level is error", () => {
            const loglevel = "error";
            const log = LogFactory.create({ ...base, loglevel })
            expect(log).to.be.instanceOf(ErrorLog)
        })

        it("should create a default log instance when level is not error", () => {
            const loglevel = "info";
            const log = LogFactory.create({ ...base, loglevel })
            expect(log).to.be.instanceOf(Log)
        })
    })
});
import { expect } from "chai";
import Sinon from "sinon";
import { App } from "../src/App";
import { CLI } from "../src/cli/CLI";
import { LogService } from "../src/log/LogService";

describe("App", () => {
    describe("#start", () => {       
        let mockCLI: sinon.SinonMock;
        let mockCLIRun: sinon.SinonExpectation;
        let mockLogService: sinon.SinonMock;
        let mockLogServiceRead: sinon.SinonExpectation;
        let mockLogServiceParseAll: sinon.SinonExpectation;
        let mockLogServiceFilter: sinon.SinonExpectation;
        let mockLogServiceExport: sinon.SinonExpectation;

        beforeEach(() => {
            mockCLI = Sinon.mock(CLI.prototype);
            mockCLIRun = mockCLI.expects("run");
            mockCLIRun.returns({ input: "app.log", output: "out.json"});

            mockLogService = Sinon.mock(LogService.prototype);
            mockLogServiceRead = mockLogService.expects("read");
            mockLogServiceRead.returns([])
            mockLogServiceParseAll = mockLogService.expects("parseAll");
            mockLogServiceParseAll.returns([])
            mockLogServiceFilter = mockLogService.expects("filter");
            mockLogServiceFilter.returns([])
            mockLogServiceExport = mockLogService.expects("export");
            mockLogServiceExport.returns(true)
        })

        afterEach(() => {
            Sinon.restore();
        })

        it("should execute successfully", () => {
            try {
                new App().start();
            } catch (err) {
                expect(err).to.be.undefined;
            }
        })

        it("should throw error when processing failed", () => {
            mockLogServiceRead.throws(new Error("Log Service Error!"))
            
            try {
                new App().start();
            } catch (err) {
                expect(err).to.not.be.undefined;
            }
        })
    })
})
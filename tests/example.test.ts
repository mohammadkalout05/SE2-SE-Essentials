describe("Example Suite", () => {
    beforeAll(() => {
        console.log("beforeAll: setup for the suite");
    });

    beforeEach(() => {
        console.log("beforeEach: setup for each test");
    });

    afterEach(() => {
        console.log("afterEach: cleanup after each test");
    });

    afterAll(() => {
        console.log("afterAll: teardown for the suite");
    });

    it("should run the first test", () => {
        console.log('First text');
    });

    it("should run the second test", () => {
        console.log('Second test');
    });
})
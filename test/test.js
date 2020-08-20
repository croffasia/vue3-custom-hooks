var should = require('chai').should();
var useHooks = require('../lib');

describe('Make hook', function () {

    var hooks = useHooks("test");

    it("should not return errors when adding a valid hook", function () {
        should.not.Throw(() => hooks.makeHook("test"));
    });

    it('should return 0 when "test" hooks are present in the list of available hooks and used', function () {

        const onTest = hooks.makeHook("test");
        onTest(() => { });

        const registered = hooks.available();

        registered.findIndex(item => item.hook === "test" && item.used === 1).should.equal(0);
    });

    it('should return an error when adding an invalid hook', function () {
        should.Throw(() => hooks.makeHook("test-2"), Error);
    });
});

describe('Dispatch hook', function () {

    var hooks = useHooks("test");
    var onTest = hooks.makeHook("test");

    it("should not return errors when dispatching hooks (onTest())", function () {
        should.not.Throw(() => onTest());
    });

    it("should not return errors when dispatching hooks (hook.dispatch())", function () {
        const hook = onTest(() => { });
        should.not.Throw(() => hook.dispatch());
    });

    it("should call the hook callback", async function () {

        var test = 0;

        onTest(() => {
            test = 1;
        });

        onTest();
        test.should.equal(1);
    });

    it("should call a callback and pass a payload", async function () {

        var payload = {};

        onTest((pl) => {
            payload = pl;
        });

        onTest({ test: 1 });

        payload.should.have.property("test");
        payload.test.should.equal(1);
    });
});

describe('Remove hook', function () {

    var hooks = useHooks("test");
    var onTest = hooks.makeHook("test");

    it('should remove the hook callback', function () {

        const test = onTest(() => { });
        const registeredBefore = hooks.available("test");
        test.destroy();
        const registeredAfter = hooks.available("test");

        registeredBefore.should.have.property("hook");
        registeredBefore.should.have.property("used");
        registeredBefore.hook.should.equal("test");
        registeredBefore.used.should.equal(1);

        registeredAfter.should.have.property("hook");
        registeredAfter.should.have.property("used");
        registeredAfter.hook.should.equal("test");
        registeredAfter.used.should.equal(0);
    });

});

describe('Clear hooks', function () {

    var hooks = useHooks("test");
    var onTest = hooks.makeHook("test");

    it('should clear all used hooks', function () {

        onTest(() => { });
        onTest(() => { });
        onTest(() => { });

        let availableBefore = hooks.available("test");

        availableBefore.should.have.property("hook");
        availableBefore.should.have.property("used");
        availableBefore.hook.should.equal("test");
        availableBefore.used.should.equal(3);

        hooks.clear();

        let availableAfter = hooks.available("test");

        availableAfter.should.have.property("hook");
        availableAfter.should.have.property("used");
        availableAfter.hook.should.equal("test");
        availableAfter.used.should.equal(0);

        onTest(() => { });
        onTest(() => { });
        onTest(() => { });

        availableBefore = hooks.available("test");

        availableBefore.should.have.property("hook");
        availableBefore.should.have.property("used");
        availableBefore.hook.should.equal("test");
        availableBefore.used.should.equal(3);

        hooks.clear("test");

        availableAfter = hooks.available("test");

        availableAfter.should.have.property("hook");
        availableAfter.should.have.property("used");
        availableAfter.hook.should.equal("test");
        availableAfter.used.should.equal(0);

    });

});
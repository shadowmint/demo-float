/// <reference path="__init__.ts"/>
class DummyTests extends turn.TestCase {

    constructor() {
        super('DummyTests');
    }

    test_can_dummy():void {
    }
}
runner.register(new DummyTests());

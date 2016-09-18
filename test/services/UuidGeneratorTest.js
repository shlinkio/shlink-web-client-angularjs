'use strict';

describe('UuidGenerator', function () {
    beforeEach(module('shlink'));

    var UuidGenerator;
    beforeEach(inject(function (_UuidGenerator_) {
        UuidGenerator = _UuidGenerator_;
    }));

    describe('UuidGenerator.generateV4Uuid', function () {
        it('generates a v4 UUID', function () {
            var uuid = UuidGenerator.generateV4Uuid();
            expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
        });
    });
});

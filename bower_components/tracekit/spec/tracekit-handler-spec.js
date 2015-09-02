(function() {
    'use strict';

    describe('Handler', function(){
        it('it should not go into an infinite loop', function (done){
            var stacks = [];
            function handler(stackInfo){
                stacks.push(stackInfo);
            }

            function throwException() {
                throw new Error('Boom!');
            }

            TraceKit.report.subscribe(handler);
            expect(function () { TraceKit.wrap(throwException)(); }).toThrow();

            setTimeout(function () {
                TraceKit.report.unsubscribe(handler);
                expect(stacks.length).toBe(1);
                done();
            }, 1000);
        }, 2000);
    });
})();

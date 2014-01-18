describe('notifications.mock', function () {
    var registry, dispatcher, mock;

    beforeEach(module('notifications'));

    describe('dispatcher', function() {
        beforeEach(inject(function(topicMessageDispatcher, topicMessageDispatcherMock) {
            dispatcher = topicMessageDispatcher;
            mock = topicMessageDispatcherMock;
        }));

        it('trap messages', function() {
            dispatcher.fire('topic', 'msg');
            expect(mock.topic).toEqual('msg');
        });

        it('trap persistent messages', function() {
            dispatcher.firePersistently('topic', 'msg');
            expect(mock.persistent.topic).toEqual('msg');
        });
    });

    describe('registry', function() {
        var handler = function() {};

        beforeEach(inject(function(topicRegistry, topicRegistryMock) {
            registry = topicRegistry;
            mock = topicRegistryMock;
        }));

        it('trap subscription handlers', function() {
            registry.subscribe('topic', handler);
            expect(mock.topic).toEqual(handler);
        });

        it('trap unsubscription handlers', function() {
            registry.subscribe('topic', handler);
            registry.unsubscribe('topic', handler);

            expect(mock.topic).toBeUndefined();
        });
    });
});
describe('notifications.mock', function () {
    var registry, dispatcher, mock, dispatcherMock;

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

        beforeEach(inject(function(topicRegistry, topicRegistryMock, topicMessageDispatcherMock) {
            registry = topicRegistry;
            mock = topicRegistryMock;
            dispatcherMock = topicMessageDispatcherMock;
        }));

        describe('given a topic subscriber', function() {
            beforeEach(function() {
                registry.subscribe('topic', handler);
            });

            it('trap subscription handlers', function() {
                expect(mock.topic).toEqual(handler);
            });

            describe('trap unsubscription handlers', function() {
                it('when passed the correct subscription handler', function() {
                    registry.unsubscribe('topic', handler);
                    expect(mock.topic).toBeUndefined();
                });

                it('when passed the wrong subscription handler', function() {
                    registry.unsubscribe('topic', function() {});
                    expect(mock.topic).toEqual(handler);
                });
            });
        });

        it('trap persistentMessage handlers', function() {
            registry.persistentMessage('topic', 'msg');
            expect(dispatcherMock.persistent['topic']).toEqual('msg');
        });
    });
});
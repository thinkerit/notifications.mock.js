angular.module('notifications', [])
    .factory('topicMessageDispatcher', function(topicMessageDispatcherMock) {
        return {
            fire: function(topic, message){
                topicMessageDispatcherMock[topic] = message;
            },
            firePersistently: function(topic, message) {
                topicMessageDispatcherMock.persistent[topic] = message;
            }
        };
    })
    .factory('topicMessageDispatcherMock', function() {
        return {persistent:{}};
    })
    .factory('topicRegistry', function(topicRegistryMock, topicMessageDispatcherMock) {
        return {
            subscribe: function(topic, subscriber) {
                topicRegistryMock[topic] = subscriber;
            },
            unsubscribe: function(topic, subscriber) {
                if(topicRegistryMock[topic] == subscriber) topicRegistryMock[topic] = undefined;
            },
            persistentMessage: function (topic, message) {
                topicMessageDispatcherMock.persistent[topic] = message;
            }
        };
    })
    .factory('topicRegistryMock', function() {
        return {};
    })
    .factory('ngRegisterTopicHandler', function(topicRegistry) {
        return function(scope, topic, handler) {
            topicRegistry.subscribe(topic, handler);
        }
    });
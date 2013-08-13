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
    .factory('topicRegistry', function(topicRegistryMock) {
        return {subscribe:function(topic, subscriber) {
            topicRegistryMock[topic] = subscriber;
        }};
    })
    .factory('topicRegistryMock', function() {
        return {};
    });
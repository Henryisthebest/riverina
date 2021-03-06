/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        alert('about to create notification callback');
        var notificationOpenedCallback = function(jsonData) {
            alert("Notification received:\n" + JSON.stringify(jsonData));
            console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        };
        
        alert('initing onesignal');
        window.plugins.OneSignal.init("e44d9094-facc-11e4-9c72-0b1868647d30",
                                      {googleProjectNumber: "684736564347"},
                                      notificationOpenedCallback);
        alert('done initing onesignal');
        window.plugins.OneSignal.sendTags({mtype1:'yes', mtype2:'yes'});
        alert('done adding two tags');
        
        var new_tag = String('mtype3');
        //console.log("object is : " + push)
    
        alert("Adding new tag: " + new_tag)
        window.plugins.OneSignal.getTags(function(obj) {
            alert('stuff happened old tags' + JSON.stringify(obj));
            window.plugins.OneSignal.sendTag('mtype3', 'yes');
            alert('set tag done');
        });
         window.plugins.OneSignal.getTags(function(obj) {
            alert('tag list is now' + JSON.stringify(obj));
            
        });
        alert('deleting key');
        window.plugins.OneSignal.deleteTag("key");
        alert('delete mtpe3');
        window.plugins.OneSignal.deleteTag("mtype3");
        alert('deleted');
        window.plugins.OneSignal.getTags(function(obj) {
            alert('tag list is now final' + JSON.stringify(obj));
            
        });
        
        alert('deleting all tags');
        window.plugins.OneSignal.getTags(function(obj) {
            alert('taglist is' + JSON.stringify(obj));
            for(property in obj) {
                alert(property + " = " + obj[property]);
                window.plugins.OneSignal.deleteTag(property.toString())
            }
        });
    }
};

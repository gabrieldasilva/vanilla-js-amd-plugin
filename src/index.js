(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.clickMe = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function(root) {
    'use strict';

    //
    // Variables
    //
    var clickMe = {};
    var supports = !!document.querySelector && !!root.addEventListener; // for feature testing
    var settings; // settings placeholder

    // Default settings
    var defaults = {
        resizeLog: 'The window was resized!',
        callbackBefore: function() {},
        callbackAfter: function() {},
    };

    //
    // Methods
    //
    var addClass = function(event)
    {
        var toggle = event.target;

        if (toggle && toggle.hasAttribute('data-click-me'))
        {
            if (toggle.tagName.toLowerCase() === 'a')
            {
                event.preventDefault();
            }

            toggle.classList.add(toggle.getAttribute('data-click-me'));
        }
    };

    var eventHandler = function (event)
    {
        settings.callbackBefore;

        if (event.type === 'click')
        {
            addClass(event);
        }

        if (event.type === 'resize')
        {
            console.log(settings.resizeLog);
        }

        settings.callbackAfter;
    };

    clickMe.destroy = function ()
    {
        if (!settings) return;

        var links = document.querySelectorAll('[data-click-me]');
        for (var i = 0, len = links.length; i < len; i++)
        {
            links[i].classList.remove(links[i].getAttribute('data-click-me'));
        }

        document.removeEventListener('click', eventHandler, false);
        window.removeEventListener('resize', eventHandler, false);

        settings = null;
    };

    clickMe.init = function (options)
    {
        if (!supports) return;

        clickMe.destroy();

        settings = {...options, ...defaults, ...{}};

        console.log(settings);

        document.addEventListener('click', eventHandler, false);
        window.addEventListener('resize', eventHandler, false);
    };

    //
    // Public API
    //
    return clickMe;
});

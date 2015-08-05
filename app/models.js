var Config = Backbone.Model.extend({
    defaults: {
        username: "",
        repo: ""
    },
    url: 'config.json'
});

var Issue = Backbone.Model.extend({
	initialize: function(options){
        var config = options.config.toJSON();
        this.urlRoot = 'https://api.github.com/repos/'+ config.username +'/'+ config.repo +'/issues';
    },
    sync: function (method, model, options) {
        if (method !== 'read') return Backbone.sync.apply(this, arguments);

        var xhr = Backbone.ajax({
            type: 'GET',
            dataType: 'json',
            url: _.result(model, 'url')
        });

        return xhr.then(function (issue) {
            var markdown = new Markdown({
                text: issue.body || 'body'
            });
            
            var data = JSON.stringify( markdown.toJSON() );
            var success = options.success;
            
            return Backbone.ajax({
                url: _.result(markdown, 'url'),
                dataType: 'html',
                contentType: 'application/json',
                type: 'POST',
                data: data
            }).then(function(htmlbody) {
                var resp = _.extend({}, issue, {
                    body: htmlbody
                });
                success(resp);
            });
        });
    }
});

var Issues = Backbone.Collection.extend({
    initialize: function(options){
        var config = options.config.toJSON();
        this.url = 'https://api.github.com/repos/'+ config.username +'/'+ config.repo +'/issues'
    }
});

var Markdown = Backbone.Model.extend({
    defaults: {
        'text': '',
        'mode': 'markdown'
    },
    url: 'https://api.github.com/markdown'
});
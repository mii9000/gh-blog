var Issue = Backbone.Model.extend({
	urlRoot: 'https://api.github.com/repos/ibrahim-islam/ibrahim-islam.github.io/issues' 
});

var Issues = Backbone.Collection.extend({
	model: Issue,
	url: 'https://api.github.com/repos/ibrahim-islam/ibrahim-islam.github.io/issues'
});
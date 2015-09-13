var Router = Backbone.Router.extend({
	initialize: function(options){
		this.issues = options.issues;
		this.config = options.config;
	},
	routes: {
		'' : 'allIssues',
		'posts' : 'allIssues',
		'posts/:id' : 'postSingle'
	},
	allIssues: function(){
		UnloadWindowResize();
		$(".wrapper_pixel").empty();
		$(".wrapper_pixel").html( $("#PostListTemplate").html() );
		$(".wrapper_pixel").append( (new PostListView({collection : this.issues})).render().el );
		$(".wrapper_pixel").append( $("#Footer").html() );
	},
	postSingle: function(id){
		var issue = new Issue({id : id, config: this.config});
		issue.fetch().then(function(){
			$(".wrapper_pixel").empty();
			$(".wrapper_pixel").html( $("#PostDetailBody").html() );
			$(".main_pixel").append( (new PostDetailView({ model: issue })).render().el );
			JsForPostDetial();
			$(".wrapper_pixel").append( $("#Footer").html() );
		});
	}
});


var config = new Config();
config.fetch().then(function(){
	var issues = new Issues({ config: config, page: 1 });
	issues.fetch({
	    success: function (collection, response, options) {
	    	var linkHeader = options.xhr.getResponseHeader('Link');
	        var links = _.isNull(linkHeader) === true ? parse_link_header("") : parse_link_header(linkHeader);
    		var r = new Router({
				issues: issues,
				config: config,
				links: links
			});
			Backbone.history.start({ pushState: false });
	    }
	});
});

function parse_link_header(header) {
	var parts = header.split(',');
	var links = {};
	_.each(parts, function(p) {
		var section = p.split(';');
		if (section.length !== 2) {
		  return links;
		}
		var url = section[0].replace(/<(.*)>/, '$1').trim();
		var name = section[1].replace(/rel="(.*)"/, '$1').trim();
		links[name] = url;
	});

	return links;
}
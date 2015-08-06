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
	var issues = new Issues({ config: config });
	issues.fetch().then(function(){
		var r = new Router({
			issues: issues,
			config: config
		});
		Backbone.history.start({ pushState: false });
	});
});

var Router = Backbone.Router.extend({
	initialize: function(options){
		this.issues = options.issues;
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
		var issue = new Issue({id : id});
		issue.fetch().then(function(){
			$(".wrapper_pixel").empty();
			$(".wrapper_pixel").html( $("#PostDetailBody").html() );
			$(".main_pixel").append( (new PostDetailView({ model: issue })).render().el );
			JsForPostDetial();
			$(".wrapper_pixel").append( $("#Footer").html() );
		});
	}
});


var issues = new Issues();
issues.fetch().then(function(){
	var r = new Router({
		issues: issues
	});
	Backbone.history.start({ pushState: false });
});
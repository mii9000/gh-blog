//Helpers-------------------
Handlebars.registerHelper('TimeSpan', function(date) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    var milliseconds = new Date().getTime() - new Date(date).getTime();

    function numberEnding (number) {
        return (number > 1) ? 's ago ' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second ago '; //'just now' //or other string you like;
});


Handlebars.registerHelper('Intro', function(body){
	return body.substring(0, 150)
});

//Models------------------------
var Issue = Backbone.Model.extend({});

var Issues = Backbone.Collection.extend({
	model: Issue,
	url: 'https://api.github.com/repos/ibrahim-islam/ibrahim-islam.github.io/issues'
});


//Views
var PostListView = Backbone.View.extend({
	render: function(){
		this.collection.forEach(function(model){
			this.$el.append( (new PostItemView( { model : model } )).render().el );
		}, this);
		return this;
	}
});

var PostItemView = Backbone.View.extend({
	template: Handlebars.compile( $("#PostTemplate").html() ),
	render: function(){
		console.log(this.model.toJSON());
		this.el.innerHTML = this.template(this.model.toJSON());
		return this;
	}
});



//Router----------------------------
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
		$(".main_pixel").append( (new PostListView({collection : this.issues})).render().el );
	},
	postSingle: function(){
		console.log('In single post');
	}
}); 



var issues = new Issues();
issues.fetch().then(function(){
	var r = new Router({
		issues: issues
	});
	Backbone.history.start({ pushState: false });
});
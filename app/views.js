var PostListView = Backbone.View.extend({
	tagName: 'main',
	className: 'main_pixel headline',
	render: function(){
		this.collection.forEach(function(model){
			this.$el.append( (new PostItemView( { model : model } )).render().el );
		}, this);
		return this;
	}
});

var PostItemView = Backbone.View.extend({
	template: Handlebars.compile( $("#PostItemTemplate").html() ),
	tagName: 'article',
	className: 'article_pixel',
	render: function(){
		this.$el.append( this.template(this.model.toJSON()) );
		return this;
	}
});

var PostDetailView = Backbone.View.extend({
	className: 'article_pixel',
	tagName: 'article',
	template: Handlebars.compile( $("#PostDetailTemplate").html() ),
	render: function(){
		this.$el.append( this.template(this.model.toJSON()) );
		this.$el.attr('style', 'display:table');
		return this;
	}
});
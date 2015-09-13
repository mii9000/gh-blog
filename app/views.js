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

var LoadMoreView = Backbone.View.extend({
	tagName: 'div',
	className: 'pagination_pixel',
	template: Handlebars.compile($('#PaginationTemplate').html()),
	render: function(){
		this.$el.append( this.template(this.model.toJSON()) );
		return this;
	},
	events: {
		'click  .pagination' : 'loadMore'
	},
	loadMore: function(event){
		event.preventDefault();
        var href = $('.older-posts').attr('href');
        var pageNumber = href.split('/')[2];
        var config = new Config();
		config.fetch().then(function(){
			var moreIssues = new Issues({ config: config, page: pageNumber });
			moreIssues.fetch({
				success: function(collection, response, options){
					$('.pagination').remove();

					moreIssues.forEach(function(model){
						$(".pagination_pixel").before( (new PostItemView( { model : model } )).render().el );
					});
					
					var linkHeader = options.xhr.getResponseHeader('Link');
	        		var links = _.isNull(linkHeader) === true ? parse_link_header("") : parse_link_header(linkHeader);

					if(_.isEmpty(this.links) === false){
						var pageNumber = this.links.next.split('=')[2];
						var loadmore = new LoadMore({ pageNumber: pageNumber });
						$(".main_pixel").append( (new LoadMoreView({ model: loadmore })).render().el );
					}
				}
			});
		});
	}
});
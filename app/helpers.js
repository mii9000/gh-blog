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


Handlebars.registerHelper('PostDetailDate', function(date){
    var adate = new Date(date);
    var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    return days[adate.getDay()] + ' ' + adate.getDate() + ' ' + months[adate.getMonth()] + ' ' + adate.getFullYear();
});


Handlebars.registerHelper('LabelSplitter', function(labels){
    var links = '';
    labels.forEach(function(label){
        var hyperlink = '<a href="#">';
        hyperlink += label.name;
        hyperlink += '</a>';
        links += hyperlink;
    });
    return links;
});

Handlebars.registerHelper('Markdown', function(mk){
    var marked = markdown.toHTML(mk);    
    var code = $(marked).find('code').html();
    var result = $(marked).find('code').addClass('language-'+ code.split('\n')[0] +'').wrapAll('<pre></pre>');
    console.log( result.parent().parent().html() );
    return '';
});
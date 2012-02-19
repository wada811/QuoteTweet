function QuoteTweet(){
	var statusBoxID = ".twitter-anywhere-tweet-box-editor:last";
	var QTTag = '<li class="action-quote-tweet-container quote-tweet-link"><a class="with-icn" href="#" title="Quote Tweet"> <i class="action-rt"></i><b>QT</b></a> </li>';

	var username = jQuery.trim($("#screen-name:first").text());

	$(".js-stream-item").live('mouseover',function(){
		if ($(this).find(".quote-tweet-link").length == 0 ){
			$(this).find(".client-and-actions .js-actions").append(QTTag).find(".quote-tweet-link").click(function(){
				var tweet = $(this).parent().parent().parent().parent().parent();
				var tweettext = " QT https://twitter.com" +  tweet.find(".js-permalink").attr("href");
				var expandedUrl = "";
				tweet.find(".twitter-timeline-link").each(function(){
					expandedUrl += " " + $(this).attr("data-expanded-url");
				});
				tweettext += expandedUrl;
				new twttr.widget.TweetDialog({
					template:{title:"Quote Tweet"},
					modal: true,
					draggable: true,
					defaultContent: tweettext,
					origin: "new-tweet-titlebar-button"
				}).open().focus();
				return false;
			});
		}
	});
}

$(document).ready(function() {
	var node = document.createElement('script');
	var toInject = "("+QuoteTweet.toString()+")();";

	node.innerText = toInject ;
	document.querySelector('body').appendChild(node);
});
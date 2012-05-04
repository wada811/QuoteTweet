/*
 * Copyright 2012 wada811 <89.at.usi@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function QuoteTweet(){
	var QTTag = '<li class="action-quote-tweet-container quote-tweet-link"><a class="with-icn" href="#" title="Quote Tweet"> <i class="sm-rt"></i><b>QT</b></a> </li>';

	$(".js-stream-item").live('mouseover',function(){
		if ($(this).find(".quote-tweet-link").length == 0){
			$(this).find(".js-actions").append(QTTag).find(".quote-tweet-link").click(function(){
				var tweet = $(this).parent().parent().parent().parent().parent();
				var screenName = tweet.find(".tweet").attr("data-screen-name");
				var tweetText = " QT @" + screenName +" https://twitter.com" + tweet.find(".tweet-timestamp").attr("href");
				tweet.find(".twitter-timeline-link").each(function(){
					tweetText += " " + $(this).attr("data-expanded-url");
				});
				tweet.find(".twitter-hashtag").each(function(){
					tweetText += " " + $(this).attr("title");
				});
				new twttr.widget.TweetDialog({
					template:{title:"Quote Tweet"},
					modal: true,
					draggable: true,
					defaultContent: tweetText,
					origin: "new-tweet-titlebar-button"
				}).open().focus();
				return false;
			});
		}
	});

	document.addEventListener('keyup', function(e){
		if(e.keyCode == 81){
			var tweetText = " QT";
			$(".open").each(function(){
				tweetText += " https://twitter.com" + $(this).find(".js-permalink").attr("href");
				$(this).find(".twitter-timeline-link").each(function(){
					tweetText += " " + $(this).attr("data-expanded-url");
				});
				$(this).find(".twitter-hashtag").each(function(){
					tweetText += " " + $(this).attr("title");
				});
			});
			if(tweetText != " QT"){
				new twttr.widget.TweetDialog({
					template:{title:"Quote Tweet"},
					modal: true,
					draggable: true,
					defaultContent: tweetText,
					origin: "new-tweet-titlebar-button"
				}).open().focus();
			}
		}
	}, false);
}

$(document).ready(function() {
	var node = document.createElement('script');
	var toInject = "("+QuoteTweet.toString()+")();";

	node.innerText = toInject ;
	document.querySelector('body').appendChild(node);
});
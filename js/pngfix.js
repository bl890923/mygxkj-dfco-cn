/*
 
Correctly handle PNG transparency in Win IE 5.5 & 6.
http://homepage.ntlworld.com/bobosola. Updated 18-Jan-2006.

Use in <HEAD> with DEFER keyword wrapped in conditional comments:
<!--[if lt IE 7]>
<script defer type="text/javascript" src="pngfix.js"></script>
<![endif]-->

*/
(function(){
	var arVersion = navigator.appVersion.split("MSIE"),
	    version = parseFloat(arVersion[1]),
		i = 0,
		img = null,
		imgName = "",
		imgID = "",
		imgClass = "",
		imgTitle = "",
		imgStyle = "",
		strNewHTML = "";
	
	if ((version >= 5.5) && (document.body.filters)) {
		for (; i < document.images.length; i += 1) {
			img = document.images[i];
			imgName = img.src.toUpperCase();
			if (imgName.substring(imgName.length - 3, imgName.length) === "PNG") {
				imgID = (img.id) ? "id='" + img.id + "' " : "";
				imgClass = (img.className) ? "class='" + img.className + "' " : "";
				imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
				imgStyle = "display:inline-block;" + img.style.cssText;
				if (img.align === "left") {
					imgStyle = "float:left;" + imgStyle;
				}
				if (img.align === "right") {
					imgStyle = "float:right;" + imgStyle;
				}
				if (img.parentElement.href) {
					imgStyle = "cursor:hand;" + imgStyle;
				}
				var strNewHTML = "<span " + imgID + imgClass + imgTitle +
				" style=\"" +
				"width:" +
				img.width +
				"px; height:" +
				img.height +
				"px;" +
				imgStyle +
				";" +
				"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" +
				"(src=\'" +
				img.src +
				"\', sizingMethod='scale');\"></span>";
				img.outerHTML = strNewHTML;
				i -= 1;
			}
		}
	}
})();// JavaScript Document
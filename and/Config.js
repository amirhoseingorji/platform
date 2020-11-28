// Keys for the responsiveConfig prop.  

export const medium = "width < 992";
export const large = "width > 992";
/////////
var Host = window.location.hostname
var hostServer = "platform.ravinoserver.ir"
var Sport = hostServer==Host?"":":8200"

var Config = {
    title : "اندیشکده شفافیت برای ایران",
    _socketUrl: "https://and.sitenevis.com/socket"
};
window.document.title = Config.title
export default Config;


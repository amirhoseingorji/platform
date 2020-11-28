// Keys for the responsiveConfig prop.  

export const medium = "width < 1992";
export const large = "width > 1992";
/////////
var Host = window.location.hostname
var hostServer = "ftfsign.tarvijequran.ir"
var Sport = hostServer==Host?"":":3000"

var Config = {
    title : "پرتال چهره به چهره",
    _socketUrl: "https://ftf.sitenevis.com/socket"
};
window.document.title = Config.title
export default Config;


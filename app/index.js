
//import all the pages here which you want to be in the app and use engine.get.pageModule api to get the page
const docsPage = require('./pages/docsPage/page');
const startPage = docsPage; //declare the first page module here

require("./ui/index");
require("./globals")();
engine.ui.getComp("commonUi","loaderComp").init("page-router",{
  integrate:true,
  show:false
});
engine.ui.getComp("commonUi","messageComp").init("page-router");

/*
set the base url to the native vegana cdn,or if hosting on non native platform please
set the baseurl to where the files for the project are held.

like if index.html is available at "https://example.com/app1/index.html"
then base url is "https://example.com/app1"
*/
engine.router.set.baseHref("");


// load all the fonts here you can await on font addition if you want
engine.sketch.fonts.add("text","Montserrat-Regular","assets/fonts/Montserrat-Regular.ttf");  //simple
engine.sketch.fonts.add("text","OpenSans-Regular","assets/fonts/OpenSans-Regular.ttf");  //simple
engine.sketch.fonts.add("text","Redressed-Regular","assets/fonts/Redressed-Regular.ttf");//curve
engine.sketch.fonts.add("text","Roboto-Regular","assets/fonts/Roboto-Regular.ttf");//curve

//------------------------------------------------------------------------------
//init the page, pass anything you want to the page here

route();

function route(){
  let params = engine.params.native.get();
  if(!params.page){
    return startPage.init();
  } else {
    return startPage.init({
      cont:params.cont,
      panel:params.panel
    });
  }
}

const comps = {
	"articleComp":require("./articleComp/comp.js"),
	"loaderComp":require("./loaderComp/comp.js"),
	"menuComp":require("./menuComp/comp.js"),
	"messageComp":require("./messageComp/comp.js"),
	"mobileMenuComp":require("./mobileMenuComp/comp.js"),
	"sidepanelComp":require("./sidepanelComp/comp.js"),
	"veganaDocViewComp":require("./veganaDocViewComp/comp.js"),
};

engine.ui.add("commonUi",comps);
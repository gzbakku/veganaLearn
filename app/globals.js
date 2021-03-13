
const functions = {
  toCont:async (contName,panelName)=>{
    let contId = contName+"Cont";
    let panelId = null;
    if(panelName){panelId = panelName+"Panel"}
    engine.global.function.loader().show("loading " + contName + " apis");
    if(!engine.get.contModule("docsPage",contId)){
      let loadCont = await engine.loader.load.cont("docsPage",contId,true)
      .then(()=>{return true;}).catch(()=>{return false;});
      if(!loadCont){
        engine.global.function.loader().hide();
        engine.global.function.message().danger(`failed to load ${contName} apis please check your internet and try again.`)
      }
    }
    engine.global.function.loader().hide();
    if(engine.global.function.menu){engine.global.function.menu().close();}
    engine.router.navigate.new.cont(engine.get.contModule('docsPage',contId),{
      panel:panelId
    });
  }
};


module.exports = ()=>{
  for(let funcName in functions){
    engine.add.function(funcName,functions[funcName]);
  }
}

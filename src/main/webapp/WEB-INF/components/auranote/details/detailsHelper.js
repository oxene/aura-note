({
    open : function(component, note, mode, sort){
        if(mode === "new"){

            var text = component.get("v.text");
            var image = component.get("v.image");
            if(image){
                text = '<img src="'+image+'"/>';
            }
            var url = component.get("v.url");
            if(url){
                text = '<a href="'+url+'">'+url+'</a>';
            }

            note = $A.expressionService.create(null, {title : "", body : text, latitude : null, longitude: null})
        }

        $A.newCmpAsync(
            this,
            function(newCmp){
                var content = component.find("notes");
                var body = content.getValue("v.body");
                body.setValue(newCmp);

                setTimeout(function() {
                    // Let the world know that we need resize calcs
                    $A.get("e.ui:updateSize").fire();
                }, 400);
            },
            {
                componentDef: {
                    descriptor: "markup://auranote:note"
                },
                attributes: {
                    values: {
                        note : note,
                        mode : mode,
                        sort : sort
                    }
                }
            }
        );
        $A.eventService.finishFiring();
    }
})

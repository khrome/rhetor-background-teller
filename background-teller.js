var Teller = require('rhetor').Teller;
var request;

var BackgroundTeller = Teller.extend({
    eventConfiguration : function(context){ //context is the source of the event
        var ob = this;
        return {
            'sentence-start' : function(s){
                var document = global.document;
                var root = document.getElementById('root_background');
                var terms = s.data.split(' ').concat(s.story.keywords.slice(0, 10).concat(s.story.codes || []));
                request({
                    uri : 'https://api.tenor.com/v1/search',
                    qs : {
                        key : ob.options.tenorApiKey,
                        q : terms.join(' '),
                        contentfilter : 'off',
                        media_filter : 'minimal',
                        ar_range : 'all',
                        limit : 1
                    }
                }, function(err, res, s){
                    var data = JSON.parse(s);
                    if(data.results && data.results[0]){
                        var result = data.results && data.results[0];
                        if(result.media && result.media[0]){
                            var gif = result.media[0].gif;
                            if(gif){
                                root.style.backgroundImage = "url('"+gif.url+"')";
                            }
                        }
                    }
                });
                setTimeout(function(){
                    context.emit('sentence-stop', {});
                }, 0);
            }
        };
    },
    initializeContext : function(context, cb){
        var document = context.document;
        var root = document.getElementById('root_background');
        if(!root){
            root = document.createElement('div');
            root.setAttribute('id', 'root_background')
            document.body.appendChild(root);
        }
        cb();
    },
    cleanupContext : function(context, cb){
        cb();
    }
});
if (typeof self !== 'undefined' && global.Rhetor){
    global.Rhetor.BackgroundTeller = BackgroundTeller;
}
BackgroundTeller.setRequest = function(instance){
    request = instance;
};
module.exports = BackgroundTeller;

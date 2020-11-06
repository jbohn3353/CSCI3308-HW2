var count = 0;
var tag = "";
var page = 1;
var submitted = false;
var calling = false;

function submit(){
    count = document.getElementById("countSelect").value;
    tag = document.getElementById("tagName").value;
    page = 1;
    submitted = true;
    document.getElementById("apiResults").innerHTML = "";
    makeApiCall();
}

function makeApiCall(){
    var url = `https://www.flickr.com/services/rest/?
            method=flickr.photos.search&
            api_key=33d536522904bce2d8d5b1930a4a418c&
            tags=${tag}&
            privacy_filter=1&
            safe_search=1&
            extras=url_sq&
            per_page=${count}&
            page=${page++}&
            format=json&
            nojsoncallback=1`;

    $.ajax({url:url, dataType:"json"}).then(function(data) {
        console.log(data);
        var appendStr = "";
        if(data.stat == "ok"){
            appendStr += "<div class='card-columns'>";
            for(let i = 0; i < count; ++i){
                appendStr += `
                    <div class="card" style="display: inline-block;">
                        <img class="card-img-top" src="${data.photos.photo[i].url_sq}">
                        <div class="card-body">
                            <h5 class="card-title">${data.photos.photo[i].title}</h5>
                        </div>
                    </div>`;
            }
            appendStr += "</div>";
            document.getElementById("apiResults").innerHTML += appendStr;
        }
    });
}

function refreshBottom(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
        if(submitted) makeApiCall();
    }
}
var slowRefreshBottom = _.debounce(refreshBottom,300);
$(window).scroll(slowRefreshBottom);
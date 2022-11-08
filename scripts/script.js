function changetp2Theme(){var e=document.getElementById("tp2_theme").value,t=document.getElementById("tp2hidden");switch(e){case"default":document.getElementById("tp2theme").src="../images/22.webp",document.getElementById("tp2link").href="games/templerun2",t.style.display="none";break;case"arctic":document.getElementById("tp2theme").src="../images/22_arctic.webp",document.getElementById("tp2link").href="games/templerun2/arctic.html",t.style.display="none";break;case"festival":document.getElementById("tp2theme").src="../images/22_festival.webp",document.getElementById("tp2link").href="games/templerun2/festival.html",t.style.display="none";break;case"jungle":document.getElementById("tp2theme").src="../images/22_jungle.webp",document.getElementById("tp2link").href="games/templerun2/jungle.html",t.style.display="block"}}
function changessw(value) {document.getElementById("sswlink").href = "games/subway-surfers-unity/" + value + ".html";}
function changesswh5(){switch(document.getElementById("sswh5").value){case"default":document.getElementById("sswhtml5").href="games/subway-surfers/index.html";break;case"bali":document.getElementById("sswhtml5").href="games/subway-surfers/index.html?theme=1106-bali";break;case"hongkong":document.getElementById("sswhtml5").href="games/subway-surfers/index.html?theme=193-hongkong";break;case"singapore":document.getElementById("sswhtml5").href="games/subway-surfers/index.html?theme=177-singapore";}}
var is_iosbrowser = !!navigator.userAgent.match(/iOS\/[\d\.]+.*Safari|Mobile\/[\d\.]+/), is_ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent), is_safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), is_Android = /Android/i.test(navigator.userAgent);function _isIpad(){var isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;if (!isIpad && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {return true;}return isIpad;};var isIpadForReal = _isIpad();
function mobileIncompatible(){if(is_iosbrowser || is_ios && is_safari || isIpadForReal){$('.safari-unfriendly').addClass('disabled').html('Unavailable on this device')};if(!is_ios && !isIpadForReal && is_safari){$('.safari-unfriendly').addClass('disabled').html('Unavailable on this browser')};if(is_ios || isIpadForReal){$('.ios-unfriendly').addClass('disabled').html('Unavailable on this device')};if(is_Android || is_ios){$('.mobile-unfriendly').addClass('disabled').html('Unavailable on this device')};if(is_ios && is_iosbrowser && !is_safari){$('#downloadModalMobile').attr('data-bs-target','#unsupportedModal');}};

$('#game-search').keyup(function(){
            var searchField = $(this).val();
            if (searchField === '')  {
                $('#filter-records').html('');
                return;
            }
            var regex = new RegExp(searchField, "i");
            var output = '<div class="row mt-3">';
            var count = 1;
            $.each(gamelistJSON, function(key, val){
                if (searchField.length > 2 && val.game.search(regex) !== -1) {
                  output += '<div class="col-md-3 mb-3 d-flex">';
                  output += '<div class="card GResults"><img class="card-img-top" src="'+val.imgSrc+'" />';
                  output += '<div class="card-body">';
                  output += '<h6 class="mb-3">' + val.game + '</h6>';
                  output += '<a href="'+ val.link +'" target="_blank" class="' + (val.additionalClasses !== undefined ? val.additionalClasses : '') + ' fluent-button">Play now</a>'
                  output += '</div></div>';
                  output += '</div>';
                  count++;
                }
                if (searchField.length < 3) {output = '<p>Search term is too short. Please add more characters.</p>'}
            });
            //TODO: implement no results
            output += '</div>';
            $('#filter-records').html(output);
            mobileIncompatible();
});

$('#gamelist').pagination({ // you call the plugin
  dataSource: gamelistJSON, // pass all the data
  pageSize: 12, // put how many items per page you want
  ulClassName: "pagination justify-content-center mb-4",
  activeClassName: "page-item active",
  disableClassName: "page-item disabled",
  prevText: "Previous",
  nextText: "Next",
  position: 'top',
  callback: function(data, pagination) {
      var gamecard = $('#gamelist .listwrapper').empty();
      $.each(data, function (i, f) {
         $('#gamelist .listwrapper').append('<div class="col-md-3 mb-4 d-flex"><div class="card"><img id="'+ f.imgID +'" src="'+ f.imgSrc + '" loading="lazy" class="card-img-top"/><div class="card-body"><h5 class="semibold mb-3">'+ f.game +'</h5>'+ (f.selectorExist == true ? f.selector : '') + '</p><p class="mb-4">'+ (f.mobilenotes == true ? '<span class="checked"><i class="bi bi-phone"></i> Mobile friendly (only for Chromium browsers) <a tabindex="0" data-bs-toggle="popover" data-bs-content="Chromium is a browser engine that powers Google Chrome, Microsoft Edge, and so on. On iOS and iPadOS, only WebKit (another browser engine) is allowed due to Apple\'s strict policy. Every browser on iOS/iPadOS uses WebKit engine, including Safari."><i class="bi bi-question-circle"></i></a><br/></span>':'') + (f.mobile == true ? '<span class="checked"><i class="bi bi-phone"></i> Mobile friendly<br /></span>':'') + (f.tweaking == true ? '<span class="warningtext"><i class="bi bi-exclamation-circle"></i> Requires tweaking in Firefox <a tabindex="0" data-bs-toggle="popover" data-bs-content="Go to <code>about:config</code> in Firefox, accept the risk, then type <code>gfx.offscreencanvas.enabled</code> and change \'false\' to \'true\'."><i class="bi bi-question-circle"></i></a></span>':'') + (f.PWA == true ? '<span class="checked"><i class="bi bi-window"></i> PWA support <a tabindex="0" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content="Progressive Web App (PWA) is a technology that allows a website to be installed as an app. This is useful for mobile devices as their browsers don\'t usually have the fullscreen function. Some PWAs can be installed for offline use."><i class="bi bi-question-circle"></i><br /></span>':'') + (f.accelerometertext == true ? '<span class="warningtext"><i class="bi bi-exclamation-circle"></i> May requires accelerometer permission on mobile devices <a tabindex="0" data-bs-toggle="popover" data-bs-content="To play this game on mobile, you need to tilt it, which requires sensor. On some mobile devices, the user needs to explicitly allow the accelerometer permission so that the sensor will work. The permission will be forgotten once the user quits the browser app."><i class="bi bi-question-circle"></i></span>':'') + '</p><a' + (f.linkID !== undefined ? ' id="'+ f.linkID + '"' : '') +' href="'+ f.link +'" target="_blank" class="' + (f.additionalClasses !== undefined ? f.additionalClasses : '') + ' fluent-button">Play now</a></div></div></div>');
      });
      mobileIncompatible();
  }
});

$('#gamelist').addHook('afterPaging', function() {
    $(function(){$('[data-bs-toggle="popover"]').popover({trigger:"focus", html: true})});
    mobileIncompatible();
});

// Get the button
//Get the button
let button_top = document.getElementById("btn-button-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    button_top.style.display = "block";
  } else {
    button_top.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
button_top.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 100;
  document.documentElement.scrollTop = 100;
}
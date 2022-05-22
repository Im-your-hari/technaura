/********************
header
********************/
$(".header .header__bars").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});

$(".header .header__nav span").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});



// Contact form
function onEmailSuccess(data, textStatus, jqXR) {
  console.log("Success")
  $('#contact-feedback').css("color", "green").html("Success! Your message has been sent. We will get back to you as soon as possible!")
  $('#contact-form').css("display","none")
  $('.contact-heading').css("display","none")
}
  
function onEmailError(jqXHR, textStatus, errorThrown) {
  console.log("Error")
  $('#contact-feedback').css("color", "red").html("Uh Oh! There was a problem with your request.")
}

$('#contact-button').click(function() {
  var name=$('#contact-name').val()
  var email=$('#contact-email').val()
  var message=$('#contact-message').val()
  var subject=$('#contact-subject').val()
  var data= JSON.stringify({
    name: name,
    email: email,
    message: message,
    subject: subject,
  })

  if (name === "" || email === "" || message === "" || subject === "") {
    $('#contact-feedback').css("color", "red").html("Uh Oh! You need to fill in all fields.")
  } else {
    $.ajax({
        type: "POST",
        url: 'https://api.red.wemesh.ca/contact',
      dataType   : 'json',
      contentType: 'application/json; charset=UTF-8',
        data: data,
        success: onEmailSuccess,
      error: onEmailError,
      });
  }
});

$(document).ready(init);

let videosStarting = false

// Starts the videos in the phone elements
function videoStart($android, $iphone, $mac, $desktop) {
  if (!videosStarting) {
    videosStarting = true
    const startTime = 0
    $iphone.get(0).currentTime = startTime;
    $android.get(0).currentTime = startTime;
    $mac.get(0).currentTime = startTime;
    $desktop.get(0).currentTime = startTime;
    
    setTimeout(function () {
      videosStarting = false

      // $iphone.get(0).play();
      // $android.get(0).play();
      // $mac.get(0).play();
      // $desktop.get(0).play();
    }, 1000);
  }
}

const translations = {
  ar: {
    "watch-together": "شاهدوا معاً",
  },
  en: {
    "watch-together": "Watch Together",
  },
  es: {
    "watch-together": "¡Véanlo juntos!",
  },
  fr: {
    "watch-together": "Regardez ensemble",
  },
  it: {
    "watch-together": "Guardare Insieme",
  },
  pt: {
    "watch-together": "Assista com amigos",
  },
  ru: {
    "watch-together": "смотрите вместе",
  },
}

async function doTranslate() {
  var translates = document.querySelectorAll('[data-translate-key]')
  const language = navigator.languages?.[0].split("-")[0].toLowerCase()
  console.log(`translates `, translates, navigator.languages, language, translations[language])

  if ( language && translations[language] ) {

    translates.forEach(translateElement => {
      const translationKey = translateElement.dataset?.translateKey 
      console.log(`translateElement `, translationKey)

      if ( translationKey && translations[language][translationKey] ) {
          
        console.log(`replacing with`, translations[language][translationKey])
        translateElement.textContent = translations[language][translationKey]
      }
    })

  }
}

function isWindows() {
  if ( navigator.platform === "Win32" ||
    navigator.platform === "Win64" ||
    navigator.platform === "WOW64" 
  ) {
    return true
  }
  return false
}

function isMac() {
  if ( navigator.platform === "MacIntel" ||
    navigator.platform && navigator.platform.startsWith("Mac")
  ) {
    return true
  }
  return false
}

function isAndroid() {
  if ( navigator.platform === "Android" ) {
    return true
  }
  return false
}

function isIOS() {
  if ( navigator.platform === "iPhone" ||
    navigator.platform === "iPod" ||
    navigator.platform === "iPad" 
  ) {
    return true
  }
  return false
}

function identifyPlatform() {
  if (isAndroid()) {
    return "Android"
  }
  if (isIOS()) {
    return "iOS"
  }
  if (isMac()) {
    return "Mac"
  }
  if (isWindows()) {
    return "Windows"
  }
  return "Windows"
}

function identifyArch () {
  // from: https://github.com/feross/arch/blob/master/browser.js

  /**
   * User agent strings that indicate a 64-bit OS.
   * See: http://stackoverflow.com/a/13709431/292185
   */
  var userAgent = navigator.userAgent
  if ([
    'x86_64',
    'x86-64',
    'Win64',
    'x64;',
    'amd64',
    'AMD64',
    'WOW64',
    'x64_64'
  ].some(function (str) {
    return userAgent.indexOf(str) > -1
  })) {
    return 'x64'
  }

  /**
   * Platform strings that indicate a 64-bit OS.
   * See: http://stackoverflow.com/a/19883965/292185
   */
  var platform = navigator.platform
  if (platform === 'MacIntel' || platform === 'Linux x86_64') {
    return 'x64'
  }

  /**
   * CPU class strings that indicate a 64-bit OS.
   * See: http://stackoverflow.com/a/6267019/292185
   */
  if (navigator.cpuClass === 'x64') {
    return 'x64'
  }

  /**
   * If none of the above, assume the architecture is 32-bit.
   */
  return 'x86'
}

function downloadRave(event, platform = identifyPlatform(), arch = identifyArch()) {
  event.preventDefault()
  // document.getElementsByTagName('button')[0].innerText = platform
  let downloadLink = "https://app.rave-web.com/windows"
  switch (platform) {
    case "Android":
      downloadLink = "https://play.google.com/store/apps/details?id=com.wemesh.android"
      break;
  
    case "iOS":
      downloadLink = "https://apps.apple.com/us/app/rave-watch-party/id929775122"
      break;
  
    case "Mac":
      downloadLink = "https://app.rave-web.com/mac"
      break;
  
    case "Windows":
      if ( arch === "x64" ) {
        downloadLink = "https://app.rave-web.com/windows"
      } else if ( arch === "x86" ) {
        downloadLink = "https://app.rave-web.com/windows-32bit"
      }
      break;
  
    default:
      break;
  }

  // if ( platform === "Windows") {
  //   if (identifyArch() === "x64") {
  //     platform += " 64bit"
  //   } else {
  //     platform += " 32bit"
  //   }
  // }
  window.location = downloadLink
  console.log(`nav`, platform, arch, downloadLink)
}

function isIphone() {
  return false
  return /iPad|iPhone|iPod/.test(navigator.platform);
}

function init() {
  /*
    Phone Video Sync Management
    */
  var $android = $("#android video"),
    $iphone = $("#iphone video"),
    $mac = $("#mac video"),
    $desktop = $("#desktop video"),
  
    elemsReady = 0,
    needReady = 4;

  doTranslate()

  // If the video is in the cache of the browser,
  // the 'canplaythrough' event might have been triggered
  // before we registered the event handler.
  if ($android.get(0).readyState > 3 ) {
    elemsReady++;
  } else {
    $android.one('canplay', function () {
      elemsReady++;

      if (elemsReady == needReady) {
        elemsReady = 0;
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });
  }
  
  if ($iphone.get(0).readyState > 3 ) {
    elemsReady++;
  } else {
    $iphone.one('canplay', function () {
      elemsReady++;

      if (elemsReady == needReady) {
        elemsReady = 0;
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });
  }
  
  if ($mac.get(0).readyState > 3 ) {
    elemsReady++;
  } else {
    $mac.one('canplay', function () {
      elemsReady++;

      if (elemsReady == needReady) {
        elemsReady = 0;
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });
  }
  
  if ($desktop.get(0).readyState > 3 ) {
    elemsReady++;
  } else {
    $desktop.one('canplay', function () {
      elemsReady++;

      if (elemsReady == needReady) {
        elemsReady = 0;
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });
  }

  if (elemsReady == needReady) {
    elemsReady = 0;
    videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
  }

  // $bgvid.on('canplay', function () {
  //   $bgvid.get(0).play();
  // });

  // $bgvid.on('ended', function () {
  //   $bgvid.get(0).play();
  // });

  // $djvid.on('canplay', function () {
  // $djvid.get(0).play();
  // });

  // $djvid.on('ended', function () {
  // $djvid.get(0).play();
  // });

  // These event listeners are used to sync video looping.
  $android.on('timeupdate', function (event) {
    if ( !videosStarting && event.target.currentTime < 0.5 ) {
      videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
    }
  });

  $iphone.on('timeupdate', function (event) {
    if ( !videosStarting && event.target.currentTime < 0.5 ) {
      console.log(`iphone start!`)
      videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
    }
  });

  $mac.on('timeupdate', function (event) {
    if ( !videosStarting && event.target.currentTime < 0.5 ) {
      console.log(`mac start!`)
      videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
    }
  });

  $desktop.on('timeupdate', function (event) {
    if ( !videosStarting && event.target.currentTime < 0.5 ) {
      console.log(`desktop start!`)
      videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
    }
  });

}

//firebase check 
document.getElementById('frmContact').addEventListener('submit',contactFrm);

function contactFrm(e){
  console.log('Working');
}
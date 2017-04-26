jsPsych.plugins['photo-upload'] = (function(){

  var plugin = {};
  
  plugin.trial = function(display_element, trial){
    // allow variables as functions
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // set default values for the parameters;
    trial.prompt = trial.prompt || "";
    
    // now we want to do an initial append of every html object
    
    // display prompt if there is one
    if (trial.prompt !== "") {display_element.append('<div class="prompt" align="center"><p>' + trial.prompt + "</p></div>");}
    
    // then the photo stuff
    display_element.append('<div class="container"> <div class="app"> <a href="#" id="start-camera" class="visible">Touch here to start the app.</a> <video id="camera-stream"></video> <img id="snap"> <p id="error-message"></p> <div class="controls"> <a href="#" id="delete-photo" title="Delete Photo" class="disabled"><i class="material-icons">delete</i></a> <a href="#" id="take-photo" title="Take Photo"><i class="material-icons">camera_alt</i></a> <a href="#" id="download-photo" download="selfie.png" title="Save Photo" class="disabled"><i class="material-icons">file_download</i></a> </div> <!-- Hidden canvas element. Used for taking snapshot of video. --> <canvas></canvas> </div> </div>');

    // now photo code
        // References to all the elements we will need
    var video = document.querySelector('#camera-stream'),
        image = document.querySelector('#snap'),
        start_camera = document.querySelector('#start-camera'),
        controls = document.querySelector('.controls'),
        take_photo_btn = document.querySelector('#take-photo'),
        delete_photo_btn = document.querySelector('#delete-photo'),
        error_message = document.querySelector('#error-message');

    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia = ( navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
    
    // set up the camera; special condition in case this fails
    if(!navigator.getMedia){
      displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
    }
    else{
      // Request the camera.
      navigator.getMedia(
        {
          video: true
        },
        // Success Callback
        function(stream){
    
          // Create an object URL for the video stream and
          // set it as src of our HTLM video element.
          video.src = window.URL.createObjectURL(stream);
    
          // Play the video element to start the stream.
          video.play();
          video.onplay = function() {
            showVideo();
          };
    
        },
        // Error Callback
        function(err){
          displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
        }
      );
    }
    
    // Mobile browsers cannot play video without user input,
    // so here we're using a button to start it manually.
    start_camera.addEventListener("click", function(e){
      e.preventDefault();
    
      // Start video playback manually.
      video.play();
      showVideo();
    });
    
    // make the take photo button work
    take_photo_btn.addEventListener("click", function(e){
      e.preventDefault();
    
      var snap = takeSnapshot();
    
      // Show image. 
      image.setAttribute('src', snap);
      image.classList.add("visible");
    
      // Enable delete button
      delete_photo_btn.classList.remove("disabled");
    
      // Pause video playback of stream.
      video.pause();
    });
    
    // make the delete photo button work
    delete_photo_btn.addEventListener("click", function(e){
      e.preventDefault();
    
      // Hide image.
      image.setAttribute('src', "");
      image.classList.remove("visible");
    
      // Disable delete button
      delete_photo_btn.classList.add("disabled");
    
      // Resume playback of stream.
      video.play();
    });
    
    // code to show video stream
    function showVideo(){
      // Display the video stream and the controls.
    
      hideUI();
      video.classList.add("visible");
      controls.classList.add("visible");
    }
    
    // code to take a snapshot of video stream
    function takeSnapshot(){
      // Here we're using a trick that involves a hidden canvas element.  
    
      var hidden_canvas = document.querySelector('canvas'),
          context = hidden_canvas.getContext('2d');
    
      var width = video.videoWidth,
          height = video.videoHeight;
    
      if (width && height) {
    
        // Setup a canvas with the same dimensions as the video.
        hidden_canvas.width = width;
        hidden_canvas.height = height;
    
        // Make a copy of the current frame in the video on the canvas.
        context.drawImage(video, 0, 0, width, height);
    
        // Turn the canvas image into a dataURL that can be used as a src for our photo.
        return hidden_canvas.toDataURL('image/png');
      }
    }
    
    // for displaying error messages
    function displayErrorMessage(error_msg, error){
      error = error || "";
      if(error){
        console.log(error);
      }
    
      error_message.innerText = error_msg;
    
      hideUI();
      error_message.classList.add("visible");
    }
    
    
    function hideUI(){
      // Helper function for clearing the app UI.
    
      controls.classList.remove("visible");
      start_camera.classList.remove("visible");
      video.classList.remove("visible");
      snap.classList.remove("visible");
      error_message.classList.remove("visible");
    }
    
    // end with a button to submit a result; it needs to hide the video and prompt and the button, producing new stuff
    display_element.append($('<button>', {
      'id': 'next1',
      'class': 'button1',
      'html': 'Next'
    }));
    
    // part of experiment after first click of next button
    $("#next1").click(function() {
        // hide prompt
        prompthtml = document.getElementsByClassName('prompt')[0];
        prompthtml.style.display = 'none';
        
        // hide photo
        app = document.getElementsByClassName('container')[0];
        app.style.display = 'none';
        
        // hide button
        button = document.getElementsByClassName('button1')[0];
        button.style.display = 'none';

        // then follow up instructions (dependent on condition)
        if (trial.condition == 1) {
            display_element.append('<div class="followup">Thank you for uploading a photo of yourself smiling!&nbsp;<div><br></div><div>Next, we would like you to view your photo.</div><div>Your photo will be posted on the next page, and viewed by you.&nbsp;</div><div><br></div><div>Please click "Next" to continue.&nbsp;</div></div>');
        } else {
            display_element.append('<div class="followup">Thank you for uploading a photo of yourself smiling!<br> <br> Next, we would like to share your photo with other MTurk workers who are standing by and participating in a different study.&nbsp;<div>In a moment, your photo will be posted on our server, and these other MTurk workers will view your photo. On the next page, you will see your photo post, along with how many MTurk workers are viewing it.&nbsp;<div><div><br></div><div>Please click "Next" to continue.&nbsp;</div></div></div></div>');
        }
        
        // a new button
        display_element.append($('<button>', {
            'id': 'next2',
            'class': 'button2',
            'html': 'Next'
        }));
        
        // part of experiment after second click of next button
        $("#next2").click(function() {
            // hide followup instructions
            followup = document.getElementsByClassName('followup')[0];
            followup.style.display = 'none';
            
            // hide button
            button = document.getElementsByClassName('button2')[0];
            button.style.display = 'none';
            
            // then server loading page
            if (trial.condition == 1) {
                display_element.append('<div class="loading"><div style="text-align: center;">Please wait while the server loads.<br> <br> <img src="https://raw.githubusercontent.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/loading.gif" style="width: 144px; height: 144px;"></div></div>');
            } else {
                display_element.append('<div class="loading"><div style="text-align: center;">Please wait while we upload your message on our server.<br> <br> <img src="https://raw.githubusercontent.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/loading.gif" style="width: 144px; height: 144px;"></div></div>');
            }
            
            // after 3 seconds, move on to the next step
            // for now, just end the experiment
            setTimeout(function(){
              // hide the other stuff
              loading = document.getElementsByClassName('loading')[0];
              loading.style.display = 'none';
              
              if (trial.condition == 1) {
                  // unhide photo, but do hide control buttons
                  $("container").show();
                  // add final text
                  display_element.append('<div class="final" style="text-align: center;">Here is your photo. Please view it.<br> The "Next" button will appear in a few moments.&nbsp;</div><div style="text-align: center;">Please click it to continue</div>');
              } else if (trial.condition == 2) {
                  // show everything that was in the other one
                  display_element.append('<div style="text-align: center;">Please wait while other participants view and read your message.&nbsp; &nbsp;</div><div style="text-align: center;"><br><b> Participants currently viewing your message:&nbsp;</b></div> <div style="text-align: center;">&nbsp;</div> <div style="text-align: center;"> <video autoplay="" class="qmedia" height="240" peload="auto" width="360"><source src="https://cdn.rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/Alone_30sec.mp4" type="video/mp4"> <embed align="middle" autoplay="true" bgcolor="white" class="qmedia" height="240" pluginspage="http://www.apple.com/quicktime/download/" src="https://cdn.rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/3user_15sec.mp4" type="video/quicktime" width="360"></video>&nbsp;</div><div style="text-align: center;"><br> The "Next" button will appear in a few moments.&nbsp;</div> <div style="text-align: center;">Please click it to continue.</div>');
              } else {
                  // same for final condition
                  display_element.append('<div style="text-align: center;"> <div style="text-align: center;">Please wait while other participants view and read your message.&nbsp; &nbsp;</div><div style="text-align: center;"><br><b> Participants currently viewing your message:&nbsp;</b></div> <div style="text-align: center;">&nbsp;</div> <div style="text-align: center;"> <video autoplay="" class="qmedia" height="240" peload="auto" width="360"><source src="https://cdn.rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/3user_15sec.mp4" type="video/mp4"><embed align="middle" autoplay="true" bgcolor="white" class="qmedia" height="240" pluginspage="http://www.apple.com/quicktime/download/" src="https://cdn.rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/3user_15sec2.mp4" type="video/quicktime" width="360"></video>&nbsp;</div><div style="text-align: center;"><br> <div style="text-align: center;"> The "Next" button will appear in a few moments.&nbsp;</div> <div style="text-align: center;">Please click it to continue.</div> </div></div>');
              }
              
              // no matter what, we want a final "Next Button" to finish the trial with
              display_element.append($('<button>', {
                'id': 'nextlast',
                'class': 'buttonlast',
                'html': 'Next'
              }));
              
              $("#nextlast").click(function() {
                display_element.html(''); // clear the display
                
                // data saving
                var trialdata = {
                  prompt: trial.prompt,
                  condition: trial.condition,
                };
                
                jsPsych.finishTrial(trialdata); // end
              });
            }, 3000);
            });
        });
    };
    
      return plugin;
  })();

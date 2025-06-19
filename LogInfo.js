(async function () {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenSize = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cookiesEnabled = navigator.cookieEnabled;

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

  console.log("User Agent:", userAgent);
  console.log("Platform:", platform);
  console.log("Language:", language);
  console.log("Screen Size:", screenSize);
  console.log("Timezone:", timezone);
  console.log("Cookies Enabled:", cookiesEnabled);
  console.log("Public IP:", publicIP);
  console.log("Local IP:", localIP);

})();

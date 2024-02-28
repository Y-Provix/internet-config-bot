const { createEmbed } = require("./modules");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loginTelegram = async (puppeteer) => {
  const browser = await puppeteer.launch({
    userDataDir: "E:provix puppeteer",
  });
  const page = await browser.newPage();

  await page.goto("https://web.telegram.org", { waitUntil: "load" });

  const checkLogin = await page
    .waitForSelector("canvas", { timeout: 10000 })
    .then((t) => t)
    .catch(() => null);

  if (!checkLogin) {
    await sleep(10000);
    await page.screenshot({ path: "telegram_qr_code.png" });
    await page.waitForSelector("input", { timeout: 0 });
  }

  await page.goto("https://web.telegram.org/k/#@WEusage334_bot", {
    waitUntil: "networkidle2",
  });

  await sleep(3000);
  await page.waitForSelector(
    ".input-message-input.is-empty.scrollable.scrollable-y.no-scrollbar.input-field-input-fake",
    { timeout: 0 }
  );

  console.log("Telegram client is ready!");
  return page;
};

const getData = async (page, message) => {
  const replyLoading = await message.reply("<a:e:1211607498474397777> Loading");

  replyLoading.edit("<a:e:1211607498474397777> Checking user. (1/2)");
  await page.click(
    ".input-message-input.is-empty.scrollable.scrollable-y.no-scrollbar.input-field-input-fake"
  );

  replyLoading.edit("<a:e:1211607498474397777> Checking user.. (1/2)");
  await sleep(500);
  await page.keyboard.type(`/usage_add ${message.content.split(" ")[1]}`);

  replyLoading.edit("<a:e:1211607498474397777> Checking user... (1/2)");
  await sleep(500);
  await page.click(
    'button[class="btn-icon rp btn-circle btn-send animated-button-icon send"]'
  );

  replyLoading.edit("<a:e:1211607498474397777> Get data. (2/2)");
  await page.click(
    ".input-message-input.is-empty.scrollable.scrollable-y.no-scrollbar.input-field-input-fake"
  );

  await sleep(500);
  await page.keyboard.type(`/usage ${message.content.split(" ")[1]}`);

  await sleep(500);
  await page.click(
    'button[class="btn-icon rp btn-circle btn-send animated-button-icon send"]'
  );
  replyLoading.edit("<a:e:1211607498474397777> Get data.. (2/2)");
  await sleep(1500);
  replyLoading.edit("<a:e:1211607498474397777> Get data... (2/2)");
  await page.waitForSelector(".bubbles-group-last", { timeout: 0 });
  let lastMessage = await page.evaluate(() => {
    const lastMessageElement = document.querySelector(
      ".bubbles-group:last-child"
    );
    return lastMessageElement ? lastMessageElement.textContent.trim() : null;
  });
  if (lastMessage.indexOf("Email") === -1) {
    replyLoading.edit(
      `<a:e:1211607498474397777> The result will appear <t:${
        Math.round(new Date(Date.now()) / 1000) + 6
      }:R>`
    );
    await sleep(5000);
    await page.waitForSelector(".bubbles-group-last", { timeout: 0 });
    lastMessage = await page.evaluate(() => {
      const lastMessageElement = document.querySelector(
        ".bubbles-group:last-child"
      );
      return lastMessageElement ? lastMessageElement.textContent.trim() : null;
    });
  }

  if (lastMessage.trim().indexOf("No") !== -1)
    return replyLoading.edit({
      content: " ",
      embeds: [createEmbed(" ", "No result!", "Red")],
    });

  const details = [
    "Email",
    "Enabled",
    "Connection status",
    "Active",
    "Expire Date",
    "Upload",
    "Download",
    "Total",
  ];
  let argsMsg = lastMessage.replaceAll("\n", ":");
  let argsMsg2 = [];
  argsMsg = argsMsg.split(":");
  let body = "{";
  for (el of argsMsg) {
    el = el.replaceAll("↓", " ");
    el = el.replaceAll("↑", " ");
    el = el.trim();
    argsMsg2.push(el);
    console.log(`el: "${el}"`);
  }
  console.log("_________");
  for (let i = 0; i <= argsMsg2.length; i++) {
    console.log(argsMsg2[i]);
    const checkDetails = details.find((d) => d === argsMsg2[i]);
    if (checkDetails) {
      body += `"${argsMsg2[i].replaceAll(" ", "_")}": "${argsMsg2[i + 1]}",`;
    }
  }
  body = body.slice(0, -1);
  body += "}";
  body = JSON.parse(body);

  let Expire_Date = body.Expire_Date.split(" ");
  Expire_Date = Expire_Date[0].replaceAll("-", " / ");
  body.Expire_Date = Expire_Date;
  body.status = true;

  body.replyLoading = replyLoading;
  return body;
};

module.exports = { loginTelegram, getData };

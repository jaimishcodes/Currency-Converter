const dropLists = document.querySelectorAll("select");
const fromCurr = dropLists[0];
const toCurr = dropLists[1];
const msg = document.querySelector(".msg");
const form = document.querySelector("form");
const amountInput = form.querySelector("input");

for (let select of dropLists) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.text = currCode;
    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  let code = element.value;
  let countryCode = countryList[code];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Default values
fromCurr.value = "USD";
toCurr.value = "INR";
updateFlag(fromCurr);
updateFlag(toCurr);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = amountInput.value.trim();
  if (!amount || isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter valid amount";
    return;
  }

  msg.innerText = "Getting exchange rate...";

  let url = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    let rate = data.rates[toCurr.value];
    let finalAmount = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Something went wrong. Try again later.";
  }
});
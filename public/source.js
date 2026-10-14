async function callAPI() {
  const inputBody = {
    inputText: document.querySelector("#inputText").value,
    persona: document.querySelector("#persona").value,
    audience: document.querySelector("#audience").value,
    length: Number(document.querySelector("#length").value),
    provider: document.querySelector("#provider").value,
    model: document.querySelector("#model").value,
    context: document.querySelector("#context").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  };

  const button = document.querySelector("#generateButton");
  button.disabled = true;
  button.textContent = "Generating...";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(inputBody)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Generation failed.");
    }

    generateDescription(data);
  } catch (error) {
    alert(error.message);
  } finally {
    button.disabled = false;
    button.textContent = "Generate Description";
  }
}

function generateDescription(output) {
  document.querySelector("#outputTitleValue").textContent = output.title;
  document.querySelector("#outputBody").textContent = output.body;
  document.querySelector("#outputStyle").textContent = output.style;
  document.querySelector("#outputCitations").textContent = output.citations?.length ? output.citations.join(", ") : "None";
  document.querySelector("#outputModeration").textContent = output.moderation_flags || "None";
  document.querySelector("#outputPromptTokens").textContent = output.tokens?.prompt ?? "N/A";
  document.querySelector("#outputCompletionTokens").textContent = output.tokens?.completion ?? "N/A";
  document.querySelector("#outputLatency").textContent = output.latency_ms ?? "N/A";
  document.querySelector("#outputCost").textContent = typeof output.cost_est === "number" ? "$" + output.cost_est.toFixed(4) : "N/A";
  document.querySelector("#outputSection").style.display = "block";
}

function copyBody() {
  const text = document.querySelector("#outputBody").textContent;
  navigator.clipboard.writeText(text).then(() => alert("Body copied to clipboard!"));
}

function resetForm() {
  document.querySelector("#inputText").value = "";
  document.querySelector("#persona").value = "";
  document.querySelector("#audience").value = "";
  document.querySelector("#length").value = "60";
  document.querySelector("#provider").value = "openai";
  document.querySelector("#model").value = "gpt-4o-mini";
  document.querySelector("#context").value = "";
  document.querySelector("#outputSection").style.display = "none";
}

document.querySelector("#generateButton").addEventListener("click", callAPI);
document.querySelector("#copyButton").addEventListener("click", copyBody);
document.querySelector("#resetButton").addEventListener("click", resetForm);

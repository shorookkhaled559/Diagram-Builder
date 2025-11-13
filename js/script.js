const addRowBtn = document.getElementById("addRow");
const generateBtn = document.getElementById("generateBtn");
const connectionsDiv = document.getElementById("connections");
const resultDiv = document.getElementById("result");
const messageDiv = document.getElementById("message");
let currentDiagram = "";

function showMessage(text, type = "info") {
  let color = "text-gray-700";
  if (type === "error") color = "text-red-600";
  else if (type === "success") color = "text-green-600";
  messageDiv.className = `mt-4 text-center font-semibold ${color}`;
  messageDiv.textContent = text;
}

addRowBtn.addEventListener("click", () => {
  const row = document.createElement("div");
  row.classList.add("flex", "flex-col", "gap-3", "w-full");

  row.innerHTML = `
    <div>
      <input type="text" placeholder="From" 
        class="from w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
    </div>
    <div>
      <input type="text" placeholder="To" 
        class="to w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
    </div>
  `;

  connectionsDiv.appendChild(row);
});

generateBtn.addEventListener("click", async () => {
  const fromInputs = document.querySelectorAll(".from");
  const toInputs = document.querySelectorAll(".to");
  let diagram =
    'digraph G {\n  rankdir=LR;\n  node [shape=box, style=filled, color="#6366f1", fontcolor=white];\n';
  let hasConnections = false;

  fromInputs.forEach((from, i) => {
    const to = toInputs[i];
    if (from.value && to.value) {
      diagram += `  ${from.value} -> ${to.value};\n`;
      hasConnections = true;
    }
  });

  diagram += "}";

  if (!hasConnections) {
    showMessage("Please add at least one connection!", "error");
    return;
  }

  currentDiagram = diagram;
  resultDiv.innerHTML =
    "<p class='text-gray-600 italic'>Generating diagram...</p>";
  showMessage("");

  try {
    const response = await fetch("https://kroki.io/graphviz/svg", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: diagram,
    });

    if (!response.ok) throw new Error("Failed to generate diagram");
    const svg = await response.text();
    resultDiv.innerHTML = svg;
    showMessage("Diagram generated successfully!", "success");
  } catch (err) {
    resultDiv.innerHTML = `<p class='text-red-600 font-semibold'>Error: ${err.message}</p>`;
    showMessage("Error generating diagram!", "error");
  }
});

async function exportDiagram(format) {
  if (!currentDiagram) {
    showMessage("Please generate the diagram first!", "error");
    return;
  }

  try {
    const response = await fetch(`https://kroki.io/graphviz/${format}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: currentDiagram,
    });

    if (!response.ok) {
      showMessage(`${format.toUpperCase()} format not available.`, "error");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagram.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showMessage(
      `${format.toUpperCase()} file downloaded successfully!`,
      "success"
    );
  } catch (err) {
    showMessage("Error exporting diagram: " + err.message, "error");
  }
}

document
  .getElementById("exportSvg")
  .addEventListener("click", () => exportDiagram("svg"));
document
  .getElementById("exportPng")
  .addEventListener("click", () => exportDiagram("png"));
document
  .getElementById("exportPdf")
  .addEventListener("click", () => exportDiagram("pdf"));

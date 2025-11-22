# Diagram Builder  

This project is an **interactive online diagram generator** that allows users to **create and visualize diagrams instantly** using the **Kroki API**.  
It’s built with **HTML, Tailwind CSS, and JavaScript**, and provides a **clean, responsive interface** for generating diagrams from text input in multiple formats (like PlantUML, Mermaid, Graphviz, etc.).

---

## Live Demo  

You can try the live version here:  
[Live Demo](https://shorookkhaled559.github.io/Diagram-Builder/)  

---

## Features  

- **Instant Diagram Rendering** — Convert diagram code into images in real time using the Kroki API.  
- **Multiple Diagram Types** — Supports various formats such as PlantUML, Mermaid, Graphviz, and more.  
- **Copy & Download** — Copy your diagram as an SVG or download it directly to your device.  
- **Error Display** — Shows user-friendly messages for invalid inputs or API issues.  
- **Responsive Design** — Works seamlessly on both desktop and mobile devices.  

---

## Technologies Used  

- **HTML5** — Structure and layout of the web app.  
- **Tailwind CSS** — For modern, responsive, and utility-first styling.  
- **JavaScript (ES6)** — Handles API requests, SVG rendering, and UI updates.  
- **Kroki API** — Converts diagram source text into visual diagrams via REST calls.  

---

## API Used  

**Base URL:**  
```
https://kroki.io/
```

**Example (JavaScript) — Generate a PlantUML diagram:**  
```js
const diagramType = "plantuml";
const code = "@startuml\nAlice -> Bob: Hello!\n@enduml";

fetch(`https://kroki.io/${diagramType}/svg`, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: code
})
  .then(res => res.text())
  .then(svg => console.log(svg));
```

Kroki is **free**, **public**, and requires **no authentication**.  

---

## Project Structure  

```
Diagram-Builder/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
└── README.md
```

---

## How It Works  

1. User writes diagram code (e.g., PlantUML or Mermaid) in the input field.  
2. User selects the diagram type from the dropdown list.  
3. When the **Generate** button is clicked, the app sends the code to **Kroki API**.  
4. The API returns an **SVG diagram**, which is displayed on the page.  
5. The user can **copy** or **download** the diagram.  
6. If there’s an error (e.g., invalid syntax), a **visible HTML message** is displayed below the form.  

---

## How to Run Locally  

1. Clone this repository:  
```bash
git clone https://github.com/shorookkhaled559/Diagram-Builder
```
2. Navigate to the project folder:  
```bash
cd Diagram-Builder
```
3. Open `index.html` in your browser.  
4. Start writing your diagram code and click **Generate** to see it rendered instantly.  

---

## Future Enhancements  

- Add **syntax highlighting** for diagram code.  
- Add **auto-detect diagram type** from input.  
- Add **dark/light mode toggle**.  
- Add **diagram history and save feature**.  

---

## 🪪 License  

This project is **open-source** and free for educational and personal use.  
Developed by **Shorouk Khaled**.  

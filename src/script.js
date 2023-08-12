const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]'),
  noteInputForm = document.querySelectorAll(".inbox form"),
  inbox = document.querySelector(".inbox"),
  completedTasks = document.querySelector(".completed-tasks"),
  tools = document.querySelectorAll(".tool-tray button"),
  tasks = document.querySelector(".tasks"),
  completedTasksButton = document.querySelector(".c-tasks");

let totalTools = tools.length;
let countNotes = 0;

// Event Elegation handler
const addGlobalEventListener = (type, selector, callback) => {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
};

// --------------------------------Tool Handlers--------------------------------
const modeChange = () => {
  let bodyClass = document.body.classList;

  bodyClass.contains("bg-[url(./images/bg.jpg)]")
    ? bodyClass.replace(
        "bg-[url(./images/bg.jpg)]",
        "bg-[url(./images/bg-dark.jpg)]"
      )
    : bodyClass.replace(
        "bg-[url(./images/bg-dark.jpg)]",
        "bg-[url(./images/bg.jpg)]"
      );

  // console.log(bodyClass);
};
const addTasks = () => {
  if (countNotes != 4) {
    inbox.innerHTML += `<div
    class="item saturate-[90%] flex items-center rounded-lg border-b border-b-[#f1f1f1] backdrop-blur-xl transition-opacity duration-500"
  >
    <input class="m-5" type="checkbox" />
    <div
      class="px-3 text-white flex-1 transition-[background] text-lg font-extralight border-l border-l-[#d1e2ff]"
    >
      <form class="form-input flex items-center relative">
        <input
          class="bg-transparent flex basis-[20rem] text-white focus:outline-none placeholder-[#FDE5EC]"
          type="text"
          placeholder="Add a note here"
        />
        <button
          type="submit"
          class="absolute right-0 rounded-r-sm transition-all duration-300 hover:opacity-80"
        >
          <img src="./images/done.svg" />
        </button>
      </form>
    </div>
  </div>`;
  } else {
    alert(`You can add max of ${++countNotes}  notes...`);
  }
  countNotes++;
};
const allDoneTasks = (e) => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    toggleStrikeThrough(checkbox, e);
  });
};
// ------------------------------
let getCheckedTasks = () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.checked) {
      completedTasks.appendChild(checkbox.parentElement);
    }
  });
};

// ----------------------------------- Task Menu -------------------------------
tasks.addEventListener("click", () => {
  completedTasks.classList.add("hidden");
  completedTasksButton.classList.remove("border-b-white");

  tasks.classList.add("border-b-white");
  tasks.classList.add("opacity-100");
  inbox.classList.remove("hidden");
});

completedTasksButton.addEventListener("click", () => {
  completedTasks.classList.remove("hidden");
  completedTasksButton.classList.add("border-b-white");
  completedTasksButton.classList.add("opacity-100");

  tasks.classList.remove("opacity-100");
  tasks.classList.remove("border-b-white");
  inbox.classList.add("hidden");

  getCheckedTasks();
});

// -------------------------------------Tools--------------------------------------
// Dark Mode toggle tool
tools[0].addEventListener("click", modeChange);

//  Add Tasks tool
tools[1].addEventListener("click", addTasks);

// ----------------------------- Main Implementations -------------------------------

// Implementaing input form type
const formCallback = (e) => {
  e.preventDefault();
  let inputNote = e.target.firstElementChild.value;
  e.target.parentElement.innerHTML = inputNote;
};
addGlobalEventListener("submit", "form", formCallback);

// -----------Striking linethrough----------
const toggleCheckBox = (checkbox) => {
  !checkbox.checked ? (checkbox.checked = true) : (checkbox.checked = false);
};

// Callback function for toggling strike-through
const toggleStrikeThrough = (checkbox, activeElement) => {
  const text = checkbox.nextElementSibling;
  text.classList.toggle("line-through");
  if (checkbox != activeElement) toggleCheckBox(checkbox);
};

// Event listener for checkbox clicks
addGlobalEventListener("change", 'input[type="checkbox"]', (e) => {
  toggleStrikeThrough(e.target, e.target);
});

// ------------------------Handling shift+mouse_checked------------------------
let lastChecked;

const handleCheckCallback = (e) => {
  let inBetween = false;
  const firstChecked = e.target;

  if (e.shiftKey && e.target.checked) {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox === e.target || checkbox === lastChecked)
        inBetween = !inBetween;
      if (inBetween) {
        checkbox.checked = true;
      }
      if (
        checkbox.checked &&
        checkbox != firstChecked &&
        checkbox != lastChecked
      ) {
        toggleStrikeThrough(checkbox, checkbox);
      }
    });
  }
  lastChecked = e.target;
};
addGlobalEventListener("click", 'input[type="checkbox"]', handleCheckCallback);

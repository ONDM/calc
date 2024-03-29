document.addEventListener("DOMContentLoaded", function ()
{
  var defaultButton = document.querySelector('button:first-of-type');
  changeButtonStyle(defaultButton);
});

// Zjištění stavu připojení
function isOnline()
{
  return navigator.onLine;
}
// Obsluha online
function handleOnline()
{
  console.log('Online: Připojeno k internetu');
}

// Obsluha offline
function handleOffline()
{
  console.log('Offline: Ztráta připojení k internetu');
}
// Posluchače online a offline
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
// Inicializace
if (isOnline())
{
  console.log('Online: Připojeno k internetu');
}
else
{
  console.log('Offline: Ztráta připojení k internetu');
}

var originalContent = document.getElementById('nadpis').innerHTML;
var activeButton = null;

function calculateAllowedAbsentHours()
{
  var totalHoursInput = document.getElementById("totalHours");
  var missedHoursInput = document.getElementById("missedHours");
  var resultDiv = document.getElementById("result");
  if (totalHoursInput.value === "")
  {
    resultDiv.textContent = "Napiš hodnotu do prvního pole.";
    resultDiv.style.color = "red";
    resultDiv.style.display = "block";
    return;
  }

  if (activeButton.textContent === "Kolik hodin můžu chybět")
  {
    if (missedHoursInput.value === "")
    {
      resultDiv.textContent = "Napiš hodnotu do druhého pole.";
      resultDiv.style.color = "red";
      resultDiv.style.display = "block";
      return;
    }
  }
  else if (activeButton.textContent === "Kolik budu mít procent")
  {
    var otextInput = document.getElementById("otext");
    if (missedHoursInput.value === "" || otextInput.value === "")
    {
      resultDiv.textContent = "Napiš hodnotu do všech polí.";
      resultDiv.style.color = "red";
      resultDiv.style.display = "block";
      return;
    }
  }

  resultDiv.style.display = "none";
  var totalHoursValue = parseInt(totalHoursInput.value);
  if (activeButton.textContent === "Kolik hodin můžu chybět")
  {
    var missedHoursValue = parseInt(missedHoursInput.value);
    var allowedAbsentHours = Math.floor(totalHoursValue * 0.25 - missedHoursValue);
    var hoursText = (allowedAbsentHours === 1) ? "hodinu" : (allowedAbsentHours >= 2 && allowedAbsentHours <= 4) ? "hodiny" : "hodin";
    if (allowedAbsentHours === 0)
    {
      resultDiv.textContent = "Už nemůžeš chybět!";
      resultDiv.style.color = "red";
    }
    else if (allowedAbsentHours < 0)
    {
      resultDiv.textContent = "Už nemůžeš chybět!";
      resultDiv.style.color = "red";
    }
    else
    {
      resultDiv.textContent = "Můžeš chybět " + allowedAbsentHours + " " + hoursText + ".";
      resultDiv.style.color = (allowedAbsentHours / totalHoursValue * 100 > 25) ? "red" : "green";
    }
  }
  else if (activeButton.textContent === "Kolik budu mít procent")
  {
    var missedHoursValue = parseInt(missedHoursInput.value);
    var otextInputValue = parseInt(otextInput.value);
    var totalAbsentHours = missedHoursValue + otextInputValue;
    var allowedAbsentPercentage = (totalAbsentHours / totalHoursValue) * 100;

    resultDiv.textContent = "Budeš mít " + 
    allowedAbsentPercentage.toFixed(2) + "% absence.";
    resultDiv.style.color = (allowedAbsentPercentage > 25) ? "red" : "green";
  }

  resultDiv.style.display = "block";
}

function restoreInitialContent()
{
  document.getElementById('nadpis').innerHTML = originalContent;
  clearInputFields();
  showSecondInput();
  hideResult();
}

function clearInputFields()
{
  document.getElementById("totalHours").value = "";
  document.getElementById("missedHours").value = "";

  var otextInput = document.getElementById("otext");
  if (otextInput)
  {
    otextInput.value = "";
  }
}

function changeButtonStyle(clickedButton)
{
  if (activeButton !== null)
  {
    activeButton.classList.remove('active-button');
  }

  clickedButton.classList.add('active-button');
  activeButton = clickedButton;
  updateotextVisibility();
}

function fetchUpdatedContent()
{
  clearInputFields();
  showSecondInput();
  hideResult();
  var h1Element = document.querySelector('h1');
  h1Element.textContent = 'KALKULAČKA ABSENCE';
  updateotextVisibility();
}

function hideResult()
{
  var resultDiv = document.getElementById("result");
  resultDiv.style.display = "none";
}

function showSecondInput()
{
  var totalHoursInput = document.getElementById("totalHours");
  var totalHoursValue = totalHoursInput.value;
  var secondInputSection = document.getElementById("secondInputSection");
  var missedHoursInput = document.getElementById("missedHours");
  if (/^\d+$/.test(totalHoursValue) && totalHoursValue !== "")
  {
    secondInputSection.style.display = "block";
    missedHoursInput.style.display = "block";
    missedHoursInput.addEventListener("input", function ()
    {
      updateotextVisibility();
    });
  }
  else
  {
    secondInputSection.style.display = "none";
    missedHoursInput.style.display = "none";
  }
}

function updateotextVisibility()
{
  var missedHoursInput = document.getElementById("missedHours");
  var isNumeric = /^\d+$/.test(missedHoursInput.value.trim());
  var text = document.getElementById("text");
  if (activeButton && activeButton.textContent === "Kolik budu mít procent" && isNumeric)
  {
    text.style.display = "block";
  }
  else
  {
    text.style.display = "none";
  }
}

// PADÁNÍ VLOČEK
document.addEventListener("DOMContentLoaded", function ()
{
  const snowflakesContainer = document.getElementById("snowflakes-container");
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 11, 10);    // datum se indexuje od 0 po 11, takže 0 = leden a 11 = prosinec
  const endDate = new Date(currentDate.getFullYear(), 0, 1);    // datum se indexuje od 0 po 11, takže 0 = leden a 11 = prosinec

  if (currentDate >= startDate && currentDate < endDate)
  {
    const numberOfSnowflakes = 500;
    const snowflakes = [];

    function random(min, max)
    {
      return Math.random() * (max - min) + min;
    }

    class Snowflake
    {
      constructor()
      {
        this.element = document.createElement("div");
        this.element.className = "snowflake";
        this.element.innerHTML = "*";
        snowflakesContainer.appendChild(this.element);

        this.x = random(0, window.innerWidth);
        this.y = 0;
        this.size = random(5, 18);
        this.speedX = random(-0.5, 0.5);
        this.speedY = random(0.5, 1.5);
      }

      update()
      {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > window.innerHeight)
        {
          this.y = 0;
          this.x = random(0, window.innerWidth);
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.element.style.fontSize = `${this.size}px`;
      }
    }

    function createSnowflake()
    {
      snowflakes.push(new Snowflake());
    }

    function createSnowflakeGroup(groupSize, delay)
    {
      for (let i = 0; i < groupSize; i++)
      {
        setTimeout(createSnowflake, i * delay);
      }
    }

    function moveSnowflakes()
    {
      for (let i = 0; i < snowflakes.length; i++)
      {
        snowflakes[i].update();
      }

      requestAnimationFrame(moveSnowflakes);
    }

    createSnowflakeGroup(numberOfSnowflakes, 200);
    moveSnowflakes();
  }
});

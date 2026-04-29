let inp = document.getElementById("inp");
let list = document.getElementById("list");
let form = document.getElementById("page");
let msg = document.getElementById("msg");

let weathericon = {
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Clear: "☀️",
    Haze: "🌫️",
};

async function getweather(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=43450bc36071b315875c1864f4bc6c29&units=metric`;

        list.innerHTML = `<p>Loading...</p>`;

        let res = await fetch(url);
        let data = await res.json();

        if (data.cod !== 200) {
            list.innerHTML = `<h3>City not found ❌</h3>`;
            return;
        }

        let type = data.weather[0].main;
        let icon = weathericon[type] || "🌍";

        let desc = data.weather[0].description;
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);

        list.innerHTML = `
            <h2>📍 ${data.name}</h2>
            <h1>${icon} ${data.main.temp} °C</h1>
            <h4>${desc}</h4>
        `;

    } catch (error) {
        list.innerHTML = `<h3>Something went wrong</h3>`;
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = inp.value.trim();

    if (!value) {
        msg.textContent = "Enter the city";
        list.style.display = "none";
        list.innerHTML = "";
        return;
    }

    msg.textContent = "";
    list.style.display = "block";

    getweather(value);

    inp.value = "";
});
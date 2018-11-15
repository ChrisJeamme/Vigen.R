
const displayFrequencyChart = function(frequency, number)
{
    console.log(frequency.keys())
    document.querySelector('#chartList').innerHTML=document.querySelector('#chartList').innerHTML.concat(`
    <canvas id="chart`+number+`" class="hide chartjs frequencyChart" width="1540" height="400"></canvas>
    `);

    document.querySelector('#chartMenu').innerHTML=document.querySelector('#chartMenu').innerHTML.concat(`
    <li id="chartButton`+number+`"><a onClick='displayChart(`+number+`)'>L`+(number+1)+`</a></li>
    `);

    new Chart(
        document.getElementById("chart"+number),
        {
            "type":"bar",
            "data":
            {
                "labels":"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
                "datasets":[{"label":"Occurences pour L"+(number+1),"data":frequency,"fill":true,
                "backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],
                "borderColor":["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],
                "borderWidth":1}]
            },
            "options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}
        });
}

const resetCharts = function()
{
    document.querySelector('#charts').innerHTML = `
    <h2 class="is-title is-2">Graphiques de fréquence</h2>
    <div class="tabs is-centered is-large is-boxed">
        <ul id="chartMenu">
        </ul>
    </div>
    <div id="chartList"></div>`;
}

const displayChart = function(number)
{
    document.querySelector('#chartList').childNodes.forEach(
        (chart)=>
        {
            if(chart.tagName=="CANVAS")
            {
                hideElement("#"+chart.id);

            }
        });
    displayElement("#chart"+number);
    // document.querySelector("#chartButton"+number).classList.add('is-active');
    // TODO Gérer les is-active + améliorer esthetique de ce menu
}


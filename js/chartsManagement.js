
const displayFrequencyChart = function(frequency, number)
{
    let displayableFrequencies = [];
    // Dégueulasse? Ouais mais c'est 5h du mat, j'ai essayé 3 autres trucs qui marche pas alors ça m'a cassé les couilles, à changer bien sûr mais là j'ai pas le time
    displayableFrequencies[0] = frequency['A'];
    displayableFrequencies[1] = frequency['B'];
    displayableFrequencies[2] = frequency['C'];
    displayableFrequencies[3] = frequency['D'];
    displayableFrequencies[4] = frequency['E'];
    displayableFrequencies[5] = frequency['F'];
    displayableFrequencies[6] = frequency['G'];
    displayableFrequencies[7] = frequency['H'];
    displayableFrequencies[8] = frequency['I'];
    displayableFrequencies[9] = frequency['J'];
    displayableFrequencies[10] = frequency['K'];
    displayableFrequencies[11] = frequency['L'];
    displayableFrequencies[12] = frequency['M'];
    displayableFrequencies[13] = frequency['N'];
    displayableFrequencies[14] = frequency['O'];
    displayableFrequencies[15] = frequency['P'];
    displayableFrequencies[16] = frequency['Q'];
    displayableFrequencies[17] = frequency['R'];
    displayableFrequencies[18] = frequency['S'];
    displayableFrequencies[19] = frequency['T'];
    displayableFrequencies[20] = frequency['U'];
    displayableFrequencies[21] = frequency['V'];
    displayableFrequencies[22] = frequency['W'];
    displayableFrequencies[23] = frequency['X'];
    displayableFrequencies[24] = frequency['Y'];
    displayableFrequencies[25] = frequency['Z'];

    console.log(displayableFrequencies)

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
                "datasets":[{"label":"Occurences pour L"+(number+1),"data":displayableFrequencies,"fill":true,
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


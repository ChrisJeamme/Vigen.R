const createFrequencyChart = function(useless,number)
{
    // Ajout du canvas vide
    document.querySelector('#chartList').innerHTML=document.querySelector('#chartList').innerHTML.concat(`
    <canvas id="chart`+number+`" class="hide chartjs frequencyChart" width="1540" height="400"></canvas>
    `);

    // Ajout d'un bouton pour le graphique
    document.querySelector('#chartMenu').innerHTML=document.querySelector('#chartMenu').innerHTML.concat(`
    <li id="chartButton`+number+`"><a onClick='displayFrequencyChart(`+number+`)'>L`+(number+1)+`</a></li>
    `);
}

const displayFrequencyChart = function(number)
{
    let frequency = frequencies[number];

    // Transformation en fréquences affichables en graphique
    let displayableFrequencies = [];
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    for(let i=0; i<26; i++)
        displayableFrequencies[i] = frequency[letters[i]];

    // Remplissage du canva avec le graphique
    new Chart(
        document.querySelector("#chart"+number),
        {
            "type":"bar",
            "data":
            {
                "labels":"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
                "datasets":[{"label":"Occurences pour L"+(number+1),
                "data":displayableFrequencies,
                "fill":true,
                "backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)"],
                "borderColor":["rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)","rgb(255, 99, 132)"],
                "borderWidth":1}]
            },
            "options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}
        });

    displayChart(number);
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


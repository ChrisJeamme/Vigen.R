const createFrequencyChart = function(useless,number)
{
    // Ajout du canvas vide
    document.querySelector('#chartList').innerHTML=document.querySelector('#chartList').innerHTML.concat(`
    <canvas id="chart`+number+`" class="hide chartjs frequencyChart" width="1540" height="400"></canvas>
    `);

    // Ajout d'un bouton pour le graphique
    document.querySelector('#chartMenu').innerHTML=document.querySelector('#chartMenu').innerHTML.concat(`
    <li id="chartButton`+number+`"><a class="button is-danger is-rounded" style="margin: 1px;" onClick='displayFrequencyChart(`+number+`)'>L`+(number+1)+`</a></li>
    `);
}

const displayFrequencyChart = function(number)
{
    let occurency = occurencies[number];
    
    // Transformation en fréquences affichables en graphique
    let displayableOccurencies = [];
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    for(let i=0; i<26; i++)
        displayableOccurencies[i] = occurency[letters[i]];
    
    let numberOfLetterInText = displayableOccurencies.reduce((a,b)=>a+b,0);
    
    // Remplissage du canva avec le graphique
    new Chart(
        document.querySelector("#chart"+number),
        {
            "type":"bar",
            "data":
            {
                "labels":"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
                "datasets":
                [
                    {
                        "label":"Occurences pour L"+(number+1),
                        "data":displayableOccurencies,
                        "fill":true,
                        "backgroundColor":Array(26).fill("rgba(255, 99, 132, 0.2)"),
                        "borderColor":Array(26).fill("rgb(255, 99, 132)"),
                        "borderWidth":1
                    },
                    {
                        "label":"Occurences en Français",
                        "data":frenchFrequency.map(f=>f*numberOfLetterInText),
                        "fill":true,
                        "backgroundColor":Array(26).fill("rgba(116, 185, 255,1.0)"),
                        "borderColor":Array(26).fill("rgba(9, 132, 227,1.0)"),
                        "borderWidth":1
                    },
                    {
                        "label":"Occurences en Anglais",
                        "data":englishFrequency.map(f=>f*numberOfLetterInText),
                        "fill":true,
                        "backgroundColor":Array(26).fill("rgba(0, 185, 255,1.0)"),
                        "borderColor":Array(26).fill("rgba(0, 185, 255,0.8)"),
                        "borderWidth":1
                    }
                ]
            },
            "options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}
        });

    displayChart(number);
}

const resetCharts = function()
{
    document.querySelector('#charts').innerHTML = `
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


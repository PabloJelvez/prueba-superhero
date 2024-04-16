// Tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

$(function () {
  // Evento click del boton y preventDefault del formulario
  $("#formHero button").click(function (e) {
    e.preventDefault(); // Evita que el formulario se envíe
    // Muestra la sección
    $(".sectionHero").css("display", "flex");
    // Obtiene el ID del superhéroe ingreado en el imput
    let heroId = $("#numberHero").val();

    // Valida que el número ingresado esté entre 1 y 731
    if (heroId < 1 || heroId > 732) {
      $('#myModal').modal('show');
      return;
    }

    //Consulta a la API
    let url = "https://www.superheroapi.com/api.php/3525635500807579/" + heroId; // se agrega el id a la url, para que traiga el dato ingresado
    $.ajax(url)
      .done(function (character) {
        let {
          appearance,
          biography,
          connections,
          id,
          image,
          name,
          powerstats,
          work,
        } = character;
        console.log(character);
        powerstats = Object.entries(powerstats);
        let dataPoints = powerstats.map((element) => ({
          label: element[0],
          y: element[1],
        }));
        loadCard(
          appearance,
          biography,
          connections,
          id,
          image,
          name,
          powerstats,
          work
        );
        cargarGrafico(dataPoints, name);
      })
      .fail(function () {
        alert("No fue posible cargar la información de la página");
      });
  });

  //Función para cargar los datos en la card
  function loadCard(appearance, biography, connections, id, image, name, work) {
    let imgHero = $("#imgHero");
    imgHero.attr("src", image.url);
    let nameHero = $("#nameHero");
    nameHero.text(name);
    let relativesHero = $("#relativesHero");
    relativesHero.text(connections.relatives);
    let publisherHero = $("#publisherHero");
    publisherHero.text(biography.publisher);
    let occupationHero = $("#occupationHero");
    occupationHero.text(work.occupation);
    let firstAppearanceHero = $("#firstAppearanceHero");
    firstAppearanceHero.text(biography["first-appearance"]);
    let heightHero = $("#heightHero");
    heightHero.text(appearance.height);
    let weightHero = $("#weightHero");
    weightHero.text(appearance.weight);
    let groupAffiliationHero = $("#groupAffiliationHero");
    groupAffiliationHero.text(connections["group-affiliation"]);
  }
});

//Función para cargar los datos del gráfico
function cargarGrafico(character = [], heroName = "") {
  const chart = new CanvasJS.Chart("graficoHero", {
    exportEnabled: false,
    animationEnabled: true,
    backgroundColor: "#ffc229",
    title: {
      text: "Estadísticas de poder de: " + heroName,
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        toolTipContent: "{label}: <strong>{y}</strong>",
        legendText: "{label}",
        indexLabel: "{label} - {y}",
        dataPoints: character,
      },
    ],
  });
  chart.render();
}

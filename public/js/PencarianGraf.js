const dropdownContainer = document.querySelector("#dropdown-container");
const btnBook1 = document.querySelector("#book1");
const btnBook2 = document.querySelector("#book2");
const btnBook3 = document.querySelector("#book3");
const btnBook4 = document.querySelector("#book4");
const btnBook5 = document.querySelector("#book5");

btnBook1.addEventListener("click", () => {
  dropdownContainer.textContent = "Book 1";
  drawGraph(1);
});

btnBook2.addEventListener("click", () => {
  dropdownContainer.textContent = "Book 2";
  drawGraph(2);
});

btnBook3.addEventListener("click", () => {
  dropdownContainer.textContent = "Book 3";
  drawGraph(3);
});

btnBook4.addEventListener("click", () => {
  dropdownContainer.textContent = "Book 4";
  drawGraph(4);
});

btnBook5.addEventListener("click", () => {
  dropdownContainer.textContent = "Book 5";
  drawGraph(5);
});

function drawGraph(bookNumber) {
  const obj = { book: bookNumber };
  const init = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch("/pencarian/graf/show", init).then(onSuccess).then(showResult);

  function onSuccess(response) {
    return response.json();
  }

  function showResult(data) {
    d3.select("svg").selectAll("*").remove();
    
    let graph = data;

    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id(function (d) {
          return d.name;
        })
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke-width", 5);

    var node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter()
      .append("g");

    var circles = node.append("circle").attr("r", 10);

    var nodelable = node
      .append("text")
      .attr("class", "nodelable")
      .text(function (d) {
        return d.name;
      })
      .attr("x", -5)
      .attr("y", -25);

    var linklable = svg
      .append("g")
      .attr("class", "linklabel")
      .selectAll("g")
      .data(graph.links)
      .enter()
      .append("g");

    var linklables = linklable
      .append("text")
      .attr("class", "linklable")
      .text(function (d) {
        return d.weight;
      })
      .attr("x", -20)
      .attr("y", -10);

    simulation.nodes(graph.nodes).on("tick", update);
    simulation.force("link").links(graph.links);

    function update() {
      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      linklable.attr("transform", function (d) {
        return "translate(" + d.source.x + "," + d.source.y + ")";
      });
    }
  }
}

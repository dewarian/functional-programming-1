const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.1)

const x1 = d3.scaleBand()

const y = d3.scaleLinear()
    .range([height, 0])

const xAxis = d3.axisBottom(x0)
    .scale(x0)
    .tickSize(0)

const yAxis = d3.axisLeft(y)
    .scale(y)

const div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0)

const color = d3.scaleOrdinal()
    .range(["#3c67d3", "#a6b4dd"])

const svg = d3.select('.data').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("./data.json").then(function(data) {

    const categoriesNames = data.map(function(d) { return d.category })
    const rateNames = data[0].values.map(function(d) { return d.gender })

    x0.domain(categoriesNames)
    x1.domain(rateNames).range([0, x0.bandwidth()])
    y.domain([0, d3.max(data, function(category) { return d3.max(category.values, function(d) { return d.value }) })])

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    svg.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Aantal")

    svg.select('.y')
        .transition()
        .duration(500)
        .delay(1300)
        .style('opacity','1')

    const slice = svg.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.category) + ",0)" })

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.bandwidth())
        .attr("x", function(d) { return x1(d.gender) })
        .style("fill", function(d) { return color(d.gender) })
        .attr("y", function(d) { return y(0) })
        .attr("height", function(d) { return height - y(0) })
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill",
            d3.rgb(color(d.gender))
                .darker(2))
            div.transition()		
                .duration(200)		
                .style("opacity", .8)		
            div.html((d.gender === "men" ? "Mannen" : "Vrouwen") + ": " + d.value)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("fill", 
                color(d.gender))
        })

    slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000})
        .duration(1000)
        .attr("y", function(d) { return y(d.value) })
        .attr("height", function(d) { return height - y(d.value) })

    const legend = svg.selectAll(".legend")
        .data(data[0].values.map(function(d) { return d.gender }).reverse())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")" })
        .style("opacity","0")

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d) })

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d === "men" ? "Mannen" : "Vrouwen" })

    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i }).style("opacity","1")

})
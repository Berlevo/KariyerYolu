$(document).ready(function () {
    //build tree
    function BuildVerticaLTree(treeData, treeContainerDom) {
        var margin = { top: 60, right: 1, bottom: 20, left: 1 };
        var width = 2000 - margin.right - margin.left;
        var height = 1770 - margin.top - margin.bottom;

        var i = 0, duration = 750;
        var tree = d3.layout.tree()
            .size([height, width]);
        var diagonal = d3.svg.diagonal()
            .projection(function (d) { return [d.x, d.y]; });
        var svg = d3.select(treeContainerDom).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        root = treeData;

        update(root);
        function update(source) {
            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);
            // Normalize for fixed-depth.
            nodes.forEach(function (d) { d.y = d.depth * 100; });
            // Declare the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d) { return d.id || (d.id = ++i); });
            // Enter the nodes.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                }).on("click", nodeclick);
            nodeEnter.append("circle")
             .attr("r", 10)
                .attr("stroke", function (d) { return d.children || d._children ? "steelblue" : "rgb(100, 214, 119)"; })
                .style("fill", function (d) { return d.children || d._children ? "lightsteelblue" : "#fff"; });

            //.attr("r", 10)
            //.style("fill", "#fff");
            nodeEnter.append("text")
                .attr("y", function (d) {
                    return d.children || d._children ? -18 : 18;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .attr("name", function (d) {return d.name.toLowerCase().replace(" ","-"); })
                .text(function (d) { return d.name; })
                .style("fill-opacity", 1e-6);
            // Transition nodes to their new position.
            //horizontal tree
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
            nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function (d) { return d._children ? "lightsteelblue" : "black"; });
            nodeUpdate.select("text")
                .style("fill-opacity", 1);
            

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
                .remove();
            nodeExit.select("circle")
                .attr("r", 1e-6);
            nodeExit.select("text")
                .style("fill-opacity", 1e-6);
            // Update the links…
            // Declare the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d) { return d.target.id; });
            // Enter the links.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    var o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });
            // Transition links to their new position.
            link.transition()
                .duration(duration)
            .attr("d", diagonal);


            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function nodeclick(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
        var pack = d3.layout.pack().size([width, height - 50]);
    }


    
    var treeData =
{
    "name": "Yazılım Geliştirici Yol Haritası",
    "icon": "uis uis-bag",
    "children": [
      {
          "name": "Backend",
          "icon": "uis uis-bag",
          "children": [
            {
                "name": "Web",
                "icon": "uis uis-bag",
                 "children": [{
                "name": "Temel Bilgiler",
                "icon": "uis uis-bag",
                 "children": [
                 {
                "name": "Web Geliştirme",
                "icon": "uis uis-bag",
                 "children": [
                 {
                "name": "Python",
                "icon": "uis uis-bag",
                 "children": [{
                "name": "Django",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "Flask",
                "icon": "uis uis-bag",
                 "children": []
            }]
            },
            {
                "name": "Java",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "Node.js",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "PHP",
                "icon": "uis uis-bag",
                 "children": []
            }
                 ]
            }
                 ]
            }]
            },
            {
                "name": "Yapay Zeka",
                "icon": "uis uis-bag",
                "children": [{
                "name": "Matematik",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "İstatistik",
                "icon": "uis uis-bag",
                "children": []
            },
            {
                "name": "Programlama Dili",
                "icon": "uis uis-bag",
                "children": [
                    {
                        "name":"Algoritmalar ve Veri Yapıları",
                        "icon":"uis uis-bag",
                        "children":[
                            {"name":"Nesne Tabanlı Programlama",
                        "icon":"uis uis-bag",
                    "children":[
                        {
                "name": "Python",
                "icon": "uis uis-bag",
                "children": [
                {
                "name": "Pandas",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "Keras",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "Numpy",
                "icon": "uis uis-bag",
                "children": []
                }
                ]
                },
                {
                "name": "R",
                "icon": "uis uis-bag",
                "children": [
                {
                "name": "Dplyr",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "Ggplot2",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "Esquisse",
                "icon": "uis uis-bag",
                "children": []
                }
                ]
                },
                {
            "name": "Java",
            "icon": "uis uis-bag",
            "children": []
            }
                        ]}
                        ]
                    }
                ]
            }]
            },
            {
                "name": "Gömülü Sistem",
                "icon": "uis uis-bag",
                "children": [{
                "name": "Temel Elektronik",
                "icon": "uis uis-bag",
                "children": [{
                "name": "C/C++",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "Arduino",
                "icon": "uis uis-bag",
                "children": []
                },
                {
                "name": "PIC",
                "icon": "uis uis-bag",
                "children": []
                }]
                }]
            }
          ]
      },
      
      {
          "name": "Frontend",
          "icon": "uis uis-bag",
          "children": [{
                "name": "HTML",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "CSS",
                "icon": "uis uis-bag",
                "children": [
                {
                "name": "Bootstrap",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "Layouts",
                "icon": "uis uis-bag",
                 "children": []
            }
                ]
            },
            {
                "name": "Javascript",
                "icon": "uis uis-bag",
                "children": [{
                "name": "Syntax",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "Veri Yapıları",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "ES6",
                "icon": "uis uis-bag",
                 "children": []
            }]
            }
        ]
      },
      {
          "name": "DevOps",
          "icon": "uis uis-bag",
          "children": [{
                "name": "OS",
                "icon": "uis uis-bag",
                 "children": []
            },
            {
                "name": "Network",
                "icon": "uis uis-bag",
                "children": []
            },
            {
                "name": "Güvenlik",
                "icon": "uis uis-bag",
                "children": []
            }]
      }
    ]
};
    BuildVerticaLTree(treeData, "#tree");
    
   /** $('g').click(function(e) {
    e.preventDefault();
    if($(this).children().eq(1).html()=="Python"){
    console.log("python'a tıklandı");
    }  
    }); **/
    
    $('.node').click(function(e) {
    e.preventDefault();
    var parameter = $(this).children().eq(1).attr('name');
    window.location = 'detail.html?name=' + parameter;

    });

    
});
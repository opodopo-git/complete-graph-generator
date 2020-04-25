const graph = new Graph();
let angle = 0;
let nodesInput = null;
let drawGraphButton = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(width / 2, height / 2);
  background(220);
  
  nodesInput = createInput('10');
  drawGraphButton = createButton('Draw Graph');
  drawGraphButton.mousePressed(onClickButton);
  
  const nodesCount = parseInt(nodesInput.value(), 10);
  graph.generate(nodesCount);
}

function draw() {
  translate(width / 2, height / 2);
  background(220);
  
  push();
  rotate(angle);
  graph.draw();
  angle += 0.002;
  pop();
}

function onClickButton() {
  graph.clear();
  background(220);
  const nodesCount = parseInt(nodesInput.value(), 10);
  graph.generate(nodesCount);
}

function Graph() {
  this.nodes = new Nodes();
  this.edges = new Edges();
  this.generate = function(nodesCount) {
    this.nodes.createNodes(nodesCount);
    this.edges.createEdgesByNodes(this.nodes.list);
  }
  
  this.draw = function() {
    this.edges.draw();
    this.nodes.draw();
  }
  
  this.clear = function() {
    this.nodes.clear();
    this.edges.clear();
  }
  
}

function Nodes() {
  this.list = [];
  this.offsetAngle = 0;
  this.radius = 0;
  
  this.createNodes = function(nodesCount) {
    this.offsetAngle = 2 * PI / nodesCount;
    this.radius = (nodesCount === 1) ? 0 : width / 2.8;
    for (let i = 0; i < nodesCount; i++) {
      const node = new Node(
        this.radius * sin(this.offsetAngle * i), 
        this.radius * cos(this.offsetAngle * i)
      );
      this.list.push(node);
    }
  }
  
  this.draw = function() {
    this.list.forEach((node) => node.draw());
  }
  
  this.clear = function() {
    this.list = [];
    this.n = 0;
  }
}

function Edges() {
  this.list = [];
  this.n = 0;
  this.createEdgesByNodes = function(nodes) {
    this.n = nodes.length;
    nodes.forEach((node, index) => {
      const previousNode = nodes[index - 1];
      if (previousNode) {
        for (let i = index; i >= 0; i--) {
          const edge = new Edge(node.x, node.y, nodes[i].x, nodes[i].y);
          this.list.push(edge);
        }
      }
    });  
  }
  
  this.draw = function() {
    this.list.forEach((edge) => edge.draw());
  }
  
  this.clear = function() {
    this.list = [];
    this.n = 0;
  }
}

function Edge(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  
    this.draw = function() {
      line(x1, y1, x2, y2);
    }
}

function Node(x, y) {
  this.x = x;
  this.y = y;
  this.diametr = 20;
  
  this.draw = function() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.diametr)
  }
}

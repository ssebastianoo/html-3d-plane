const screen = document.getElementById("screen");

const pointSize = 10;

let points = [
  {
    x: -1,
    y: 1,
    z: 1,
  },
  {
    x: 1,
    y: 1,
    z: 1,
  },
  {
    x: -1,
    y: -1,
    z: 1,
  },
  {
    x: 1,
    y: -1,
    z: 1,
  },
  {
    x: -1,
    y: 1,
    z: -1,
  },
  {
    x: 1,
    y: 1,
    z: -1,
  },
  {
    x: -1,
    y: -1,
    z: -1,
  },
  {
    x: 1,
    y: -1,
    z: -1,
  },
];

let elements = [];

function cartesianToScreen({ x, y }) {
  return {
    x: ((x + 1) / 2) * 100,
    y: ((0 - y + 1) / 2) * 100,
  };
}

function to2D({ x, y, z }) {
  return {
    x: x / z,
    y: y / z,
  };
}

for (let i = 0; i < points.length; i++) {
  const el = document.createElement("p");
  el.innerText = "x";
  el.style.width = `${pointSize}px`;
  el.style.height = `${pointSize}px`;

  el.style.position = "absolute";

  screen.appendChild(el);
  elements.push(el);
}

function rotateX({ x, y, z }, angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  return {
    x: x,
    y: y * cos - z * sin,
    z: y * sin + z * cos,
  };
}

function rotateY({ x, y, z }, angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  return {
    x: x * cos + z * sin,
    y: y,
    z: -x * sin + z * cos,
  };
}

function animate(delta) {
  for (let i = 0; i < points.length; i++) {
    let position = { ...points[i] };

    const angle = delta * 0.001;

    const rotatedX = rotateX(position, angle);
    let rotatedXY = rotateY(rotatedX, angle);
    rotatedXY.z += 5;

    const coords = cartesianToScreen(to2D(rotatedXY));

    elements[i].style.left = `calc(${coords.x}% - ${pointSize / 2}px)`;
    elements[i].style.top = `calc(${coords.y}% - ${pointSize / 2}px)`;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

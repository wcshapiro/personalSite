import React, { Component } from "react";
import Plot from 'react-plotly.js'
import Sketch from "react-p5";
import './index.css';
import { react } from "plotly.js";
import { FilledInput } from "@material-ui/core";
import {
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip
} from 'recharts';


class Cell {
    constructor(health, genome, type) {
        this.type = type;
        this.health = health;
        this.genome = genome;

    }
}
class Cake {
    constructor(size, health, type) {
        this.type = type;
        this.size = size;
        this.health = health;
    }

}

function addCake(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let cake = new Cake(1, 1, "food");
            if (Math.random() < .05) {
                grid[i][j] = cake;
                count += 1;

            }
        }
    }
    console.log("returning " + count + "cakes");

    return count;
}

function make3DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
function getDimensions() {
    height = window.innerHeight;
    width = window.innerWidth;
    return [width, height]
}
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row].health;
        }
    }
    sum -= grid[x][y].health;
    return sum;
}
function consume(grid, x, y, cellx, celly) {
    if (grid[cellx][celly].type != 'cell') { return false; }
    else {
        if ((grid[x][y].size >= grid[cellx][celly].genome)) {
            // console.log("food too big");
            return false;
        }
        else {
            // console.log('eats food ' + grid[x][y].size + " > " + grid[cellx][celly].genome);
            // console.log('eats food ' + grid[x][y].type + " vs " + grid[cellx][celly].type);
            return true;
        }

    }
}
function delay(i) {
    setTimeout(function () {
        // Add tasks to do 
    }, 2000 * i);
}
function hunt(grid, x, y, p5) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            if (grid[col][row].type == "food") {
                if (consume(grid, col, row, x, y)) {
                    grid[col][row] = new Cell(0, 1, "food");
                    p5.fill('blue');
                    p5.stroke(0);
                    p5.rect(col * resolution, row * resolution, resolution - 1, resolution - 1);
                    count += 1;

                }
            }
        }
    }
    return count;

}
function countElements(grid) {
    let sum = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            sum += grid[i][j].health;
        }
    }
    return sum;
}

let liveGrid;
let grid;
let cols;
let rows;
let oldCount = 0;
let elementCount = 0;
let resolution = 10;
let height = Math.floor(window.innerHeight);
let width = Math.floor(window.clientW);
let cakeCount = 0;

export default (props) => {
    const setup = (p5, canvasParentRef) => {
        let dimensions = getDimensions();
        console.log("dimensions are width: " + Math.round(dimensions[0] / 10) * 10 + " height: " + Math.round(dimensions[1] / 10) * 10)
        console.log("height " + Math.round(dimensions[1]));
        p5.createCanvas(1920, 900).parent(canvasParentRef);
        cols = p5.width / resolution;
        rows = p5.height / resolution;
        grid = make3DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let newCell = new Cell(Math.round(Math.random()), 1, "cell")
                grid[i][j] = newCell;
            }
        }
        cakeCount = addCake(grid);
        console.log("done adding cake with " + cakeCount + " cakes");
    };


    const draw = (p5) => {
        p5.background(0);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j].health == 1 && grid[i][j].type == "cell") {
                    p5.fill(160); // changed for aesthetics
                    p5.stroke(0);
                    p5.rect(x, y, resolution - 1, resolution - 1);
                }
                else if (grid[i][j].type == "food") {
                    p5.fill('#fae');
                    p5.stroke(0);
                    p5.rect(x, y, resolution - 1, resolution - 1);
                }
            }
        }


        let next = make3DArray(cols, rows);
        // let txt = p5.createDiv("testing " + cakeCount);

        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                next[i][j] = new Cell(null, 1, "cell");
                let state = grid[i][j];
                // Count live neighbors!
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);
                cakeCount -= hunt(grid, i, j, p5);



                // txt.position(1600, 50);
                // console.log(cakeCount);
                if (state.type == "cell") {
                    if (state.health == 0 && neighbors == 3) { //birth
                        next[i][j].health = 1;
                        next[i][j].genome = (Math.random() < .004) ? next[i][j].genome + 0.1 : 1;
                    } else if (state.health < 0 || (neighbors < 2 || neighbors > 3)) { //death
                        next[i][j].health = 0;
                    }
                    else {
                        next[i][j] = state;
                        // next[i][j].health = next[i][j].health-.000000001;
                    }
                    // next[i][j].health = next[i][j].health-.000000001;
                }
                else {
                    next[i][j] = state;
                }
            }

        }

        grid = next;




        oldCount = elementCount;
        elementCount = countElements(grid, cols, rows);


        if (elementCount == oldCount && (elementCount < 1200)) {
            grid = make3DArray(cols, rows);


            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let newCell = new Cell(Math.round(Math.random()), -1, "cell");
                    grid[i][j] = newCell;
                }
            }
            cakeCount = addCake(grid);

        }

    };

    const data = [
        { x: 100, y: 200, z: 200 },
        { x: 120, y: 100, z: 200 },
        { x: 170, y: 300, z: 200 },
        { x: 140, y: 250, z: 200 },
        { x: 150, y: 400, z: 200 },
        { x: 110, y: 280, z: 200 },
    ];

    return (<>
        <div className="ca-container">
        
            <Sketch className="ca-box" setup={setup} draw={draw} />
            <div className="fading-container">
            </div>
            
        </div>
        {/* <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="sup ho" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <ZAxis dataKey="z" range={[64, 100]} name="score" unit="km" />
        <Tooltip cursor={{ strokeDasharray: '9 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" shape="square"  />
      </ScatterChart> */}
    </>);
};
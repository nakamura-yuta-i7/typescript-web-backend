declare var require
declare var global

import * as $ from "jquery"
import * as Promise from "bluebird"
import * as _ from "lodash"

global.$ = $
global.co = require("co")
global.Promise = Promise

import Header from "./header"
require("./main.css")

$(()=>{
  var header = new Header()
  header.render()
})

function asyncErrorNya() {
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      var undef=false;
      if ( ! undef ) {
        var err = new Error("AsyncError Nya!")
        reject(err)
      }
    }, 1000)
  })
}

let wait = async function() {
  let yuta = await fetchYuta()
  console.log( "async fetch yuta:", yuta );
  await asyncErrorNya()
  return "async wait return."
}

wait().then(function(result) {
  console.log( "koko1:", result );
}).catch(err=>{
  console.log( "koko2:", err );
})


const coFunc = global.co.wrap(function* () {
  let yuta = yield fetchYuta()
  console.log( "co fetch yuta:", yuta );
  return "co func return."
})

coFunc().then(function(result) {
  console.log( "coFunc:", result );
}).catch(err=>{
  console.log( "coFunc Error:", err );
})


function fetchYuta() {
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{
      resolve("yuta")
    }, 1000)
  })
}

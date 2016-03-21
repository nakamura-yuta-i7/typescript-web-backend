declare var $;

export default class Header {
  constructor() {
    
  }
  render() {
    var template = `
      <header>
        <h1>Webpack + Typescript + ES6 + Generators</h1>
      </header>
    `
    $("body").append( $(template) )
  }
}

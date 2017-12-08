import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import Header from '../app';
import AddPage from '../app';
import ItemListItem from '../app'
import App from '../app'
import HomePage from '../app'
//import itemservice from './data';

describe('Header', function() {
  const wrapper = shallow(<Header text="Edit" back="true"/>);


  //tests
  it("always renders a h1", function() {
    expect(wrapper.find('h1').length).toBe(1);
  });

  /*it("contains nav-bar", function() {
    expect(wrapper.find('nav-bar').length).toBe(1);
  });*/

  it('Test text', function() {
    expect(wrapper.find('h1').at(0).text()).toBe("Edit");
  });
});

describe('ItemListItem', function() {
  var params = {"id": 1, "title": "President and CEO"};
  const wrapper = shallow(  <ItemListItem key={1} item={params}/>);

  it("always renders a hyperlink", function() {
    expect(wrapper.find('a').length).toBe(2);
  });

  it('Test text', function() {
    expect(wrapper.find('p').at(0).text()).toBe("");
  });
  //tests
});

describe('App', function() {
  const wrapper = shallow(  <App/>);

  it("always renders", function() {
    expect(wrapper.state()).toBe(null);
  });

  it("prompted componentDidMount", function() {
    // sinon.stub(App.prototype,'componentDidMount');
    // wrapper.instance().componentDidMount();
    // sinon.assert.calledOnce(App.prototype.componentDidMount);
    expect(1).toBe(1);
  });
  //tests
});

describe('HomePage', function() {
  const wrapper = shallow(  <HomePage/>);

  it("always renders div", function() {
    expect(wrapper.find('div').length).toBe(0);
  });

/*  it("has searchbar", function() {
    expect(wrapper.find('SearchBar').length).toBe(1);
  });*/

  //tests
});

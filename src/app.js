import React, { PropTypes } from 'react';
import PageSlider from './pageslider-react';
//import itemservice from './data';
//import router from './router';
var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <a href="#add" className={"icon icon-compose pull-right" + (this.props.back==="false"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

export var HomePage = React.createClass({
    render: function () {
      if(window.localStorage)
        localStorage.setItem("lastPage", " ");
        return (
            <div className={"page " + this.props.position}>
                <Header text="ToDo List" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <ItemList items={this.props.items}/>
                </div>
            </div>
        );
    }
});

export var SearchBar = React.createClass({
    getInitialState: function() {
        return {searchKey: " "};
    },
    searchHandler: function(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" value={this.state.symbol} onChange={this.searchHandler}/>
            </div>

        );
    }
});
export var ItemListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#items/" + this.props.item.id}>
                    <p >{this.props.item.title}</p>
                </a>
            </li>
        );
    }
});

export var AddPage = React.createClass({
    getInitialState: function() {
        return {Item: {}, continueAddText: itemservice.continueAddText, edit: true};
    },
    addTodo: function(){
      itemservice.addItem(this.state.continueAddText);
      this.setState({
        continueAddText: ''
      });
      if(window.localStorage)
        localStorage.setItem("continue", ' ');
      this.state.edit = false; //Prevents random text capture when we exit.
      router.load(" ");
    },
    updateInput: function(input){
      this.setState({
        continueAddText: input.target.value
      });
      //itemservice.continueAddText = input.target.value;
      if(this.state.edit)
      localStorage.setItem("continue", this.state.continueAddText);
    },
    render: function () {
      if(window.localStorage)
      localStorage.setItem('lastPage', "add");
        return (
            <div className={"page " + this.props.position}>
                <Header text="Add Item" back="true"/>
                <div className="card">
                <ul className="table-view">
                <div className="bar bar-standard">
                    <input type="text" value={this.state.continueAddText} onChange={this.updateInput}  />
                    <input type="submit" href="#" onClick={this.addTodo}/>
                </div>
                </ul>
                </div>
            </div>
        );
    }
});

export var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: ' ',
            items: itemservice.items
        }
    },
    searchHandler: function(searchKey) {
        itemservice.findByName(searchKey).done(function(items) {
            this.setState({
                searchKey:searchKey,
                items: items,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} items={items}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} items={this.state.items}/>);
        }.bind(this));
        router.addRoute('items/:id', function(id) {
            this.slidePage(<ItemPage key="details" ItemId={id} service={itemservice}/>);
        }.bind(this));
        router.addRoute('add', function(id) {
            this.slidePage(<AddPage key="details" ItemId={id} service={itemservice}/>);
        }.bind(this));
        router.start();
        console.log(itemservice.lastPageRouter +"?");
        router.load(itemservice.lastPageRouter);
    }
});

export var ItemPage = React.createClass({
    getInitialState: function() {
        return {Item: {}, inputValue: ''};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.itemId).done(function(result) { //Item id here.
            this.setState({Item: result});
            this.setState({inputValue: result.title});
        }.bind(this));
    },
    removeTodo: function(input){
      this.props.service.removeById(this.props.itemId).done(function(result) { //Item id here.
          this.setState({Item: {}});
      }.bind(this));
      router.load(" ");
    },
    updateInput: function(input){
      this.setState({
        inputValue: input.target.value
      });
      this.props.service.editById(this.props.ItemId, input.target.value).done(function(result) { //Item id here.
          this.setState({Item: result});
      }.bind(this));
    },
    render: function () {
    if(window.localStorage)
      localStorage.setItem('lastPage', "items/" + this.props.ItemId);
        return (
            <div className={"page " + this.props.position}>
                <Header text="Edit" back="true"/>
                <div className="card">
                    <ul className="table-view">

                        <div className="bar bar-standard">
                            <input type="text" value={this.state.inputValue} onChange={this.updateInput}  />
                            <input type="submit" value="Delete" href="#" onClick={this.removeTodo}/>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
});
/*
var ItemList = React.createClass({
    render: function () {
        var items = this.props.items.map(function (item) {
            return (
                <ItemListItem key={item.id} item={item} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});




var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: ' ',
            items: itemservice.items
        }
    },
    searchHandler: function(searchKey) {
        itemservice.findByName(searchKey).done(function(items) {
            this.setState({
                searchKey:searchKey,
                items: items,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} items={items}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} items={this.state.items}/>);
        }.bind(this));
        router.addRoute('items/:id', function(id) {
            this.slidePage(<ItemPage key="details" ItemId={id} service={itemservice}/>);
        }.bind(this));
        router.addRoute('add', function(id) {
            this.slidePage(<AddPage key="details" ItemId={id} service={itemservice}/>);
        }.bind(this));
        router.start();
        console.log(itemservice.lastPageRouter +"?");
        router.load(itemservice.lastPageRouter);
    }
});

React.render(<App/>, document.body);*/
export default Header;
